"use client";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  NodeChange,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useERDiagramStore } from "../lib/store";
import CustomEntityNode from "./CustomEntityNode";
import CustomRelationshipNode from "./CustomRelationshipNode";

const nodeTypes = {
  entityNode: CustomEntityNode,
  relationshipNode: CustomRelationshipNode,
};

const Canvas = () => {
  const { 
    entities, 
    relationships, 
    updateEntityPosition, 
    updateRelationshipPosition 
  } = useERDiagramStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Initial setup of nodes with stored positions
  useEffect(() => {
    const entityNodes = entities.map((entity) => ({
      id: entity.id,
      type: "entityNode",
      data: {
        name: entity.name,
        primaryKeys: entity.primaryKeys,
        attributes: entity.attributes,
      },
      // Use stored position or generate a random one for new entities
      position: entity.position || { 
        x: Math.random() * 400, 
        y: Math.random() * 300 
      },
    }));

    const relationshipNodes = relationships.map((rel) => ({
      id: rel.id,
      type: "relationshipNode",
      data: { 
        label: rel.type,
        participantCount: rel.participants?.length || 0,
      },
      // Use stored position or generate a random one for new relationships
      position: rel.position || { 
        x: Math.random() * 400, 
        y: Math.random() * 300 
      },
    }));

    setNodes([...entityNodes, ...relationshipNodes]);
  }, [entities, relationships]);

  // Setup edges based on relationships
  useEffect(() => {
    let newEdges: Edge[] = [];

    relationships.forEach((rel) => {
        if (!rel.participants) return; // Skip if participants is undefined
      
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
              label: participant.cardinality || "",  // Ensure cardinality exists
              type: "smoothstep",
            });
          }
        });
      });
      

    setEdges(newEdges);
  }, [relationships, entities]);

  // Handle connection between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Save positions when nodes are moved
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);

      // Look for position changes
      changes.forEach((change) => {
        if (change.type === 'position' && change.position) {
          const nodeId = change.id;
          
          // Check if it's an entity
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
  );
};

export default Canvas;