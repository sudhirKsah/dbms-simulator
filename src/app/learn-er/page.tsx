export default function LearnERPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Entity-Relationship (ER) Diagrams
      </h1>
      
      {/* Introduction */}
      <p className="text-lg text-gray-700 text-center mb-8">
        An Entity-Relationship (ER) Diagram is a conceptual data model that visually represents entities, 
        their attributes, and the relationships between them. It is widely used in database design.
      </p>
      
      {/* Section: What is an ER Diagram? */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">What is an ER Diagram?</h2>
        <p className="text-gray-700 leading-relaxed">
          An ER diagram helps in understanding the structure of a database by showing how different entities 
          relate to each other. It includes three main components:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
          <li><strong>Entities:</strong> Objects or concepts that store data (e.g., Student, Course).</li>
          <li><strong>Attributes:</strong> Characteristics of an entity (e.g., Name, Age, ID).</li>
          <li><strong>Relationships:</strong> Connections between entities (e.g., A student enrolls in a course).</li>
        </ul>
      </div>
      
      {/* Section: Key Components of ER Diagrams */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">Key Components of ER Diagrams</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-md shadow">
            <h3 className="text-xl font-medium text-gray-800">1. Entities</h3>
            <p className="text-gray-700">Entities represent objects that have distinct identities, such as <strong>Students, Employees, or Books</strong>.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md shadow">
            <h3 className="text-xl font-medium text-gray-800">2. Attributes</h3>
            <p className="text-gray-700">Attributes define the properties of an entity, such as a Student's <strong>Name, Roll Number, and Email</strong>.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-md shadow">
            <h3 className="text-xl font-medium text-gray-800">3. Relationships</h3>
            <p className="text-gray-700">Relationships show how entities interact, e.g., <strong>A Student enrolls in a Course</strong>.</p>
          </div>
        </div>
      </div>
      
      {/* Section: ER Diagram Symbols */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">ER Diagram Symbols</h2>
        <p className="text-gray-700 leading-relaxed">
          ER diagrams use different symbols to represent entities, relationships, and attributes:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
          <li><strong>Rectangles:</strong> Represent entities.</li>
          <li><strong>Ellipses:</strong> Represent attributes.</li>
          <li><strong>Diamonds:</strong> Represent relationships.</li>
          <li><strong>Lines:</strong> Connect attributes and entities.</li>
        </ul>
      </div>
      
      {/* Section: Cardinality */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">Cardinality in ER Diagrams</h2>
        <p className="text-gray-700">
          Cardinality defines the number of instances of one entity that can be associated with another entity:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
          <li><strong>One-to-One (1:1):</strong> A person has one passport.</li>
          <li><strong>One-to-Many (1:M):</strong> A teacher teaches multiple students.</li>
          <li><strong>Many-to-Many (M:M):</strong> Students enroll in multiple courses.</li>
        </ul>
      </div>
      
      {/* Conclusion */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">Conclusion</h2>
        <p className="text-gray-700">
          ER diagrams provide a structured approach to database design, ensuring clarity in entity relationships. 
          Understanding ER concepts is essential for designing efficient and scalable databases.
        </p>
      </div>
    </div>
  );
}
