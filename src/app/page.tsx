// "use client";
// import Toolbar from "./components/Toolbar";
// import Canvas from "./components/Canvas";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <Canvas />
//       <Toolbar />
//     </div>
//   );
// }

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Learn the concepts of DBMS</h1>
      <p>
        This is a simple application to help you understand the concepts of Database Management Systems (DBMS).
      </p>
      <Link href="/sql-editor">Go to SQL Editor</Link>
      <Link href="/er-diagram">Go to ER Diagram</Link>
    </div>
  )
}