"use client";
import React, { useCallback, useEffect, useRef } from "react";
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
import { toPng, toSvg } from "html-to-image";

const nodeTypes = {
    entityNode: CustomEntityNode,
    relationshipNode: CustomRelationshipNode,
};

const Canvas = () => {
    const {
        entities,
        relationships,
        updateEntityPosition,
        updateRelationshipPosition,
    } = useERDiagramStore();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const diagramRef = useRef(null);

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

            const connectionPoints =
                rel.participants.length === 3 ? ["top", "right", "bottom"] : ["left", "right"];

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
                if (change.type === "position" && change.position) {
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

    // Function to download as PNG
    const downloadImage = () => {
        if (!diagramRef.current) return;

        toPng(diagramRef.current)
            .then((dataUrl: string) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "er_diagram.png";
                link.click();
            })
            .catch((error: any) => {
                console.error("Failed to generate image:", error);
            });
    };

    // Function to download JSON
    const downloadJSON = () => {
        const data = { nodes, edges };
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "er_diagram.json";
        link.click();
    };

    return (
        <div className="flex flex-col w-full">
            <div ref={diagramRef} className="w-full h-[500px] border bg-gray-100 rounded-lg">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={handleNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    style={{ width: "100%", height: "100%" }}
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>

            <div className="flex gap-4 mt-4">
                <button onClick={downloadImage} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Download as PNG
                </button>
                <button onClick={downloadJSON} className="bg-green-500 text-white px-4 py-2 rounded">
                    Download as JSON
                </button>
                <button
                    onClick={() => {
                        setNodes([]);
                        setEdges([]);
                        //update entities and relationships in the store to empty array
                        useERDiagramStore.setState({ entities: [], relationships: [] });
                        localStorage.removeItem("er-diagram-storage");

                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Clear Canvas
                </button>

            </div>

            <div className="w-full mt-4">
                <ChatbotPage nodes={nodes} edges={edges} />
            </div>
        </div>
    );
};

export default Canvas;
