import React from "react";
import { Handle, Position } from "reactflow";
import { useERDiagramStore } from "../lib/store";

const CustomEntityNode = ({ id, data }: any) => {
  const { deleteEntity } = useERDiagramStore();

  return (
    <div className="p-2 border bg-white rounded shadow-md w-48 text-center relative">
      <strong className="text-blue-600">{data.name}</strong>
      <ul className="text-sm text-gray-600">
        {data.primaryKeys.length > 0 ? (
          data.primaryKeys.map((pk: string) => <li key={pk}>🔑 {pk}</li>)
        ) : (
          <li className="text-red-500">Weak Entity</li>
        )}
        {data.attributes.map((attr: string) => (
          <li key={attr}>{attr}</li>
        ))}
      </ul>

      <button
        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
        onClick={() => deleteEntity(id)}
      >
        ✕
      </button>

      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-green-500" />
    </div>
  );
};

export default CustomEntityNode;
