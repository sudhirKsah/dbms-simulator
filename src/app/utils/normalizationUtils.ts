// export function validateNormalization(studentTables, correctSolutions, normLevel) {
//     // Basic validation logic for each normalization level
//     if (normLevel === "1NF") {
//       // For this simulation, the original table is already in 1NF
//       return {
//         success: true,
//         message: "Your solution is correct! The table is already in First Normal Form (1NF) because it has atomic values, a primary key, and no repeating groups.",
//         details: [
//           "All attributes contain atomic (single) values",
//           "The table has a primary key (record_id)",
//           "There are no repeating groups"
//         ]
//       };
//     }
    
//     if (normLevel === "2NF") {
//       // Check if student has created at least 4 tables for 2NF
//       if (studentTables.length < 4) {
//         return {
//           success: false,
//           message: "Your solution does not appear to fully address partial dependencies.",
//           details: [
//             `Expected at least 4-5 tables, but found ${studentTables.length}`,
//             "Second Normal Form requires removing partial dependencies"
//           ],
//           suggestions: [
//             "Create separate tables for students, courses, instructors",
//             "Create an enrollments table for student-course relationships",
//             "Consider the location information (room/building) and its relationships"
//           ]
//         };
//       }
      
//       // Basic pattern validation for 2NF
//       let hasStudentsTable = false;
//       let hasCoursesTable = false;
//       let hasInstructorsTable = false;
//       let hasEnrollmentsTable = false;
      
//       // Check tables by expected content patterns
//       for (const table of studentTables) {
//         const headers = table.headers.map(h => h.toLowerCase());
        
//         // Check for students table pattern
//         if (headers.includes('student_id') && headers.includes('student_name') && headers.length <= 3) {
//           hasStudentsTable = true;
//         }
        
//         // Check for courses table pattern
//         if (headers.includes('course_id') && headers.includes('course_name') && headers.length <= 4) {
//           hasCoursesTable = true;
//         }
        
//         // Check for instructors table pattern
//         if (headers.includes('instructor_id') && headers.includes('instructor_name') && headers.length <= 3) {
//           hasInstructorsTable = true;
//         }
        
//         // Check for enrollments table pattern
//         if (headers.includes('student_id') && headers.includes('course_id') && 
//             (headers.includes('grade') || headers.includes('instructor_id'))) {
//           hasEnrollmentsTable = true;
//         }
//       }
      
//       if (hasStudentsTable && hasCoursesTable && hasInstructorsTable && hasEnrollmentsTable) {
//         return {
//           success: true,
//           message: "Great job! Your schema satisfies Second Normal Form requirements.",
//           details: [
//             "You've successfully removed partial dependencies",
//             "Your tables properly separate entity data into logical groups",
//             "The relationships between entities are maintained"
//           ]
//         };
//       } else {
//         return {
//           success: false,
//           message: "Your solution is missing some key tables needed for 2NF.",
//           details: [
//             !hasStudentsTable ? "Missing a dedicated students table" : "",
//             !hasCoursesTable ? "Missing a dedicated courses table" : "",
//             !hasInstructorsTable ? "Missing a dedicated instructors table" : "",
//             !hasEnrollmentsTable ? "Missing a proper enrollments/relationships table" : ""
//           ].filter(d => d),
//           suggestions: [
//             "Ensure each non-key attribute depends on the whole primary key",
//             "Create separate tables for each entity type (student, course, instructor)",
//             "Create relationship tables with the appropriate keys from each entity"
//           ]
//         };
//       }
//     }
    
//     if (normLevel === "3NF") {
//       // Check if student has created at least 6 tables for 3NF
//       if (studentTables.length < 6) {
//         return {
//           success: false,
//           message: "Your solution does not appear to fully address transitive dependencies.",
//           details: [
//             `Expected at least 6-8 tables, but found ${studentTables.length}`,
//             "Third Normal Form requires removing transitive dependencies"
//           ],
//           suggestions: [
//             "Create a separate table for departments",
//             "Extract room/building information to a separate table",
//             "Ensure instructor-course relationships are properly normalized",
//             "Check if non-key attributes depend only on the key"
//           ]
//         };
//       }
      
//       // Basic pattern validation for 3NF - expanding on 2NF checks
//       let hasDepartmentsTable = false;
//       let hasRoomsTable = false;
//       let hasLocationMappingTable = false;
      
//       // Check tables by expected content patterns
//       for (const table of studentTables) {
//         const headers = table.headers.map(h => h.toLowerCase());
        
//         // Check for departments table pattern
//         if (headers.includes('dept_code') && headers.includes('dept_name') && headers.length <= 3) {
//           hasDepartmentsTable = true;
//         }
        
//         // Check for rooms table pattern
//         if ((headers.includes('room_id') || headers.includes('room_number')) && 
//             headers.includes('building') && headers.length <= 3) {
//           hasRoomsTable = true;
//         }
        
//         // Check for some kind of mapping table (course-room, course-instructor)
//         if ((headers.includes('course_id') && 
//             (headers.includes('room_id') || headers.includes('instructor_id'))) && 
//             headers.length <= 3) {
//           hasLocationMappingTable = true;
//         }
//       }
      
//       let missing3NFElements = [];
//       if (!hasDepartmentsTable) missing3NFElements.push("separate departments table");
//       if (!hasRoomsTable) missing3NFElements.push("separate rooms/locations table");
//       if (!hasLocationMappingTable) missing3NFElements.push("proper relationship mapping tables");
      
//       if (missing3NFElements.length === 0) {
//         return {
//           success: true,
//           message: "Excellent! Your schema satisfies Third Normal Form requirements.",
//           details: [
//             "You've successfully removed transitive dependencies",
//             "Your tables properly normalize all relationships",
//             "Non-key attributes depend only on the primary key"
//           ]
//         };
//       } else {
//         return {
//           success: false,
//           message: "Your solution is missing some elements needed for 3NF.",
//           details: [
//             "Missing: " + missing3NFElements.join(", ")
//           ],
//           suggestions: [
//             "Remove all transitive dependencies by creating additional tables",
//             "Ensure each non-key attribute depends only on the primary key, nothing else",
//             "Separate entity attributes into their own tables with proper references"
//           ]
//         };
//       }
//     }
    
//     return {
//       success: false,
//       message: "Unable to validate your solution."
//     };
//   }


interface Table {
    name: string;
    headers: string[];
    data: (string | number)[][];
  }
  
  interface CorrectSolutions {
    firstNF: Table;
    secondNF: Table[];
    thirdNF: Table[];
  }
  
  interface ValidationResult {
    success: boolean;
    message: string;
    details?: string[];
    suggestions?: string[];
  }
  
  export function validateNormalization(studentTables: Table[], correctSolutions: CorrectSolutions, normLevel: "1NF" | "2NF" | "3NF"): ValidationResult {
    if (normLevel === "1NF") {
      return {
        success: true,
        message: "Your solution is correct! The table is already in First Normal Form (1NF) because it has atomic values, a primary key, and no repeating groups.",
        details: [
          "All attributes contain atomic (single) values",
          "The table has a primary key (record_id)",
          "There are no repeating groups"
        ]
      };
    }
    
    if (normLevel === "2NF") {
      if (studentTables.length < 4) {
        return {
          success: false,
          message: "Your solution does not appear to fully address partial dependencies.",
          details: [
            `Expected at least 4-5 tables, but found ${studentTables.length}`,
            "Second Normal Form requires removing partial dependencies"
          ],
          suggestions: [
            "Create separate tables for students, courses, instructors",
            "Create an enrollments table for student-course relationships",
            "Consider the location information (room/building) and its relationships"
          ]
        };
      }
      
      let hasStudentsTable = false;
      let hasCoursesTable = false;
      let hasInstructorsTable = false;
      let hasEnrollmentsTable = false;
      
      for (const table of studentTables) {
        const headers = table.headers.map(h => h.toLowerCase());
        
        if (headers.includes('student_id') && headers.includes('student_name') && headers.length <= 3) {
          hasStudentsTable = true;
        }
        
        if (headers.includes('course_id') && headers.includes('course_name') && headers.length <= 4) {
          hasCoursesTable = true;
        }
        
        if (headers.includes('instructor_id') && headers.includes('instructor_name') && headers.length <= 3) {
          hasInstructorsTable = true;
        }
        
        if (headers.includes('student_id') && headers.includes('course_id') && 
            (headers.includes('grade') || headers.includes('instructor_id'))) {
          hasEnrollmentsTable = true;
        }
      }
      
      if (hasStudentsTable && hasCoursesTable && hasInstructorsTable && hasEnrollmentsTable) {
        return {
          success: true,
          message: "Great job! Your schema satisfies Second Normal Form requirements.",
          details: [
            "You've successfully removed partial dependencies",
            "Your tables properly separate entity data into logical groups",
            "The relationships between entities are maintained"
          ]
        };
      } else {
        return {
          success: false,
          message: "Your solution is missing some key tables needed for 2NF.",
          details: [
            !hasStudentsTable ? "Missing a dedicated students table" : "",
            !hasCoursesTable ? "Missing a dedicated courses table" : "",
            !hasInstructorsTable ? "Missing a dedicated instructors table" : "",
            !hasEnrollmentsTable ? "Missing a proper enrollments/relationships table" : ""
          ].filter(d => d),
          suggestions: [
            "Ensure each non-key attribute depends on the whole primary key",
            "Create separate tables for each entity type (student, course, instructor)",
            "Create relationship tables with the appropriate keys from each entity"
          ]
        };
      }
    }
    
    if (normLevel === "3NF") {
      if (studentTables.length < 6) {
        return {
          success: false,
          message: "Your solution does not appear to fully address transitive dependencies.",
          details: [
            `Expected at least 6-8 tables, but found ${studentTables.length}`,
            "Third Normal Form requires removing transitive dependencies"
          ],
          suggestions: [
            "Create a separate table for departments",
            "Extract room/building information to a separate table",
            "Ensure instructor-course relationships are properly normalized",
            "Check if non-key attributes depend only on the key"
          ]
        };
      }
      
      let hasDepartmentsTable = false;
      let hasRoomsTable = false;
      let hasLocationMappingTable = false;
      
      for (const table of studentTables) {
        const headers = table.headers.map(h => h.toLowerCase());
        
        if (headers.includes('dept_code') && headers.includes('dept_name') && headers.length <= 3) {
          hasDepartmentsTable = true;
        }
        
        if ((headers.includes('room_id') || headers.includes('room_number')) && 
            headers.includes('building') && headers.length <= 3) {
          hasRoomsTable = true;
        }
        
        if ((headers.includes('course_id') && 
            (headers.includes('room_id') || headers.includes('instructor_id'))) && 
            headers.length <= 3) {
          hasLocationMappingTable = true;
        }
      }
      
      let missing3NFElements: string[] = [];
      if (!hasDepartmentsTable) missing3NFElements.push("separate departments table");
      if (!hasRoomsTable) missing3NFElements.push("separate rooms/locations table");
      if (!hasLocationMappingTable) missing3NFElements.push("proper relationship mapping tables");
      
      if (missing3NFElements.length === 0) {
        return {
          success: true,
          message: "Excellent! Your schema satisfies Third Normal Form requirements.",
          details: [
            "You've successfully removed transitive dependencies",
            "Your tables properly normalize all relationships",
            "Non-key attributes depend only on the primary key"
          ]
        };
      } else {
        return {
          success: false,
          message: "Your solution is missing some elements needed for 3NF.",
          details: [
            "Missing: " + missing3NFElements.join(", ")
          ],
          suggestions: [
            "Remove all transitive dependencies by creating additional tables",
            "Ensure each non-key attribute depends only on the primary key, nothing else",
            "Separate entity attributes into their own tables with proper references"
          ]
        };
      }
    }
    
    return {
      success: false,
      message: "Unable to validate your solution."
    };
  }