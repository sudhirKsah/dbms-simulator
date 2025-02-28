"use client";

import { useState, useEffect, useRef } from "react";

export default function SqlEditorPage() {
    const [db, setDb] = useState<any>(null); // SQL.js database instance
    const [output, setOutput] = useState<string>(""); // Query results or errors
    const editorRef = useRef<HTMLTextAreaElement>(null); // Ref for textarea

    // Initialize SQL.js from CDN
    useEffect(() => {
        const initDb = async () => {
            // Load sql.js from CDN
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js";
            script.async = true;

            script.onload = async () => {
                // @ts-ignore (initSqlJs is added to window by the script)
                const SQL = await window.initSqlJs({
                    locateFile: () =>
                        "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm",
                });
                const newDb = new SQL.Database();
                newDb.run(`
          CREATE TABLE demo (id INTEGER, name TEXT);
          INSERT INTO demo VALUES (1, 'JOHNSON');
        `);
                setDb(newDb);
            };

            script.onerror = () => {
                setOutput("<pre style='color: red;'>Failed to load SQL.js</pre>");
            };

            document.body.appendChild(script);
        };

        initDb();
        // Cleanup script tag on unmount (optional)
        return () => {
            const scripts = document.querySelectorAll(
                `script[src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js"]`
            );
            scripts.forEach((script) => script.remove());
        };
    }, []);

    // Run the SQL query
    const runSQL = () => {
        if (!db || !editorRef.current) return;

        const fullText = editorRef.current.value;
        const selectionStart = editorRef.current.selectionStart;
        const selectionEnd = editorRef.current.selectionEnd;
        let query: string;

        // If text is selected, run only the selected portion
        if (selectionStart !== selectionEnd) {
            query = fullText.substring(selectionStart, selectionEnd).trim();
        } else {
            // If no selection, run the full content from the start
            query = fullText.trim();
        }

        try {
            const results = db.exec(query);
            setOutput(formatResults(results));
        } catch (error: any) {
            setOutput(`<pre style="color: red;">Error: ${error.message}</pre>`);
        }
    };

    // Format query results as a table
    const formatResults = (results: any) => {
        if (!results || results.length === 0) return "<p>No results</p>";
        let html = "<table border='1'><thead><tr>";
        const columns = results[0].columns;
        columns.forEach((col: string) => (html += `<th>${col}</th>`));
        html += "</tr></thead><tbody>";
        results[0].values.forEach((row: any[]) => {
            html += "<tr>";
            row.forEach((val: any) => (html += `<td>${val}</td>`));
            html += "</tr>";
        });
        html += "</tbody></table>";
        return html;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">SQL Editor</h1>
            <textarea
                ref={editorRef}
                className="w-full h-48 p-2 border rounded mb-4"
                placeholder="Write your SQL here..."
                defaultValue={`CREATE TABLE demo (id INTEGER, name TEXT);
INSERT INTO demo VALUES (1, 'JOHNSON');
SELECT * FROM demo;`}
            />

            <button
                onClick={runSQL}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Run
            </button>
            <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: output }} // Render HTML output
            />
        </div>
    );
}