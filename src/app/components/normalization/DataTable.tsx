// export default function DataTable({ table }) {
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               {table.headers.map((header, index) => (
//                 <th key={index} className="py-2 px-3 border-b text-left text-sm font-medium text-gray-700">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {table.data.map((row, rowIndex) => (
//               <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                 {row.map((cell, cellIndex) => (
//                   <td key={cellIndex} className="py-2 px-3 border-b text-sm text-gray-800">
//                     {cell}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }




interface Table {
    name: string;
    headers: string[];
    data: (string | number)[][];
  }
  
  interface Props {
    table: Table;
  }
  
  export default function DataTable({ table }: Props) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {table.headers.map((header, index) => (
                <th key={index} className="py-2 px-3 border-b text-left text-sm font-medium text-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-3 border-b text-sm text-gray-800">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }