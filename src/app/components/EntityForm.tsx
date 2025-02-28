"use client";
import { useState, useEffect } from "react";
import { useERDiagramStore } from "../lib/store";

const EntityForm = ({ aiGeneratedState }: { aiGeneratedState: string | null }) => {
  const addEntity = useERDiagramStore((state) => state.addEntity);
  const setFullState = useERDiagramStore((state) => state.setFullState);

  const [entityName, setEntityName] = useState("");
  const [primaryKeys, setPrimaryKeys] = useState("");
  const [attributes, setAttributes] = useState("");

  useEffect(() => {
    if (aiGeneratedState) {
      try {
        console.log("🛠 Raw AI-generated state:", aiGeneratedState);

        const match = aiGeneratedState.match(/\{[\s\S]*\}/);
        if (!match) {
          console.error("❌ No valid JSON detected in AI response");
          return;
        }

        const cleanJson = match[0]; // Extract only the JSON part
        console.log("✅ Extracted Clean JSON:", cleanJson);

        const parsedState = JSON.parse(cleanJson);

        if (parsedState?.state) {
          setFullState(parsedState.state);
          console.log("✅ Zustand store updated from AI:", parsedState.state);
        }
      } catch (error) {
        console.error("❌ Error parsing AI-generated state:", error, "Raw state:", aiGeneratedState);
      }
    }
  }, [aiGeneratedState, setFullState]);

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
