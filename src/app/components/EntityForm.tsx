"use client";
import { useState } from "react";
import { useERDiagramStore } from "../lib/store";

const EntityForm = () => {
  const addEntity = useERDiagramStore((state) => state.addEntity);
  const [entityName, setEntityName] = useState("");
  const [primaryKeys, setPrimaryKeys] = useState("");
  const [attributes, setAttributes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName) return;

    addEntity({
      id: crypto.randomUUID(),
      name: entityName,
      primaryKeys: primaryKeys ? primaryKeys.split(",") : [],
      attributes: attributes ? attributes.split(",") : [],
    });

    setEntityName("");
    setPrimaryKeys("");
    setAttributes("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">Add Entity</h2>
      <input
        type="text"
        placeholder="Entity Name"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Primary Keys (comma separated)"
        value={primaryKeys}
        onChange={(e) => setPrimaryKeys(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Other Attributes (comma separated)"
        value={attributes}
        onChange={(e) => setAttributes(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default EntityForm;
