
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
          <div className="group p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-xl rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-red-600">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-3">SQL Editor</h2>
            <p className="text-gray-600">
              Write, run, and test <strong>SQL queries</strong> with real-time syntax highlighting, and visual execution plans. See your schema and results instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-xl rounded-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-purple-600">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m12 11H9m6 8V3" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-purple-700 mb-3">Learn Normalization</h2>
            <p className="text-gray-600">
              Understand <strong>database normalization</strong> through interactive simulation, ensuring efficient data structuring, redundancy elimination, and optimized queries.
            </p>
          </div>

        </div>

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
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Try SQL Editor
          </a>
          <a
            href="/learn-normalization"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11M9 21V3m12 11H9m6 8V3" />
            </svg>
            Learn Normalization
          </a>
        </div>
      </div>
    </div>
  );
}
