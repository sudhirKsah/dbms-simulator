// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//       {/* Header Section */}
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-4">DBMS Visualizer</h1>
//       <p className="text-lg text-gray-700 text-center max-w-2xl">
//         A powerful interactive tool for learning and visualizing database concepts, 
//         including ER diagrams, SQL execution, and normalization techniques.
//       </p>

//       {/* Features Section */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
//         {/* Feature 1 */}
//         <div className="p-6 bg-white shadow-lg rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-blue-600">ER Diagram Simulator</h2>
//           <p className="text-gray-600 mt-2">
//             Design and visualize <strong>Entity-Relationship</strong> diagrams dynamically.
//           </p>
//         </div>

//         {/* Feature 2 */}
//         <div className="p-6 bg-white shadow-lg rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-green-600">SQL Editor</h2>
//           <p className="text-gray-600 mt-2">
//             Write, run, and test <strong>SQL queries</strong> directly in your browser.
//           </p>
//         </div>

//         {/* Feature 3 */}
//         <div className="p-6 bg-white shadow-lg rounded-lg text-center">
//           <h2 className="text-xl font-semibold text-purple-600">Learn DBMS Concepts</h2>
//           <p className="text-gray-600 mt-2">
//             Understand <strong>database fundamentals</strong> with interactive lessons.
//           </p>
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="mt-10 flex flex-wrap gap-4">
//         <a
//           href="/learn-er"
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
//         >
//           Learn ER Diagrams
//         </a>
//         <a
//           href="/learn-er/er-playground"
//           className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
//         >
//           ER Playground
//         </a>
//         <a
//           href="/sql-editor"
//           className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
//         >
//           Try SQL Editor
//         </a>
//       </div>
//     </div>
//   );
// }



export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with ER Diagram Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0">
        {/* ER Diagram Background Pattern - SVG pattern that represents an ER diagram */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="er-diagram" patternUnits="userSpaceOnUse" width="500" height="500">
                {/* Tables */}
                <rect x="50" y="50" width="120" height="80" rx="2" fill="#4F46E5" />
                <rect x="300" y="100" width="150" height="100" rx="2" fill="#7C3AED" />
                <rect x="100" y="250" width="130" height="90" rx="2" fill="#2563EB" />
                <rect x="320" y="280" width="110" height="70" rx="2" fill="#8B5CF6" />
                
                {/* Relationships - diamond shapes */}
                <polygon points="220,90 240,110 220,130 200,110" fill="#EC4899" />
                <polygon points="265,200 285,220 265,240 245,220" fill="#EC4899" />
                
                {/* Connecting lines */}
                <line x1="170" y1="110" x2="200" y2="110" stroke="#64748B" strokeWidth="2" />
                <line x1="240" y1="110" x2="300" y2="130" stroke="#64748B" strokeWidth="2" />
                <line x1="220" y1="130" x2="170" y2="250" stroke="#64748B" strokeWidth="2" />
                <line x1="230" y1="295" x2="320" y2="315" stroke="#64748B" strokeWidth="2" />
                <line x1="285" y1="220" x2="350" y2="200" stroke="#64748B" strokeWidth="2" />
                <line x1="245" y1="220" x2="165" y2="250" stroke="#64748B" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#er-diagram)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Hero Section with Subtle Animation */}
        <div className="text-center mb-16 animate-float">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-700 mb-6">
            DBMS Visualizer
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A powerful interactive <strong>Ai-powered</strong> virtual lab for learning and visualizing database concepts,
            including ER diagrams, SQL execution, and normalization techniques.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Feature 1 */}
          <div className="group p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-xl rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-blue-600">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-700 mb-3">ER Diagram Simulator</h2>
            <p className="text-gray-600">
              Design and visualize <strong>Entity-Relationship</strong> diagrams. Create entities, define relationships and see magic.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-xl rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-green-600">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-3">SQL Editor</h2>
            <p className="text-gray-600">
              Write, run, and test <strong>SQL queries</strong> with real-time syntax highlighting, and visual execution plans. See your schema and results instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-xl rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-purple-600">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-purple-700 mb-3">Interactive Tutorials</h2>
            <p className="text-gray-600">
              Master <strong>database fundamentals</strong> with step-by-step interactive lessons, from basic table creation to advanced normalization techniques and query optimization.
            </p>
          </div>
        </div>

        {/* Additional Features Section */}
        {/* <div className="mt-16 w-full max-w-6xl">
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">What You Can Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Database Schema Design</h4>
                  <p className="text-gray-600">Create, edit, and visualize database schemas with intuitive tools</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Normalization Analysis</h4>
                  <p className="text-gray-600">Analyze and improve table structures with normalization tools</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Query Optimization</h4>
                  <p className="text-gray-600">Visualize and optimize SQL query execution plans</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Relationship Visualization</h4>
                  <p className="text-gray-600">Clearly see and understand table relationships and dependencies</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Navigation Buttons with Improved Styling */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <a
            href="/learn-er"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Learn ER Diagrams
          </a>
          <a
            href="/learn-er/er-playground"
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            ER Playground
          </a>
          <a
            href="/sql-editor"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Try SQL Editor
          </a>
        </div>
      </div>
    </div>
  );
}
