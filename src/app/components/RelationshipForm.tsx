"use client";
import { useState } from "react";
import { useERDiagramStore } from "../lib/store";

const RelationshipForm = () => {
  const { entities, addRelationship, relationships } = useERDiagramStore();
  const [relationshipType, setRelationshipType] = useState("");
  const [participants, setParticipants] = useState([
    { entityName: "", cardinality: "" },
    { entityName: "", cardinality: "" }
  ]);
  const [message, setMessage] = useState({ text: "", type: "" });

  const addParticipant = () => {
    if (participants.length < 3) {
      setParticipants([...participants, { entityName: "", cardinality: "" }]);
    }
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 2) {
      const newParticipants = [...participants];
      newParticipants.splice(index, 1);
      setParticipants(newParticipants);
    }
  };

  const updateParticipant = (index: number, field: string, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = { 
      ...newParticipants[index], 
      [field]: value 
    };
    setParticipants(newParticipants);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!relationshipType) {
      setMessage({ text: "Relationship type is required", type: "error" });
      return;
    }
    
    const missingData = participants.some(p => !p.entityName || !p.cardinality);
    if (missingData) {
      setMessage({ text: "All entity and cardinality fields are required", type: "error" });
      return;
    }
    
    const entityNames = participants.map(p => p.entityName);
    if (new Set(entityNames).size !== entityNames.length) {
      setMessage({ text: "Each entity can appear only once in a relationship", type: "error" });
      return;
    }

    const newRelationship = {
      id: crypto.randomUUID(),
      type: relationshipType,
      participants: [...participants]
    };

    addRelationship(newRelationship);
    
    const isUpdate = relationships.some(rel => {
      const relEntityNames = rel.participants.map(p => p.entityName).sort();
      const newEntityNames = participants.map(p => p.entityName).sort();
      return JSON.stringify(relEntityNames) === JSON.stringify(newEntityNames);
    });

    setMessage({ 
      text: isUpdate 
        ? "Relationship updated successfully" 
        : "Relationship created successfully", 
      type: "success" 
    });

    setRelationshipType("");
    setParticipants([
      { entityName: "", cardinality: "" },
      { entityName: "", cardinality: "" }
    ]);
  };

  const relationshipTypeLabel = 
    participants.length === 2 ? "Binary" : 
    participants.length === 3 ? "Ternary" : "Relationship";

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">Add/Update Relationship</h2>

      {message.text && (
        <div 
          className={`p-2 mb-3 rounded text-sm ${
            message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {relationshipTypeLabel} Relationship Type
        </label>
        <input
          type="text"
          placeholder="Relationship Type (e.g., owns, works_in)"
          value={relationshipType}
          onChange={(e) => setRelationshipType(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="block text-sm font-medium">Participating Entities</label>
          <div className="flex gap-2">
            {participants.length < 3 && (
              <button 
                type="button"
                onClick={addParticipant}
                className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
              >
                Add Entity
              </button>
            )}
          </div>
        </div>

        {participants.map((participant, index) => (
          <div key={index} className="mb-3 p-3 border rounded bg-gray-50">
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-semibold">Entity {index + 1}</h3>
              {participants.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeParticipant(index)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
            
            <select
              value={participant.entityName}
              onChange={(e) => updateParticipant(index, "entityName", e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Entity</option>
              {entities.map((entity) => (
                <option 
                  key={entity.id} 
                  value={entity.name}
                  disabled={participants.some((p, i) => i !== index && p.entityName === entity.name)}
                >
                  {entity.name}
                </option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Cardinality (1, M, N)"
              value={participant.cardinality}
              onChange={(e) => updateParticipant(index, "cardinality", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default RelationshipForm;
