// import { useState, useEffect } from 'react';

// export default function NormalizationForm({ originalTable, currentNormalization, previousSolution, onSubmit }) {
//   const [tables, setTables] = useState([]);
//   const [showHelp, setShowHelp] = useState(false);
//   const [currentTableIndex, setCurrentTableIndex] = useState(0);
//   const [isAddingNewTable, setIsAddingNewTable] = useState(false);
//   const [newTable, setNewTable] = useState({
//     name: "",
//     headers: [],
//     data: []
//   });
  
//   useEffect(() => {
//     // Initialize tables based on previous solution
//     if (previousSolution && previousSolution.length > 0) {
//       setTables([...previousSolution]);
//     } else {
//       setTables([{ ...originalTable }]);
//     }
//   }, [previousSolution, originalTable]);
  
//   const handleAddTable = () => {
//     setIsAddingNewTable(true);
//     setNewTable({
//       name: "",
//       headers: [],
//       data: []
//     });
//   };
  
//   const handleCancelAddTable = () => {
//     setIsAddingNewTable(false);
//   };
  
//   const handleSubmitNewTable = () => {
//     if (newTable.name && newTable.headers.length > 0) {
//       setTables([...tables, { 
//         ...newTable,
//         data: newTable.data.length > 0 ? newTable.data : [[]] 
//       }]);
//       setIsAddingNewTable(false);
//     }
//   };
  
//   const handleDeleteTable = (index) => {
//     const updatedTables = [...tables];
//     updatedTables.splice(index, 1);
//     setTables(updatedTables);
//     if (currentTableIndex >= updatedTables.length) {
//       setCurrentTableIndex(Math.max(0, updatedTables.length - 1));
//     }
//   };
  
//   const handleUpdateTableName = (index, name) => {
//     const updatedTables = [...tables];
//     updatedTables[index] = {
//       ...updatedTables[index],
//       name
//     };
//     setTables(updatedTables);
//   };
  
//   const handleAddHeader = (index) => {
//     const updatedTables = [...tables];
//     updatedTables[index] = {
//       ...updatedTables[index],
//       headers: [...updatedTables[index].headers, "new_column"]
//     };
    
//     // Add empty value to each row for the new column
//     updatedTables[index].data = updatedTables[index].data.map(row => [...row, ""]);
    
//     setTables(updatedTables);
//   };
  
//   const handleUpdateHeader = (tableIndex, headerIndex, value) => {
//     const updatedTables = [...tables];
//     updatedTables[tableIndex] = {
//       ...updatedTables[tableIndex],
//       headers: updatedTables[tableIndex].headers.map((header, index) => 
//         index === headerIndex ? value : header
//       )
//     };
//     setTables(updatedTables);
//   };
  
//   const handleDeleteHeader = (tableIndex, headerIndex) => {
//     const updatedTables = [...tables];
    
//     // Remove header
//     updatedTables[tableIndex].headers = updatedTables[tableIndex].headers.filter((_, index) => 
//       index !== headerIndex
//     );
    
//     // Remove corresponding column from data
//     updatedTables[tableIndex].data = updatedTables[tableIndex].data.map(row => 
//       row.filter((_, index) => index !== headerIndex)
//     );
    
//     setTables(updatedTables);
//   };
  
//   const handleAddRow = (tableIndex) => {
//     const updatedTables = [...tables];
//     const emptyRow = new Array(updatedTables[tableIndex].headers.length).fill("");
    
//     updatedTables[tableIndex] = {
//       ...updatedTables[tableIndex],
//       data: [...updatedTables[tableIndex].data, emptyRow]
//     };
    
//     setTables(updatedTables);
//   };
  
//   const handleUpdateCell = (tableIndex, rowIndex, cellIndex, value) => {
//     const updatedTables = [...tables];
//     updatedTables[tableIndex].data[rowIndex][cellIndex] = value;
//     setTables(updatedTables);
//   };
  
//   const handleDeleteRow = (tableIndex, rowIndex) => {
//     const updatedTables = [...tables];
//     updatedTables[tableIndex].data = updatedTables[tableIndex].data.filter((_, index) => 
//       index !== rowIndex
//     );
//     setTables(updatedTables);
//   };
  
//   const handleNewTableNameChange = (value) => {
//     setNewTable({
//       ...newTable,
//       name: value
//     });
//   };
  
//   const handleNewTableHeadersChange = (value) => {
//     const headerArray = value.split(',').map(h => h.trim()).filter(h => h);
//     setNewTable({
//       ...newTable,
//       headers: headerArray,
//       data: [new Array(headerArray.length).fill("")]
//     });
//   };
  
//   const handleSubmitSolution = () => {
//     onSubmit(tables);
//   };
  
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold text-lg">Design Your {currentNormalization} Schema</h3>
//         <button
//           onClick={() => setShowHelp(!showHelp)}
//           className="text-blue-600 underline"
//         >
//           {showHelp ? "Hide Help" : "Show Help"}
//         </button>
//       </div>
      
//       {showHelp && (
//         <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
//           {currentNormalization === "1NF" && (
//             <div>
//               <p className="font-semibold mb-2">How to achieve First Normal Form:</p>
//               <ol className="list-decimal pl-5 space-y-1">
//                 <li>Ensure all values are atomic (no multi-valued attributes)</li>
//                 <li>Identify a primary key for the table</li>
//                 <li>Remove any repeating groups</li>
//                 <li>Ensure each column contains values from the same domain</li>
//               </ol>
//               <p className="mt-2">Note: For this scenario, the original table is already in 1NF.</p>
//             </div>
//           )}
          
//           {currentNormalization === "2NF" && (
//             <div>
//               <p className="font-semibold mb-2">How to achieve Second Normal Form:</p>
//               <ol className="list-decimal pl-5 space-y-1">
//                 <li>Start with tables in 1NF</li>
//                 <li>Identify the primary key for each table (could be composite)</li>
//                 <li>Find attributes that depend on only part of the primary key (partial dependencies)</li>
//                 <li>Move these attributes to new tables with the appropriate key</li>
//                 <li>Consider creating these tables:
//                   <ul className="list-disc pl-5 mt-1">
//                     <li>Students table (student_id, student_name)</li>
//                     <li>Courses table (course_id, course_name, dept_code)</li>
//                     <li>Instructors table (instructor_id, instructor_name)</li>
//                     <li>Enrollments table (record_id, student_id, course_id, instructor_id, grade)</li>
//                     <li>Course locations table (course_id, room_number, building)</li>
//                   </ul>
//                 </li>
//               </ol>
//             </div>
//           )}
          
//           {currentNormalization === "3NF" && (
//             <div>
//               <p className="font-semibold mb-2">How to achieve Third Normal Form:</p>
//               <ol className="list-decimal pl-5 space-y-1">
//                 <li>Start with tables in 2NF</li>
//                 <li>Identify transitive dependencies (where non-key attributes depend on other non-key attributes)</li>
//                 <li>Create separate tables for these dependencies</li>
//                 <li>Consider these improvements:
//                   <ul className="list-disc pl-5 mt-1">
//                     <li>Create a Departments table (dept_code, dept_name)</li>
//                     <li>Separate course-instructor relationships</li>
//                     <li>Create a Rooms table (room_id, room_number, building)</li>
//                     <li>Update foreign key relationships</li>
//                   </ul>
//                 </li>
//               </ol>
//             </div>
//           )}
//         </div>
//       )}
      
//       <div className="mb-4">
//         <div className="flex space-x-2 mb-4">
//           {tables.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentTableIndex(index)}
//               className={`px-3 py-1 rounded-md ${
//                 currentTableIndex === index 
//                   ? "bg-blue-600 text-white" 
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Table {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={handleAddTable}
//             className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
//           >
//             + Add Table
//           </button>
//         </div>

//         {isAddingNewTable && (
//           <div className="mt-4 border rounded-md p-4 bg-gray-50">
//             <h4 className="font-medium mb-2">Add New Table</h4>
            
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Table Name:</label>
//                 <input
//                   type="text"
//                   value={newTable.name}
//                   onChange={(e) => handleNewTableNameChange(e.target.value)}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="e.g., students"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Column Headers (comma-separated):
//                 </label>
//                 <input
//                   type="text"
//                   onChange={(e) => handleNewTableHeadersChange(e.target.value)}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="e.g., student_id, student_name"
//                 />
//               </div>
              
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={handleCancelAddTable}
//                   className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitNewTable}
//                   className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
//                   disabled={!newTable.name || newTable.headers.length === 0}
//                 >
//                   Add Table
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {tables.length > 0 && (
//           <div className="border rounded-md p-4">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center space-x-2">
//                 <label className="font-medium">Table Name:</label>
//                 <input 
//                   type="text" 
//                   value={tables[currentTableIndex].name} 
//                   onChange={(e) => handleUpdateTableName(currentTableIndex, e.target.value)}
//                   className="border rounded px-2 py-1"
//                 />
//               </div>
//               <button
//                 onClick={() => handleDeleteTable(currentTableIndex)}
//                 className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Delete Table
//               </button>
//             </div>
            
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <h4 className="font-medium">Headers</h4>
//                 <button
//                   onClick={() => handleAddHeader(currentTableIndex)}
//                   className="text-sm px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   + Add Column
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {tables[currentTableIndex].headers.map((header, headerIndex) => (
//                   <div key={headerIndex} className="flex items-center border rounded-md p-1 bg-gray-50">
//                     <input
//                       type="text"
//                       value={header}
//                       onChange={(e) => handleUpdateHeader(currentTableIndex, headerIndex, e.target.value)}
//                       className="w-24 px-1 bg-transparent"
//                     />
//                     <button
//                       onClick={() => handleDeleteHeader(currentTableIndex, headerIndex)}
//                       className="ml-1 text-red-600 hover:text-red-800"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <h4 className="font-medium">Data</h4>
//                 <button
//                   onClick={() => handleAddRow(currentTableIndex)}
//                   className="text-sm px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   + Add Row
//                 </button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-300">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       {tables[currentTableIndex].headers.map((header, index) => (
//                         <th key={index} className="py-2 px-3 border-b text-left text-sm font-medium text-gray-700">
//                           {header}
//                         </th>
//                       ))}
//                       <th className="py-2 px-3 border-b text-left text-sm font-medium text-gray-700 w-12">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tables[currentTableIndex].data.map((row, rowIndex) => (
//                       <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                         {row.map((cell, cellIndex) => (
//                           <td key={cellIndex} className="py-2 px-3 border-b text-sm text-gray-800">
//                             <input
//                               type="text"
//                               value={cell}
//                               onChange={(e) => handleUpdateCell(currentTableIndex, rowIndex, cellIndex, e.target.value)}
//                               className="w-full px-1 py-1 border rounded"
//                             />
//                           </td>
//                         ))}
//                         <td className="py-2 px-3 border-b text-sm">
//                           <button
//                             onClick={() => handleDeleteRow(currentTableIndex, rowIndex)}
//                             className="text-red-600 hover:text-red-800"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* {isAddingNewTable && (
//           <div className="mt-4 border rounded-md p-4 bg-gray-50">
//             <h4 className="font-medium mb-2">Add New Table</h4>
            
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Table Name:</label>
//                 <input
//                   type="text"
//                   value={newTable.name}
//                   onChange={(e) => handleNewTableNameChange(e.target.value)}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="e.g., students"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Column Headers (comma-separated):
//                 </label>
//                 <input
//                   type="text"
//                   onChange={(e) => handleNewTableHeadersChange(e.target.value)}
//                   className="w-full px-3 py-2 border rounded"
//                   placeholder="e.g., student_id, student_name"
//                 />
//               </div>
              
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={handleCancelAddTable}
//                   className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitNewTable}
//                   className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
//                   disabled={!newTable.name || newTable.headers.length === 0}
//                 >
//                   Add Table
//                 </button>
//               </div>
//             </div>
//           </div>
//         )} */}
//       </div>
      
//       <div className="mt-8">
//         <button
//           onClick={handleSubmitSolution}
//           className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
//           disabled={tables.length === 0}
//         >
//           Submit {currentNormalization} Solution
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';

interface Table {
  name: string;
  headers: string[];
  data: string[][];
}

interface Props {
  originalTable: Table;
  currentNormalization: "1NF" | "2NF" | "3NF";
  previousSolution: Table[];
  onSubmit: (tables: Table[]) => void;
}

export default function NormalizationForm({ originalTable, currentNormalization, previousSolution, onSubmit }: Props) {
  const [tables, setTables] = useState<Table[]>([]);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [currentTableIndex, setCurrentTableIndex] = useState<number>(0);
  const [isAddingNewTable, setIsAddingNewTable] = useState<boolean>(false);
  const [newTable, setNewTable] = useState<Table>({
    name: "",
    headers: [],
    data: []
  });
  
  useEffect(() => {
    if (previousSolution && previousSolution.length > 0) {
      setTables([...previousSolution]);
    } else {
      setTables([{ ...originalTable }]);
    }
  }, [previousSolution, originalTable]);
  
  const handleAddTable = () => {
    setIsAddingNewTable(true);
    setNewTable({
      name: "",
      headers: [],
      data: []
    });
  };
  
  const handleCancelAddTable = () => {
    setIsAddingNewTable(false);
  };
  
  const handleSubmitNewTable = () => {
    if (newTable.name && newTable.headers.length > 0) {
      setTables([...tables, { 
        ...newTable,
        data: newTable.data.length > 0 ? newTable.data : [[]] 
      }]);
      setIsAddingNewTable(false);
    }
  };
  
  const handleDeleteTable = (index: number) => {
    const updatedTables = [...tables];
    updatedTables.splice(index, 1);
    setTables(updatedTables);
    if (currentTableIndex >= updatedTables.length) {
      setCurrentTableIndex(Math.max(0, updatedTables.length - 1));
    }
  };
  
  const handleUpdateTableName = (index: number, name: string) => {
    const updatedTables = [...tables];
    updatedTables[index] = {
      ...updatedTables[index],
      name
    };
    setTables(updatedTables);
  };
  
  const handleAddHeader = (index: number) => {
    const updatedTables = [...tables];
    updatedTables[index] = {
      ...updatedTables[index],
      headers: [...updatedTables[index].headers, "new_column"]
    };
    
    updatedTables[index].data = updatedTables[index].data.map(row => [...row, ""]);
    
    setTables(updatedTables);
  };
  
  const handleUpdateHeader = (tableIndex: number, headerIndex: number, value: string) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex] = {
      ...updatedTables[tableIndex],
      headers: updatedTables[tableIndex].headers.map((header, index) => 
        index === headerIndex ? value : header
      )
    };
    setTables(updatedTables);
  };
  
  const handleDeleteHeader = (tableIndex: number, headerIndex: number) => {
    const updatedTables = [...tables];
    
    updatedTables[tableIndex].headers = updatedTables[tableIndex].headers.filter((_, index) => 
      index !== headerIndex
    );
    
    updatedTables[tableIndex].data = updatedTables[tableIndex].data.map(row => 
      row.filter((_, index) => index !== headerIndex)
    );
    
    setTables(updatedTables);
  };
  
  const handleAddRow = (tableIndex: number) => {
    const updatedTables = [...tables];
    const emptyRow = new Array(updatedTables[tableIndex].headers.length).fill("");
    
    updatedTables[tableIndex] = {
      ...updatedTables[tableIndex],
      data: [...updatedTables[tableIndex].data, emptyRow]
    };
    
    setTables(updatedTables);
  };
  
  const handleUpdateCell = (tableIndex: number, rowIndex: number, cellIndex: number, value: string) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].data[rowIndex][cellIndex] = value;
    setTables(updatedTables);
  };
  
  const handleDeleteRow = (tableIndex: number, rowIndex: number) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].data = updatedTables[tableIndex].data.filter((_, index) => 
      index !== rowIndex
    );
    setTables(updatedTables);
  };
  
  const handleNewTableNameChange = (value: string) => {
    setNewTable({
      ...newTable,
      name: value
    });
  };
  
  const handleNewTableHeadersChange = (value: string) => {
    const headerArray = value.split(',').map(h => h.trim()).filter(h => h);
    setNewTable({
      ...newTable,
      headers: headerArray,
      data: [new Array(headerArray.length).fill("")]
    });
  };
  
  const handleSubmitSolution = () => {
    onSubmit(tables);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Design Your {currentNormalization} Schema</h3>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-blue-600 underline"
        >
          {showHelp ? "Hide Help" : "Show Help"}
        </button>
      </div>
      
      {showHelp && (
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
          {currentNormalization === "1NF" && (
            <div>
              <p className="font-semibold mb-2">How to achieve First Normal Form:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Ensure all values are atomic (no multi-valued attributes)</li>
                <li>Identify a primary key for the table</li>
                <li>Remove any repeating groups</li>
                <li>Ensure each column contains values from the same domain</li>
              </ol>
              <p className="mt-2">Note: For this scenario, the original table is already in 1NF.</p>
            </div>
          )}
          
          {currentNormalization === "2NF" && (
            <div>
              <p className="font-semibold mb-2">How to achieve Second Normal Form:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Start with tables in 1NF</li>
                <li>Identify the primary key for each table (could be composite)</li>
                <li>Find attributes that depend on only part of the primary key (partial dependencies)</li>
                <li>Move these attributes to new tables with the appropriate key</li>
                <li>Consider creating these tables:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Students table (student_id, student_name)</li>
                    <li>Courses table (course_id, course_name, dept_code)</li>
                    <li>Instructors table (instructor_id, instructor_name)</li>
                    <li>Enrollments table (record_id, student_id, course_id, instructor_id, grade)</li>
                    <li>Course locations table (course_id, room_number, building)</li>
                  </ul>
                </li>
              </ol>
            </div>
          )}
          
          {currentNormalization === "3NF" && (
            <div>
              <p className="font-semibold mb-2">How to achieve Third Normal Form:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Start with tables in 2NF</li>
                <li>Identify transitive dependencies (where non-key attributes depend on other non-key attributes)</li>
                <li>Create separate tables for these dependencies</li>
                <li>Consider these improvements:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Create a Departments table (dept_code, dept_name)</li>
                    <li>Separate course-instructor relationships</li>
                    <li>Create a Rooms table (room_id, room_number, building)</li>
                    <li>Update foreign key relationships</li>
                  </ul>
                </li>
              </ol>
            </div>
          )}
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          {tables.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTableIndex(index)}
              className={`px-3 py-1 rounded-md ${
                currentTableIndex === index 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Table {index + 1}
            </button>
          ))}
          <button
            onClick={handleAddTable}
            className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            + Add Table
          </button>
        </div>

        {isAddingNewTable && (
          <div className="mt-4 border rounded-md p-4 bg-gray-50">
            <h4 className="font-medium mb-2">Add New Table</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Table Name:</label>
                <input
                  type="text"
                  value={newTable.name}
                  onChange={(e) => handleNewTableNameChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="e.g., students"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Column Headers (comma-separated):
                </label>
                <input
                  type="text"
                  onChange={(e) => handleNewTableHeadersChange(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="e.g., student_id, student_name"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelAddTable}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitNewTable}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={!newTable.name || newTable.headers.length === 0}
                >
                  Add Table
                </button>
              </div>
            </div>
          </div>
        )}
        
        {tables.length > 0 && (
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <label className="font-medium">Table Name:</label>
                <input 
                  type="text" 
                  value={tables[currentTableIndex].name} 
                  onChange={(e) => handleUpdateTableName(currentTableIndex, e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>
              <button
                onClick={() => handleDeleteTable(currentTableIndex)}
                className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Table
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Headers</h4>
                <button
                  onClick={() => handleAddHeader(currentTableIndex)}
                  className="text-sm px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  + Add Column
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tables[currentTableIndex].headers.map((header, headerIndex) => (
                  <div key={headerIndex} className="flex items-center border rounded-md p-1 bg-gray-50">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => handleUpdateHeader(currentTableIndex, headerIndex, e.target.value)}
                      className="w-24 px-1 bg-transparent"
                    />
                    <button
                      onClick={() => handleDeleteHeader(currentTableIndex, headerIndex)}
                      className="ml-1 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Data</h4>
                <button
                  onClick={() => handleAddRow(currentTableIndex)}
                  className="text-sm px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  + Add Row
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      {tables[currentTableIndex].headers.map((header, index) => (
                        <th key={index} className="py-2 px-3 border-b text-left text-sm font-medium text-gray-700">
                          {header}
                        </th>
                      ))}
                      <th className="py-2 px-3 border-b text-left text-sm font-medium text-gray-700 w-12">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tables[currentTableIndex].data.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-2 px-3 border-b text-sm text-gray-800">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => handleUpdateCell(currentTableIndex, rowIndex, cellIndex, e.target.value)}
                              className="w-full px-1 py-1 border rounded"
                            />
                          </td>
                        ))}
                        <td className="py-2 px-3 border-b text-sm">
                          <button
                            onClick={() => handleDeleteRow(currentTableIndex, rowIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <button
          onClick={handleSubmitSolution}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
          disabled={tables.length === 0}
        >
          Submit {currentNormalization} Solution
        </button>
      </div>
    </div>
  );
}