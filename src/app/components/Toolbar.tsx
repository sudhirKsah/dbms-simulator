
"use client";
import { useState } from "react";
import EntityForm from "./EntityForm";
import RelationshipForm from "./RelationshipForm";

const Toolbar = () => {
  const [showEntityForm, setShowEntityForm] = useState(false);
  const [showRelationshipForm, setShowRelationshipForm] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-200 border-b">
      <button
        onClick={() => {
          setShowEntityForm(!showEntityForm);
          if (showRelationshipForm) setShowRelationshipForm(false);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showEntityForm ? "Close Entity Form" : "Add Entity"}
      </button>

      <button
        onClick={() => {
          setShowRelationshipForm(!showRelationshipForm);
          if (showEntityForm) setShowEntityForm(false);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {showRelationshipForm ? "Close Relationship Form" : "Add Relationship"}
      </button>

      <button className="bg-purple-500 text-white px-4 py-2 rounded">
        Generate Tables
      </button>

      <button className="bg-orange-500 text-white px-4 py-2 rounded">
        Generate SQL
      </button>

      <button className="bg-gray-800 text-white px-4 py-2 rounded">
        Save Diagram
      </button>

      {showEntityForm && (
        <div className="absolute top-16 left-4 z-10 bg-white p-4 border rounded shadow-lg">
          <EntityForm aiGeneratedState={""} />
        </div>
      )}

      {showRelationshipForm && (
        <div className="absolute top-16 left-4 z-10 bg-white p-4 border rounded shadow-lg max-w-md w-full">
          <RelationshipForm />
        </div>
      )}
    </div>
  );
};

export default Toolbar;
