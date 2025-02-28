"use client";

import { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SqlEditorPage() {
  const [db, setDb] = useState<any>(null);
  const [output, setOutput] = useState<{ type: 'success' | 'error' | 'info'; content: string }>({
    type: 'info',
    content: 'Ready to execute SQL commands'
  });
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sqlCode, setSqlCode] = useState<string>(`-- Example queries
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
INSERT INTO users VALUES (1, 'John Doe', 'john@example.com');
INSERT INTO users VALUES (2, 'Jane Smith', 'jane@example.com');
SELECT * FROM users;`);
  
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initDb = async () => {
      try {
        setIsLoading(true);
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js";
        script.async = true;

        script.onload = async () => {
          try {
            // @ts-ignore (initSqlJs is added to window by the script)
            const SQL = await window.initSqlJs({
              locateFile: () =>
                "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm",
            });
            const newDb = new SQL.Database();
            // Initialize with sample data
            newDb.run(`
              CREATE TABLE demo (id INTEGER PRIMARY KEY, name TEXT);
              INSERT INTO demo VALUES (1, 'JOHNSON');
              INSERT INTO demo VALUES (2, 'SMITH');
            `);
            setDb(newDb);
            setOutput({
              type: 'info',
              content: 'Database initialized with sample "demo" table'
            });
          } catch (err: any) {
            setOutput({
              type: 'error',
              content: `Failed to initialize SQL.js database: ${err.message}`
            });
          } finally {
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setOutput({
            type: 'error',
            content: 'Failed to load SQL.js library'
          });
          setIsLoading(false);
        };

        document.body.appendChild(script);
      } catch (err: any) {
        setOutput({
          type: 'error',
          content: `Initialization error: ${err.message}`
        });
        setIsLoading(false);
      }
    };

    initDb();
    
    // Cleanup script tag on unmount
    return () => {
      const scripts = document.querySelectorAll(
        `script[src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js"]`
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);

  const runSQL = () => {
    if (!db || !editorRef.current) return;

    const fullText = editorRef.current.value || sqlCode;
    const selectionStart = editorRef.current?.selectionStart || 0;
    const selectionEnd = editorRef.current?.selectionEnd || 0;
    let query: string;

    // If text is selected, run only the selected portion
    if (selectionStart !== selectionEnd) {
      query = fullText.substring(selectionStart, selectionEnd).trim();
    } else {
      query = fullText.trim();
    }

    // Add to history
    setHistory([query, ...history.slice(0, 9)]);

    try {
      // Execute the query
      let isSelect = /^\s*SELECT\s+/i.test(query);
      let modifiedRows = 0;
      
      if (isSelect) {
        // For SELECT statements, show the results
        const results = db.exec(query);
        setOutput({
          type: 'success',
          content: formatResults(results)
        });
      } else {
        // For non-SELECT statements, show the affected rows
        try {
          // Get the state of the database before
          const tables = getTableNames();
          const tableCounts: Record<string, number> = {};
          
          // Get record count for each table
          tables.forEach(table => {
            try {
              const result = db.exec(`SELECT COUNT(*) FROM ${table}`);
              tableCounts[table] = result[0].values[0][0] as number;
            } catch {
              tableCounts[table] = 0;
            }
          });
          
          // Execute the command
          modifiedRows = db.exec(query);
          
          // Get updated table list
          const newTables = getTableNames();
          let message = '';
          
          // Check for table creation
          const addedTables = newTables.filter(t => !tables.includes(t));
          if (addedTables.length > 0) {
            message += `Table(s) created: ${addedTables.join(', ')}<br>`;
          }
          
          // Check for table deletion
          const deletedTables = tables.filter(t => !newTables.includes(t));
          if (deletedTables.length > 0) {
            message += `Table(s) dropped: ${deletedTables.join(', ')}<br>`;
          }
          
          // Check for row changes in existing tables
          newTables.forEach(table => {
            if (tables.includes(table)) {
              try {
                const newCount = db.exec(`SELECT COUNT(*) FROM ${table}`)[0].values[0][0] as number;
                const oldCount = tableCounts[table] || 0;
                const diff = newCount - oldCount;
                
                if (diff !== 0) {
                  message += `Table '${table}': ${Math.abs(diff)} row${Math.abs(diff) !== 1 ? 's' : ''} ${diff > 0 ? 'added' : 'removed'}<br>`;
                }
              } catch {
                // Skip if table can't be queried
              }
            }
          });
          
          if (message === '') {
            message = 'Command executed successfully';
          }
          
          setOutput({
            type: 'success',
            content: message
          });
        } catch (innerError: any) {
          setOutput({
            type: 'error',
            content: `Error executing statement: ${innerError.message}`
          });
        }
      }
    } catch (error: any) {
      setOutput({
        type: 'error',
        content: `Error: ${error.message}`
      });
    }
    
    // Scroll to output
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getTableNames = (): string[] => {
    try {
      const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table'");
      if (tables.length === 0 || !tables[0].values) return [];
      return tables[0].values.map((row: any[]) => row[0] as string);
    } catch {
      return [];
    }
  };

  const formatResults = (results: any) => {
    if (!results || results.length === 0) return "No results returned";
    
    let html = "<div class='overflow-x-auto'><table class='min-w-full divide-y divide-gray-200'><thead class='bg-gray-100'><tr>";
    const columns = results[0].columns;
    
    // Column headers
    columns.forEach((col: string) => (
      html += `<th class='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>${col}</th>`
    ));
    
    html += "</tr></thead><tbody class='bg-white divide-y divide-gray-200'>";
    
    // Table rows
    results[0].values.forEach((row: any[]) => {
      html += "<tr class='hover:bg-gray-50'>";
      row.forEach((val: any) => {
        const displayVal = val === null ? '<span class="text-gray-400">NULL</span>' : val;
        html += `<td class='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>${displayVal}</td>`;
      });
      html += "</tr>";
    });
    
    html += "</tbody></table></div>";
    html += `<p class='mt-2 text-sm text-gray-600'>${results[0].values.length} row${results[0].values.length !== 1 ? 's' : ''} returned</p>`;
    
    return html;
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSqlCode(e.target.value);
  };

  const getTableInfo = () => {
    if (!db) return;
    
    try {
      const tables = getTableNames();
      if (tables.length === 0) {
        setOutput({
          type: 'info',
          content: 'No tables found in database'
        });
        return;
      }
      
      let result = '<div class="space-y-4">';
      
      tables.forEach(table => {
        if (table === 'sqlite_sequence') return; // Skip internal SQLite tables
        
        try {
          // Get table structure
          const schema = db.exec(`PRAGMA table_info(${table})`);
          
          result += `<div class="border rounded-lg overflow-hidden">
            <div class="bg-blue-700 text-white px-4 py-2 font-medium">Table: ${table}</div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Not Null</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Key</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">`;
          
          schema[0].values.forEach((row: any[]) => {
            result += `<tr class="hover:bg-gray-50">
              <td class="px-4 py-2 text-sm text-gray-900">${row[1]}</td>
              <td class="px-4 py-2 text-sm text-gray-500">${row[2]}</td>
              <td class="px-4 py-2 text-sm text-gray-500">${row[3] ? 'Yes' : 'No'}</td>
              <td class="px-4 py-2 text-sm text-gray-500">${row[4] !== null ? row[4] : ''}</td>
              <td class="px-4 py-2 text-sm text-gray-500">${row[5] ? 'Yes' : 'No'}</td>
            </tr>`;
          });
          
          result += `</tbody></table></div>`;
          
          // Get row count
          const count = db.exec(`SELECT COUNT(*) FROM ${table}`);
          if (count.length > 0 && count[0].values.length > 0) {
            const rowCount = count[0].values[0][0];
            result += `<p class="text-sm text-gray-600 mb-4">Row count: ${rowCount}</p>`;
          }
          
        } catch (err: any) {
          result += `<p class="text-red-500">Error getting structure for table ${table}: ${err.message}</p>`;
        }
      });
      
      result += '</div>';
      
      setOutput({
        type: 'info',
        content: result
      });
      
    } catch (error: any) {
      setOutput({
        type: 'error',
        content: `Error retrieving database schema: ${error.message}`
      });
    }
  };

  const loadHistory = (index: number) => {
    if (index >= 0 && index < history.length) {
      setSqlCode(history[index]);
      if (editorRef.current) {
        editorRef.current.value = history[index];
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              SQL Editor
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left panel - Editor */}
            <div className="lg:w-7/12 p-4">
              <div className="mb-2 flex justify-between items-center">
                <div className="text-lg font-medium text-gray-700">Write your SQL</div>
                <div className="flex space-x-2">
                  <button
                    onClick={getTableInfo}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  >
                    Show Schema
                  </button>
                  <button
                    onClick={() => setSqlCode('')}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="relative border border-gray-300 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 overflow-auto">
                  <SyntaxHighlighter
                    language="sql"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '12px',
                      background: 'transparent',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                    }}
                  >
                    {sqlCode}
                  </SyntaxHighlighter>
                </div>
                <textarea
                  ref={editorRef}
                  className="w-full h-80 p-3 font-mono text-base bg-transparent relative z-10 text-white"
                  placeholder="Write your SQL here..."
                  value={sqlCode}
                  onChange={handleCodeChange}
                  spellCheck="false"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={runSQL}
                  disabled={isLoading || !db}
                  className={`px-4 py-2 ${isLoading || !db ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Run SQL
                </button>
              </div>

              {history.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Query History</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {history.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => loadHistory(index)}
                        className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded truncate block"
                      >
                        {query.length > 60 ? query.substring(0, 60) + '...' : query}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right panel - Output */}
            <div ref={outputRef} className="lg:w-5/12 bg-gray-50 p-4 border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="text-lg font-medium text-gray-700 mb-2">Results</div>
              
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className={`rounded-lg overflow-hidden border ${
                  output.type === 'error' ? 'border-red-200 bg-red-50' : 
                  output.type === 'success' ? 'border-green-200 bg-green-50' : 
                  'border-blue-200 bg-blue-50'
                }`}>
                  <div className={`px-4 py-2 ${
                    output.type === 'error' ? 'bg-red-100 text-red-800' : 
                    output.type === 'success' ? 'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'
                  } font-medium`}>
                    {output.type === 'error' ? 'Error' : 
                     output.type === 'success' ? 'Success' : 'Information'}
                  </div>
                  <div className="p-4">
                    <div 
                      className={`${
                        output.type === 'error' ? 'text-red-700' : 
                        output.type === 'success' ? 'text-gray-800' : 
                        'text-blue-700'
                      }`}
                      dangerouslySetInnerHTML={{ __html: output.content }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}