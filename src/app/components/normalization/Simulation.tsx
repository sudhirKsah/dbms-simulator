// import { useState } from 'react';
// import ScenarioDescription from './ScenarioDescription';
// import DataTable from './DataTable';
// import NormalizationForm from './NormalizationForm';
// import Feedback from './Feedback';
// import { validateNormalization } from '../../utils/normalizationUtils';

// export default function Simulation() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [studentSolution, setStudentSolution] = useState({
//     firstNF: [],
//     secondNF: [],
//     thirdNF: []
//   });
//   const [feedback, setFeedback] = useState(null);
//   const [selectedNormalizationLevel, setSelectedNormalizationLevel] = useState("1NF");
  
//   const originalTable = {
//     name: "university_data",
//     headers: ["record_id", "student_id", "student_name", "course_id", "course_name", "instructor_id", "instructor_name", "dept_code", "dept_name", "grade", "room_number", "building"],
//     data: [
//       [1, "S1001", "John Smith", "CS101", "Intro to Programming", "I001", "Dr. Jane Wilson", "CS", "Computer Science", "A", "301", "Tech Building"],
//       [2, "S1001", "John Smith", "CS201", "Data Structures", "I002", "Dr. Robert Brown", "CS", "Computer Science", "B+", "105", "Science Hall"],
//       [3, "S1002", "Maria Garcia", "CS101", "Intro to Programming", "I001", "Dr. Jane Wilson", "CS", "Computer Science", "A-", "301", "Tech Building"],
//       [4, "S1002", "Maria Garcia", "MATH101", "Calculus I", "I003", "Dr. Sarah Chen", "MATH", "Mathematics", "B", "210", "Math Building"],
//       [5, "S1003", "David Lee", "MATH101", "Calculus I", "I003", "Dr. Sarah Chen", "MATH", "Mathematics", "C+", "210", "Math Building"],
//       [6, "S1003", "David Lee", "PHYS101", "Intro Physics", "I004", "Dr. James Taylor", "PHYS", "Physics", "B-", "115", "Science Hall"],
//       [7, "S1004", "Emma Johnson", "ENG101", "English Composition", "I005", "Prof. Michael Davis", "ENG", "English", "A", "220", "Liberal Arts"],
//       [8, "S1001", "John Smith", "MATH101", "Calculus I", "I003", "Dr. Sarah Chen", "MATH", "Mathematics", "C", "210", "Math Building"]
//     ]
//   };
  
//   // Correct solutions for each normalization level
//   const correctSolutions = {
//     firstNF: originalTable, // Already in 1NF in this scenario
    
//     secondNF: [
//       {
//         name: "students",
//         headers: ["student_id", "student_name"],
//         data: [
//           ["S1001", "John Smith"],
//           ["S1002", "Maria Garcia"],
//           ["S1003", "David Lee"],
//           ["S1004", "Emma Johnson"]
//         ]
//       },
//       {
//         name: "courses",
//         headers: ["course_id", "course_name", "dept_code"],
//         data: [
//           ["CS101", "Intro to Programming", "CS"],
//           ["CS201", "Data Structures", "CS"],
//           ["MATH101", "Calculus I", "MATH"],
//           ["PHYS101", "Intro Physics", "PHYS"],
//           ["ENG101", "English Composition", "ENG"]
//         ]
//       },
//       {
//         name: "instructors",
//         headers: ["instructor_id", "instructor_name"],
//         data: [
//           ["I001", "Dr. Jane Wilson"],
//           ["I002", "Dr. Robert Brown"],
//           ["I003", "Dr. Sarah Chen"],
//           ["I004", "Dr. James Taylor"],
//           ["I005", "Prof. Michael Davis"]
//         ]
//       },
//       {
//         name: "enrollments",
//         headers: ["record_id", "student_id", "course_id", "instructor_id", "grade"],
//         data: [
//           [1, "S1001", "CS101", "I001", "A"],
//           [2, "S1001", "CS201", "I002", "B+"],
//           [3, "S1002", "CS101", "I001", "A-"],
//           [4, "S1002", "MATH101", "I003", "B"],
//           [5, "S1003", "MATH101", "I003", "C+"],
//           [6, "S1003", "PHYS101", "I004", "B-"],
//           [7, "S1004", "ENG101", "I005", "A"],
//           [8, "S1001", "MATH101", "I003", "C"]
//         ]
//       },
//       {
//         name: "course_locations",
//         headers: ["course_id", "room_number", "building"],
//         data: [
//           ["CS101", "301", "Tech Building"],
//           ["CS201", "105", "Science Hall"],
//           ["MATH101", "210", "Math Building"],
//           ["PHYS101", "115", "Science Hall"],
//           ["ENG101", "220", "Liberal Arts"]
//         ]
//       }
//     ],
    
//     thirdNF: [
//       {
//         name: "students",
//         headers: ["student_id", "student_name"],
//         data: [
//           ["S1001", "John Smith"],
//           ["S1002", "Maria Garcia"],
//           ["S1003", "David Lee"],
//           ["S1004", "Emma Johnson"]
//         ]
//       },
//       {
//         name: "departments",
//         headers: ["dept_code", "dept_name"],
//         data: [
//           ["CS", "Computer Science"],
//           ["MATH", "Mathematics"],
//           ["PHYS", "Physics"],
//           ["ENG", "English"]
//         ]
//       },
//       {
//         name: "courses",
//         headers: ["course_id", "course_name", "dept_code"],
//         data: [
//           ["CS101", "Intro to Programming", "CS"],
//           ["CS201", "Data Structures", "CS"],
//           ["MATH101", "Calculus I", "MATH"],
//           ["PHYS101", "Intro Physics", "PHYS"],
//           ["ENG101", "English Composition", "ENG"]
//         ]
//       },
//       {
//         name: "instructors",
//         headers: ["instructor_id", "instructor_name"],
//         data: [
//           ["I001", "Dr. Jane Wilson"],
//           ["I002", "Dr. Robert Brown"],
//           ["I003", "Dr. Sarah Chen"],
//           ["I004", "Dr. James Taylor"],
//           ["I005", "Prof. Michael Davis"]
//         ]
//       },
//       {
//         name: "course_instructors",
//         headers: ["course_id", "instructor_id"],
//         data: [
//           ["CS101", "I001"],
//           ["CS201", "I002"],
//           ["MATH101", "I003"],
//           ["PHYS101", "I004"],
//           ["ENG101", "I005"]
//         ]
//       },
//       {
//         name: "enrollments",
//         headers: ["record_id", "student_id", "course_id", "grade"],
//         data: [
//           [1, "S1001", "CS101", "A"],
//           [2, "S1001", "CS201", "B+"],
//           [3, "S1002", "CS101", "A-"],
//           [4, "S1002", "MATH101", "B"],
//           [5, "S1003", "MATH101", "C+"],
//           [6, "S1003", "PHYS101", "B-"],
//           [7, "S1004", "ENG101", "A"],
//           [8, "S1001", "MATH101", "C"]
//         ]
//       },
//       {
//         name: "rooms",
//         headers: ["room_id", "room_number", "building"],
//         data: [
//           [1, "301", "Tech Building"],
//           [2, "105", "Science Hall"],
//           [3, "210", "Math Building"],
//           [4, "115", "Science Hall"],
//           [5, "220", "Liberal Arts"]
//         ]
//       },
//       {
//         name: "course_locations",
//         headers: ["course_id", "room_id"],
//         data: [
//           ["CS101", 1],
//           ["CS201", 2],
//           ["MATH101", 3],
//           ["PHYS101", 4],
//           ["ENG101", 5]
//         ]
//       }
//     ]
//   };
  
//   const handleSubmitSolution = (tables) => {
//     const normLevel = selectedNormalizationLevel;
//     let solution;
    
//     if (normLevel === "1NF") {
//       solution = {
//         ...studentSolution,
//         firstNF: tables
//       };
//     } else if (normLevel === "2NF") {
//       solution = {
//         ...studentSolution,
//         secondNF: tables
//       };
//     } else if (normLevel === "3NF") {
//       solution = {
//         ...studentSolution,
//         thirdNF: tables
//       };
//     }
    
//     setStudentSolution(solution);
    
//     // Validate the submitted solution
//     const validationResult = validateNormalization(tables, correctSolutions, normLevel);
//     setFeedback(validationResult);
    
//     if (validationResult.success && normLevel === "1NF") {
//       setSelectedNormalizationLevel("2NF");
//     } else if (validationResult.success && normLevel === "2NF") {
//       setSelectedNormalizationLevel("3NF");
//     } else if (validationResult.success && normLevel === "3NF") {
//       setCurrentStep(4); // Move to completion step
//     }
//   };
  
//   const handleNextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };
  
//   const handlePrevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };
  
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       {/* Progress Indicator */}
//       <div className="flex mb-8 justify-between">
//         {["Scenario", "Data Analysis", "Normalization", "Results"].map((step, index) => (
//           <div 
//             key={index} 
//             className={`flex-1 text-center border-b-4 pb-2 ${
//               index + 1 === currentStep 
//                 ? "border-blue-500 text-blue-600 font-medium" 
//                 : "border-gray-200 text-gray-500"
//             }`}
//           >
//             {step}
//           </div>
//         ))}
//       </div>
      
//       {/* Step Content */}
//       {currentStep === 1 && (
//         <div>
//           <ScenarioDescription />
//           <div className="mt-6 flex justify-end">
//             <button 
//               onClick={handleNextStep}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Next: View Data
//             </button>
//           </div>
//         </div>
//       )}
      
//       {currentStep === 2 && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Original Database Table</h2>
//           <p className="mb-4">
//             Below is the original university data table. Examine it for redundancies, dependencies, 
//             and normalization issues.
//           </p>
//           <DataTable table={originalTable} />
          
//           <div className="mt-8 bg-yellow-50 p-4 rounded-md border border-yellow-200">
//             <h3 className="font-semibold text-lg mb-2">Data Analysis Questions</h3>
//             <p className="mb-2">Consider the following questions:</p>
//             <ul className="list-disc pl-5 space-y-2">
//               <li>What are the primary keys and candidate keys in this table?</li>
//               <li>What functional dependencies can you identify?</li>
//               <li>What anomalies (insertion, update, deletion) might occur with this design?</li>
//               <li>Is this table already in First Normal Form (1NF)? Why or why not?</li>
//             </ul>
//           </div>
          
//           <div className="mt-6 flex justify-between">
//             <button 
//               onClick={handlePrevStep}
//               className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//             >
//               Back
//             </button>
//             <button 
//               onClick={handleNextStep}
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Next: Start Normalization
//             </button>
//           </div>
//         </div>
//       )}
      
//       {currentStep === 3 && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">
//             Database Normalization: {selectedNormalizationLevel}
//           </h2>
          
//           <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6">
//             <h3 className="font-semibold text-lg mb-2">Normalization Guidelines</h3>
//             {selectedNormalizationLevel === "1NF" && (
//               <div>
//                 <p className="mb-2"><strong>First Normal Form (1NF) Requirements:</strong></p>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Each table cell should contain a single value</li>
//                   <li>Each column should have a unique name</li>
//                   <li>Values in a column should be of the same domain</li>
//                   <li>Each record needs to be unique - identify a primary key</li>
//                 </ul>
//               </div>
//             )}
            
//             {selectedNormalizationLevel === "2NF" && (
//               <div>
//                 <p className="mb-2"><strong>Second Normal Form (2NF) Requirements:</strong></p>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Table must be in 1NF</li>
//                   <li>No partial dependencies (non-key attributes must depend on the whole primary key)</li>
//                   <li>Identify attributes that depend only on part of the primary key</li>
//                   <li>Move these attributes to separate tables</li>
//                 </ul>
//               </div>
//             )}
            
//             {selectedNormalizationLevel === "3NF" && (
//               <div>
//                 <p className="mb-2"><strong>Third Normal Form (3NF) Requirements:</strong></p>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Table must be in 2NF</li>
//                   <li>No transitive dependencies (non-key attributes should not depend on other non-key attributes)</li>
//                   <li>Identify attributes that depend on non-key attributes</li>
//                   <li>Move these to separate tables</li>
//                 </ul>
//               </div>
//             )}
//           </div>
          
//           <NormalizationForm 
//             originalTable={originalTable} 
//             currentNormalization={selectedNormalizationLevel}
//             previousSolution={selectedNormalizationLevel === "1NF" 
//               ? [originalTable] 
//               : (selectedNormalizationLevel === "2NF" 
//                 ? studentSolution.firstNF 
//                 : studentSolution.secondNF)}
//             onSubmit={handleSubmitSolution}
//           />
          
//           {feedback && (
//             <Feedback feedback={feedback} />
//           )}
          
//           <div className="mt-6 flex justify-between">
//             <button 
//               onClick={handlePrevStep}
//               className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//             >
//               Back
//             </button>
//             {feedback && feedback.success && selectedNormalizationLevel === "3NF" && (
//               <button 
//                 onClick={handleNextStep}
//                 className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//               >
//                 Complete Simulation
//               </button>
//             )}
//           </div>
//         </div>
//       )}
      
//       {currentStep === 4 && (
//         <div className="text-center">
//           <div className="inline-block p-6 bg-green-100 rounded-full mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold mb-4 text-green-700">Normalization Complete!</h2>
//           <p className="mb-6 text-lg">
//             Congratulations! You have successfully normalized the university database 
//             from 1NF through 3NF.
//           </p>
          
//           <div className="bg-white border rounded-lg p-6 mb-8 text-left">
//             <h3 className="text-xl font-semibold mb-4">Summary of Your Normalization Process</h3>
            
//             <div className="mb-6">
//               <h4 className="font-medium text-lg mb-2">First Normal Form (1NF)</h4>
//               <p>
//                 You identified that the original table was already in 1NF as it had atomic values, 
//                 a primary key, and no repeating groups.
//               </p>
//             </div>
            
//             <div className="mb-6">
//               <h4 className="font-medium text-lg mb-2">Second Normal Form (2NF)</h4>
//               <p>
//                 You removed partial dependencies by creating separate tables for students, courses, 
//                 instructors, enrollments, and course locations.
//               </p>
//             </div>
            
//             <div className="mb-6">
//               <h4 className="font-medium text-lg mb-2">Third Normal Form (3NF)</h4>
//               <p>
//                 You eliminated transitive dependencies by creating separate tables for departments and rooms, 
//                 ensuring each non-key attribute depends only on the primary key.
//               </p>
//             </div>
            
//             <div className="p-4 bg-blue-50 rounded-md">
//               <h4 className="font-medium text-lg mb-2">Benefits of Your Normalized Design:</h4>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>Eliminated data redundancy</li>
//                 <li>Improved data integrity</li>
//                 <li>Simplified data maintenance</li>
//                 <li>Prevented update, insertion, and deletion anomalies</li>
//                 <li>Created a more flexible database structure</li>
//               </ul>
//             </div>
//           </div>
          
//           <button 
//             onClick={() => {
//               setCurrentStep(1);
//               setStudentSolution({
//                 firstNF: [],
//                 secondNF: [],
//                 thirdNF: []
//               });
//               setFeedback(null);
//               setSelectedNormalizationLevel("1NF");
//             }}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Start New Simulation
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState } from 'react';
import ScenarioDescription from './ScenarioDescription';
import DataTable from './DataTable';
import NormalizationForm from './NormalizationForm';
import Feedback from './Feedback';
import { validateNormalization } from '../../utils/normalizationUtils';

// Define table structure
interface Table {
  name: string;
  headers: string[];
  data: (string | number)[][];
}

// Define student solution structure
interface StudentSolution {
  firstNF: Table[];
  secondNF: Table[];
  thirdNF: Table[];
}

// Define correct solutions structure
interface CorrectSolutions {
  firstNF: Table;
  secondNF: Table[];
  thirdNF: Table[];
}

export default function Simulation() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [studentSolution, setStudentSolution] = useState<StudentSolution>({
    firstNF: [],
    secondNF: [],
    thirdNF: []
  });
  const [feedback, setFeedback] = useState<{ success: boolean; message: string; details?: string[]; suggestions?: string[] } | null>(null);
  const [selectedNormalizationLevel, setSelectedNormalizationLevel] = useState<"1NF" | "2NF" | "3NF">("1NF");
  
  const originalTable: Table = {
    name: "university_data",
    headers: ["record_id", "student_id", "student_name", "course_id", "course_name", "instructor_id", "instructor_name", "dept_code", "dept_name", "grade", "room_number", "building"],
    data: [
      [1, "S1001", "John Smith", "CS101", "Intro to Programming", "I001", "Dr. Jane Wilson", "CS", "Computer Science", "A", "301", "Tech Building"],
      [2, "S1001", "John Smith", "CS201", "Data Structures", "I002", "Dr. Robert Brown", "CS", "Computer Science", "B+", "105", "Science Hall"],
      [3, "S1002", "Maria Garcia", "CS101", "Intro to Programming", "I001", "Dr. Jane Wilson", "CS", "Computer Science", "A-", "301", "Tech Building"],
      [4, "S1002", "Maria Garcia", "MATH101", "Calculus I", "I003", "Dr. Sarah Chen", "MATH", "Mathematics", "B", "210", "Math Building"],
      [5, "S1003", "David Lee", "MATH101", "Calculus I", "I003", "Dr. Sarah Chen", "MATH", "Mathematics", "C+", "210", "Math Building"],
      [6, "S1003", "David Lee", "PHYS101", "Intro Physics", "I004", "Dr. James Taylor", "PHYS", "Physics", "B-", "115", "Science Hall"],
      [7, "S1004", "Emma Johnson", "ENG101", "English Composition", "I005", "Prof. Michael Davis", "ENG", "English", "A", "220", "Liberal Arts"],
      [8, "S1001", "John Smith", "MATH101", "Calculus I", "I003", "Dr. Sarah Chen", "MATH", "Mathematics", "C", "210", "Math Building"]
    ]
  };
  
  const correctSolutions: CorrectSolutions = {
    firstNF: originalTable,
    secondNF: [
      {
        name: "students",
        headers: ["student_id", "student_name"],
        data: [
          ["S1001", "John Smith"],
          ["S1002", "Maria Garcia"],
          ["S1003", "David Lee"],
          ["S1004", "Emma Johnson"]
        ]
      },
      {
        name: "courses",
        headers: ["course_id", "course_name", "dept_code"],
        data: [
          ["CS101", "Intro to Programming", "CS"],
          ["CS201", "Data Structures", "CS"],
          ["MATH101", "Calculus I", "MATH"],
          ["PHYS101", "Intro Physics", "PHYS"],
          ["ENG101", "English Composition", "ENG"]
        ]
      },
      {
        name: "instructors",
        headers: ["instructor_id", "instructor_name"],
        data: [
          ["I001", "Dr. Jane Wilson"],
          ["I002", "Dr. Robert Brown"],
          ["I003", "Dr. Sarah Chen"],
          ["I004", "Dr. James Taylor"],
          ["I005", "Prof. Michael Davis"]
        ]
      },
      {
        name: "enrollments",
        headers: ["record_id", "student_id", "course_id", "instructor_id", "grade"],
        data: [
          [1, "S1001", "CS101", "I001", "A"],
          [2, "S1001", "CS201", "I002", "B+"],
          [3, "S1002", "CS101", "I001", "A-"],
          [4, "S1002", "MATH101", "I003", "B"],
          [5, "S1003", "MATH101", "I003", "C+"],
          [6, "S1003", "PHYS101", "I004", "B-"],
          [7, "S1004", "ENG101", "I005", "A"],
          [8, "S1001", "MATH101", "I003", "C"]
        ]
      },
      {
        name: "course_locations",
        headers: ["course_id", "room_number", "building"],
        data: [
          ["CS101", "301", "Tech Building"],
          ["CS201", "105", "Science Hall"],
          ["MATH101", "210", "Math Building"],
          ["PHYS101", "115", "Science Hall"],
          ["ENG101", "220", "Liberal Arts"]
        ]
      }
    ],
    thirdNF: [
      {
        name: "students",
        headers: ["student_id", "student_name"],
        data: [
          ["S1001", "John Smith"],
          ["S1002", "Maria Garcia"],
          ["S1003", "David Lee"],
          ["S1004", "Emma Johnson"]
        ]
      },
      {
        name: "departments",
        headers: ["dept_code", "dept_name"],
        data: [
          ["CS", "Computer Science"],
          ["MATH", "Mathematics"],
          ["PHYS", "Physics"],
          ["ENG", "English"]
        ]
      },
      {
        name: "courses",
        headers: ["course_id", "course_name", "dept_code"],
        data: [
          ["CS101", "Intro to Programming", "CS"],
          ["CS201", "Data Structures", "CS"],
          ["MATH101", "Calculus I", "MATH"],
          ["PHYS101", "Intro Physics", "PHYS"],
          ["ENG101", "English Composition", "ENG"]
        ]
      },
      {
        name: "instructors",
        headers: ["instructor_id", "instructor_name"],
        data: [
          ["I001", "Dr. Jane Wilson"],
          ["I002", "Dr. Robert Brown"],
          ["I003", "Dr. Sarah Chen"],
          ["I004", "Dr. James Taylor"],
          ["I005", "Prof. Michael Davis"]
        ]
      },
      {
        name: "course_instructors",
        headers: ["course_id", "instructor_id"],
        data: [
          ["CS101", "I001"],
          ["CS201", "I002"],
          ["MATH101", "I003"],
          ["PHYS101", "I004"],
          ["ENG101", "I005"]
        ]
      },
      {
        name: "enrollments",
        headers: ["record_id", "student_id", "course_id", "grade"],
        data: [
          [1, "S1001", "CS101", "A"],
          [2, "S1001", "CS201", "B+"],
          [3, "S1002", "CS101", "A-"],
          [4, "S1002", "MATH101", "B"],
          [5, "S1003", "MATH101", "C+"],
          [6, "S1003", "PHYS101", "B-"],
          [7, "S1004", "ENG101", "A"],
          [8, "S1001", "MATH101", "C"]
        ]
      },
      {
        name: "rooms",
        headers: ["room_id", "room_number", "building"],
        data: [
          [1, "301", "Tech Building"],
          [2, "105", "Science Hall"],
          [3, "210", "Math Building"],
          [4, "115", "Science Hall"],
          [5, "220", "Liberal Arts"]
        ]
      },
      {
        name: "course_locations",
        headers: ["course_id", "room_id"],
        data: [
          ["CS101", 1],
          ["CS201", 2],
          ["MATH101", 3],
          ["PHYS101", 4],
          ["ENG101", 5]
        ]
      }
    ]
  };
  
  const handleSubmitSolution = (tables: Table[]) => {
    const normLevel = selectedNormalizationLevel;
    let solution: StudentSolution;
    
    if (normLevel === "1NF") {
      solution = {
        ...studentSolution,
        firstNF: tables
      };
    } else if (normLevel === "2NF") {
      solution = {
        ...studentSolution,
        secondNF: tables
      };
    } else if (normLevel === "3NF") {
      solution = {
        ...studentSolution,
        thirdNF: tables
      };
    }
    
    setStudentSolution(solution);
    
    const validationResult = validateNormalization(tables, correctSolutions, normLevel);
    setFeedback(validationResult);
    
    if (validationResult.success && normLevel === "1NF") {
      setSelectedNormalizationLevel("2NF");
    } else if (validationResult.success && normLevel === "2NF") {
      setSelectedNormalizationLevel("3NF");
    } else if (validationResult.success && normLevel === "3NF") {
      setCurrentStep(4);
    }
  };
  
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-8 justify-between">
        {["Scenario", "Data Analysis", "Normalization", "Results"].map((step, index) => (
          <div 
            key={index} 
            className={`flex-1 text-center border-b-4 pb-2 ${
              index + 1 === currentStep 
                ? "border-blue-500 text-blue-600 font-medium" 
                : "border-gray-200 text-gray-500"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      
      {currentStep === 1 && (
        <div>
          <ScenarioDescription />
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next: View Data
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Original Database Table</h2>
          <p className="mb-4">
            Below is the original university data table. Examine it for redundancies, dependencies, 
            and normalization issues.
          </p>
          <DataTable table={originalTable} />
          
          <div className="mt-8 bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <h3 className="font-semibold text-lg mb-2">Data Analysis Questions</h3>
            <p className="mb-2">Consider the following questions:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>What are the primary keys and candidate keys in this table?</li>
              <li>What functional dependencies can you identify?</li>
              <li>What anomalies (insertion, update, deletion) might occur with this design?</li>
              <li>Is this table already in First Normal Form (1NF)? Why or why not?</li>
            </ul>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={handlePrevStep}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back
            </button>
            <button 
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next: Start Normalization
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Database Normalization: {selectedNormalizationLevel}
          </h2>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6">
            <h3 className="font-semibold text-lg mb-2">Normalization Guidelines</h3>
            {selectedNormalizationLevel === "1NF" && (
              <div>
                <p className="mb-2"><strong>First Normal Form (1NF) Requirements:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Each table cell should contain a single value</li>
                  <li>Each column should have a unique name</li>
                  <li>Values in a column should be of the same domain</li>
                  <li>Each record needs to be unique - identify a primary key</li>
                </ul>
              </div>
            )}
            
            {selectedNormalizationLevel === "2NF" && (
              <div>
                <p className="mb-2"><strong>Second Normal Form (2NF) Requirements:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Table must be in 1NF</li>
                  <li>No partial dependencies (non-key attributes must depend on the whole primary key)</li>
                  <li>Identify attributes that depend only on part of the primary key</li>
                  <li>Move these attributes to separate tables</li>
                </ul>
              </div>
            )}
            
            {selectedNormalizationLevel === "3NF" && (
              <div>
                <p className="mb-2"><strong>Third Normal Form (3NF) Requirements:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Table must be in 2NF</li>
                  <li>No transitive dependencies (non-key attributes should not depend on other non-key attributes)</li>
                  <li>Identify attributes that depend on non-key attributes</li>
                  <li>Move these to separate tables</li>
                </ul>
              </div>
            )}
          </div>
          
          <NormalizationForm 
            originalTable={originalTable} 
            currentNormalization={selectedNormalizationLevel}
            previousSolution={selectedNormalizationLevel === "1NF" 
              ? [originalTable] 
              : (selectedNormalizationLevel === "2NF" 
                ? studentSolution.firstNF 
                : studentSolution.secondNF)}
            onSubmit={handleSubmitSolution}
          />
          
          {feedback && (
            <Feedback feedback={feedback} />
          )}
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={handlePrevStep}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back
            </button>
            {feedback && feedback.success && selectedNormalizationLevel === "3NF" && (
              <button 
                onClick={handleNextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Complete Simulation
              </button>
            )}
          </div>
        </div>
      )}
      
      {currentStep === 4 && (
        <div className="text-center">
          <div className="inline-block p-6 bg-green-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Normalization Complete!</h2>
          <p className="mb-6 text-lg">
            Congratulations! You have successfully normalized the university database 
            from 1NF through 3NF.
          </p>
          
          <div className="bg-white border rounded-lg p-6 mb-8 text-left">
            <h3 className="text-xl font-semibold mb-4">Summary of Your Normalization Process</h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-2">First Normal Form (1NF)</h4>
              <p>
                You identified that the original table was already in 1NF as it had atomic values, 
                a primary key, and no repeating groups.
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-2">Second Normal Form (2NF)</h4>
              <p>
                You removed partial dependencies by creating separate tables for students, courses, 
                instructors, enrollments, and course locations.
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-2">Third Normal Form (3NF)</h4>
              <p>
                You eliminated transitive dependencies by creating separate tables for departments and rooms, 
                ensuring each non-key attribute depends only on the primary key.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md">
              <h4 className="font-medium text-lg mb-2">Benefits of Your Normalized Design:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Eliminated data redundancy</li>
                <li>Improved data integrity</li>
                <li>Simplified data maintenance</li>
                <li>Prevented update, insertion, and deletion anomalies</li>
                <li>Created a more flexible database structure</li>
              </ul>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setCurrentStep(1);
              setStudentSolution({
                firstNF: [],
                secondNF: [],
                thirdNF: []
              });
              setFeedback(null);
              setSelectedNormalizationLevel("1NF");
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Start New Simulation
          </button>
        </div>
      )}
    </div>
  );
}