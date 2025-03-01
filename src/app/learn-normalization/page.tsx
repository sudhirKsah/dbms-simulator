export default function LearnNormalization() {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Understanding Database Normalization
        </h1>
  
        {/* Introduction */}
        <p className="text-lg text-gray-700 text-center mb-8">
          Database normalization is a technique used in database design to organize data efficiently. It reduces redundancy, prevents data anomalies, and ensures data integrity by structuring tables and their relationships according to specific rules called <strong>normal forms</strong>. Let’s dive into what normalization is, why it matters, and how to apply it step-by-step.
        </p>
  
        {/* Section: What is Normalization? */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">What is Database Normalization?</h2>
          <p className="text-gray-700 leading-relaxed">
            Normalization is the process of breaking down a large, unorganized table into smaller, well-structured tables. It eliminates unnecessary duplication and ensures that data dependencies make logical sense. The goal? A database that’s easier to maintain, update, and query without introducing errors like <strong>insertion anomalies</strong>, <strong>deletion anomalies</strong>, or <strong>update anomalies</strong>.
          </p>
        </div>
  
        {/* Section: Why Normalize? */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">Why Normalize a Database?</h2>
          <p className="text-gray-700 leading-relaxed">
            Imagine a database with duplicate data scattered across rows and columns. If you update one piece of data, you’d need to hunt down every duplicate to keep things consistent—tedious and error-prone! Normalization solves this by:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li><strong>Reducing Redundancy:</strong> Storing data only once saves space and simplifies updates.</li>
            <li><strong>Preventing Anomalies:</strong> Ensures changes (inserts, updates, deletes) don’t corrupt data.</li>
            <li><strong>Improving Efficiency:</strong> Well-structured tables make queries faster and more logical.</li>
            <li><strong>Ensuring Scalability:</strong> A normalized database adapts better to growth and change.</li>
          </ul>
        </div>
  
        {/* Section: Normal Forms Explained */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">What Are Normal Forms?</h2>
          <p className="text-gray-700 leading-relaxed">
            Normal forms are a series of rules or “levels” that a database must meet to be considered normalized. Each level builds on the previous one, making the database progressively more organized. We’ll focus on the most practical ones: <strong>1NF</strong>, <strong>2NF</strong>, <strong>3NF</strong>, and <strong>BCNF</strong>, with detailed examples for each.
          </p>
        </div>
  
        {/* Section: First Normal Form (1NF) */}
        <div className="p-4 bg-gray-100 rounded-md shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">First Normal Form (1NF)</h2>
          <p className="text-gray-700">
            A table is in <strong>1NF</strong> if it meets these criteria:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>All values are <strong>atomic</strong> (no multi-valued fields like lists within a cell).</li>
            <li>Each column has a <strong>single data type</strong> (e.g., all numbers or all text).</li>
            <li>Each row is <strong>uniquely identifiable</strong> (usually with a primary key).</li>
          </ul>
          <p className="text-gray-700 mt-3">
            <strong>Example:</strong> Consider a table tracking students and their courses:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            StudentID | Name    | CoursesEnrolled       <br />
            1         | Alice   | Math, Science         <br />
            2         | Bob     | History, English      <br />
            3         | Charlie | Math, Physics, Art    <br />
          </pre>
          <p className="text-gray-700 mt-3">
            <strong>Problem:</strong> The `CoursesEnrolled` column contains multiple values, violating 1NF’s atomicity rule.
          </p>
          <p className="text-gray-700 mt-3">
            <strong>Solution:</strong> Split the multi-valued column into separate rows and add a primary key if needed:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            StudentID | Name    | CourseEnrolled <br />
            1         | Alice   | Math           <br />
            1         | Alice   | Science        <br />
            2         | Bob     | History        <br />
            2         | Bob     | English        <br />
            3         | Charlie | Math           <br />
            3         | Charlie | Physics        <br />
            3         | Charlie | Art            <br />
          </pre>
          <p className="text-gray-700 mt-3">
            Now, each cell is atomic, and `StudentID` combined with `CourseEnrolled` can uniquely identify each row.
          </p>
        </div>
  
        {/* Section: Second Normal Form (2NF) */}
        <div className="p-4 bg-gray-100 rounded-md shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Second Normal Form (2NF)</h2>
          <p className="text-gray-700">
            A table is in <strong>2NF</strong> if:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>It’s already in <strong>1NF</strong>.</li>
            <li>All non-key attributes are <strong>fully functionally dependent</strong> on the entire primary key (no partial dependencies).</li>
          </ul>
          <p className="text-gray-700 mt-3">
            <strong>Example:</strong> Here’s a table of student enrollments:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            StudentID | CourseID | StudentName | CourseName   <br />
            1         | C101     | Alice       | Math         <br />
            1         | C102     | Alice       | Science      <br />
            2         | C103     | Bob         | History      <br />
          </pre>
          <p className="text-gray-700 mt-3">
            <strong>Primary Key:</strong> `StudentID` + `CourseID` (composite key).  
            <strong>Problem:</strong> `StudentName` depends only on `StudentID`, and `CourseName` depends only on `CourseID`. These are partial dependencies, violating 2NF.
          </p>
          <p className="text-gray-700 mt-3">
            <strong>Solution:</strong> Split into two tables:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            {/* Students Table */}
            Students: <br />
            StudentID | StudentName <br />
            1         | Alice       <br />
            2         | Bob         <br />
            <br />
            {/* Courses Table */}
            Courses: <br />
            CourseID  | CourseName  <br />
            C101      | Math        <br />
            C102      | Science     <br />
            C103      | History     <br />
            <br />
            {/* Enrollments Table */}
            Enrollments: <br />
            StudentID | CourseID <br />
            1         | C101     <br />
            1         | C102     <br />
            2         | C103     <br />
          </pre>
          <p className="text-gray-700 mt-3">
            Now, each non-key attribute depends fully on the primary key in its respective table.
          </p>
        </div>
  
        {/* Section: Third Normal Form (3NF) */}
        <div className="p-4 bg-gray-100 rounded-md shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Third Normal Form (3NF)</h2>
          <p className="text-gray-700">
            A table is in <strong>3NF</strong> if:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>It’s already in <strong>2NF</strong>.</li>
            <li>There are <strong>no transitive dependencies</strong> (non-key attributes don’t depend on other non-key attributes).</li>
          </ul>
          <p className="text-gray-700 mt-3">
            <strong>Example:</strong> A table tracking student departments:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            StudentID | StudentName | DepartmentID | DepartmentName <br />
            1         | Alice       | D01          | Computer Science <br />
            2         | Bob         | D02          | History          <br />
            3         | Charlie     | D01          | Computer Science <br />
          </pre>
          <p className="text-gray-700 mt-3">
            <strong>Primary Key:</strong> `StudentID`.  
            <strong>Problem:</strong> `DepartmentName` depends on `DepartmentID` (a non-key attribute), creating a transitive dependency.
          </p>
          <p className="text-gray-700 mt-3">
            <strong>Solution:</strong> Split into two tables:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            {/* Students Table */}
            Students: <br />
            StudentID | StudentName | DepartmentID <br />
            1         | Alice       | D01          <br />
            2         | Bob         | D02          <br />
            3         | Charlie     | D01          <br />
            <br />
            {/* Departments Table */}
            Departments: <br />
            DepartmentID | DepartmentName   <br />
            D01          | Computer Science <br />
            D02          | History          <br />
          </pre>
          <p className="text-gray-700 mt-3">
            Now, there are no transitive dependencies—each non-key attribute depends only on the primary key.
          </p>
        </div>
  
        {/* Section: Boyce-Codd Normal Form (BCNF) */}
        <div className="p-4 bg-gray-100 rounded-md shadow mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Boyce-Codd Normal Form (BCNF)</h2>
          <p className="text-gray-700">
            A table is in <strong>BCNF</strong> if:
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li>It’s already in <strong>3NF</strong>.</li>
            <li>For every functional dependency `X → Y`, `X` must be a <strong>superkey</strong> (a key that uniquely identifies rows).</li>
          </ul>
          <p className="text-gray-700 mt-3">
            <strong>Example:</strong> A table where professors teach specific courses:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            ProfessorID | CourseID | RoomNumber <br />
            P1          | C101     | R101       <br />
            P2          | C102     | R102       <br />
            P1          | C103     | R103       <br />
          </pre>
          <p className="text-gray-700 mt-3">
            <strong>Assumption:</strong> Each professor teaches only one course, so `ProfessorID → CourseID`.  
            <strong>Primary Key:</strong> `ProfessorID` + `RoomNumber`.  
            <strong>Problem:</strong> `ProfessorID` determines `CourseID`, but `ProfessorID` alone isn’t a superkey, violating BCNF.
          </p>
          <p className="text-gray-700 mt-3">
            <strong>Solution:</strong> Split into two tables:
          </p>
          <pre className="bg-white p-3 rounded-md shadow text-gray-800">
            {/* ProfessorCourses Table */}
            ProfessorCourses: <br />
            ProfessorID | CourseID <br />
            P1          | C101     <br />
            P2          | C102     <br />
            P1          | C103     <br />
            <br />
            {/* CourseRooms Table */}
            CourseRooms: <br />
            CourseID | RoomNumber <br />
            C101     | R101       <br />
            C102     | R102       <br />
            C103     | R103       <br />
          </pre>
          <p className="text-gray-700 mt-3">
            Now, all functional dependencies involve superkeys, satisfying BCNF.
          </p>
        </div>
  
        {/* Section: Practical Tips */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">Practical Tips for Normalization</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
            <li><strong>Start with 1NF:</strong> Always ensure atomicity first—it’s the foundation.</li>
            <li><strong>Identify Keys:</strong> Define primary keys and candidate keys early to spot dependencies.</li>
            <li><strong>Balance Normalization:</strong> Over-normalizing (e.g., beyond 3NF) can complicate queries—stop where it makes sense for your use case.</li>
            <li><strong>Test with Data:</strong> Insert sample data to check for anomalies at each step.</li>
          </ul>
        </div>
  
        {/* Conclusion */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">Conclusion</h2>
          <p className="text-gray-700">
            Normalization transforms chaotic data into a logical, efficient structure. While <strong>1NF</strong>, <strong>2NF</strong>, and <strong>3NF</strong> cover most real-world needs, <strong>BCNF</strong> offers stricter integrity for complex cases. Beyond BCNF, forms like <strong>4NF</strong> (multi-valued dependencies) and <strong>5NF</strong> (join dependencies) exist, but they’re rarely needed unless you’re dealing with highly specialized databases. Master these steps, and you’ll design databases that are robust, scalable, and anomaly-free!
          </p>
        </div>
      </div>
    );
  }