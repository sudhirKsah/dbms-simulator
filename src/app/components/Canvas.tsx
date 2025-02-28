"use client";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  NodeChange,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useERDiagramStore } from "../lib/store";
import CustomEntityNode from "./CustomEntityNode";
import CustomRelationshipNode from "./CustomRelationshipNode";
import ChatbotPage from "../chatbot/page";

const nodeTypes = {
  entityNode: CustomEntityNode,
  relationshipNode: CustomRelationshipNode,
};

const Canvas = ()   => {
  const { 
    entities, 
    relationships, 
    updateEntityPosition, 
    updateRelationshipPosition 
  } = useERDiagramStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const entityNodes = entities.map((entity) => ({
      id: entity.id,
      type: "entityNode",
      data: {
        name: entity.name,
        primaryKeys: entity.primaryKeys,
        attributes: entity.attributes,
      },
      position: entity.position || { x: Math.random() * 400, y: Math.random() * 300 },
    }));

    const relationshipNodes = relationships.map((rel) => ({
      id: rel.id,
      type: "relationshipNode",
      data: { 
        label: rel.type,
        participantCount: rel.participants?.length || 0,
      },
      position: rel.position || { x: Math.random() * 400, y: Math.random() * 300 },
    }));

    setNodes([...entityNodes, ...relationshipNodes]);
  }, [entities, relationships]);

  useEffect(() => {
    let newEdges: Edge[] = [];

    relationships.forEach((rel) => {
      if (!rel.participants) return;
      
      const connectionPoints = rel.participants.length === 3
        ? ["top", "right", "bottom"]
        : ["left", "right"];
    
      rel.participants.forEach((participant, index) => {
        const sourceEntity = entities.find((e) => e.name === participant.entityName);
        
        if (sourceEntity) {
          const handleId = connectionPoints[index] || "left";
    
          newEdges.push({
            id: `${rel.id}-${sourceEntity.id}`,
            source: rel.id,
            sourceHandle: handleId,
            target: sourceEntity.id,
            label: participant.cardinality || "",
            type: "smoothstep",
          });
        }
      });
    });

    setEdges(newEdges);
  }, [relationships, entities]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);

      changes.forEach((change) => {
        if (change.type === 'position' && change.position) {
          const nodeId = change.id;
          
          const entity = entities.find((e) => e.id === nodeId);
          if (entity) {
            updateEntityPosition(nodeId, change.position);
            return;
          }
          
          const relationship = relationships.find((r) => r.id === nodeId);
          if (relationship) {
            updateRelationshipPosition(nodeId, change.position);
            return;
          }
        }
      });
    },
    [entities, relationships, onNodesChange, updateEntityPosition, updateRelationshipPosition]
  );

  return (
    <div >
      <div className="w-full h-[500px] border bg-gray-100 rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div className="">
<ChatbotPage nodes={nodes} edges={edges} />
</div>
    </div>
      
  );
};

export default Canvas;
