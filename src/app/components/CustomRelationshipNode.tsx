
import React from "react";
import { Handle, Position } from "reactflow";
import { useERDiagramStore } from "../lib/store";

const CustomRelationshipNode = ({ id, data }: any) => {
  const { deleteRelationship } = useERDiagramStore();

  const isTernary = data.participantCount === 3;
  const shapeClass = isTernary 
    // ? "w-24 h-24 bg-yellow-100 rounded-full"  // Circle for ternary
    ? "w-10 h-10 bg-gray-300 rotate-45"
    : "w-10 h-10 bg-gray-300 rotate-45";      // Diamond for binary
  
  // Determine connection point positions based on participant count
  const connectionPoints = isTernary
    ? [
        { id: "top", position: Position.Top },
        { id: "right", position: Position.Right },
        { id: "bottom", position: Position.Bottom }
      ]
    : [
        { id: "left", position: Position.Left },
        { id: "right", position: Position.Right }
      ];

  return (
    <div className="relative">
      <div className={`${shapeClass} flex items-center justify-center border border-gray-600 shadow-md`}>
        <span className={`text-xs font-bold text-gray-800 ${!isTernary ? "-rotate-45" : ""}`}>
          {data.label}
        </span>
      </div>

      <button
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded"
        onClick={() => deleteRelationship(id)}
      >
        ✕
      </button>

      {connectionPoints.map((point) => (
        <Handle 
          key={point.id}
          id={point.id}
          type="source" 
          position={point.position} 
          className="w-2 h-2 bg-blue-500" 
        />
      ))}
    </div>
  );
};

export default CustomRelationshipNode;