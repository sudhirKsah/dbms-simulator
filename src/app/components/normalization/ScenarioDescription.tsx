export default function ScenarioDescription() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">University Management System Scenario</h2>
        <div className="space-y-4">
          <p>
            A university needs a database system to manage student enrollments, courses, instructors, 
            and academic departments. The current system stores all data in a single table that 
            contains information about students, their courses, grades, instructors, and classroom locations.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-md border">
            <h3 className="font-medium mb-2">Current Database Schema:</h3>
            <p className="font-mono text-sm">
              university_data(record_id, student_id, student_name, course_id, course_name, instructor_id, 
              instructor_name, dept_code, dept_name, grade, room_number, building)
            </p>
          </div>
          
          <p>
            This design has led to several issues:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Data Redundancy</strong>: The same student, course, or instructor information 
              is stored multiple times.
            </li>
            <li>
              <strong>Update Anomalies</strong>: If an instructor's name changes, it must be updated in 
              multiple records.
            </li>
            <li>
              <strong>Insertion Anomalies</strong>: To add a new course without students, all other fields 
              would need dummy values or NULLs.
            </li>
            <li>
              <strong>Deletion Anomalies</strong>: Deleting the last student in a course might unintentionally 
              delete information about the course itself.
            </li>
          </ul>
          
          <p>
            Your task is to apply database normalization principles to redesign this database. 
            You will progress through First Normal Form (1NF), Second Normal Form (2NF), and 
            Third Normal Form (3NF) to eliminate these issues.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="font-medium mb-2">Key Functional Dependencies to Consider:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>student_id → student_name</li>
              <li>course_id → course_name, dept_code</li>
              <li>dept_code → dept_name</li>
              <li>instructor_id → instructor_name</li>
              <li>student_id, course_id → grade</li>
              <li>course_id → room_number, building</li>
              <li>room_number, building → (represents a unique room)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  