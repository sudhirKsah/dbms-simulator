"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useERDiagramStore } from "../lib/store";
import { Node, Edge } from "reactflow"; 

type TaskType = "analyze" | "generate_state" | null;

interface ChatbotPageProps {
  nodes: Node[]; // Type from reactflow
  edges: Edge[]; 
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ nodes, edges }) => {
  const { entities, relationships, setFullState } = useERDiagramStore();
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskType>(null);
  const [error, setError] = useState<string>("");
  const [generatedState, setGeneratedState] = useState<any>(null); 

  const fetchGeminiResponse = async (task: TaskType) => {
    setLoading(true);
    setCurrentTask(task);
    setError("");
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setError("Missing Gemini API Key. Please check your environment variables.");
      setLoading(false);
      setCurrentTask(null);
      return;
    }

    // Create a detailed diagram representation for the AI
    const diagramDetails = {
      entities: entities.map(entity => ({
        id: entity.id,
        name: entity.name,
        primaryKeys: entity.primaryKeys,
        attributes: entity.attributes
      })),
      relationships: relationships.map(rel => ({
        id: rel.id,
        type: rel.type,
        participants: rel.participants
      })),
      nodePositions: nodes.map(node => ({
        id: node.id,
        position: node.position,
        type: node.type
      })),
      connections: edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        label: edge.label
      }))
    };

    let prompt = "";
    if (task === "analyze") {
      prompt = `
      You are an expert in database design and Entity-Relationship (ER) diagrams.
      
      Analyze the following ER diagram representation and provide insights:
      ${JSON.stringify(diagramDetails, null, 2)}
      
      Please include in your analysis:
      1. A brief summary of what the diagram represents
      2. Identified entities and their purposes
      3. Analysis of the relationships between entities
      4. Any normalization issues or design recommendations
      5. Suggestions for improvements or missing elements
      
      Format your response using Markdown for readability.
      `;
    } else if (task === "generate_state") {
      prompt = `
      Based on the following ER diagram, generate an improved JSON state representation that includes all current entities and relationships, plus any that should logically be added:
      ${JSON.stringify(diagramDetails, null, 2)}
      
      Add any relevant missing entities and relationships that would complete this data model.
      
      Return ONLY a valid JSON object in the following format (no explanations):
      {
        "state": {
          "entities": [
            {
              "id": "uuid-string",
              "name": "EntityName",
              "primaryKeys": ["key1", "key2"],
              "attributes": ["attr1", "attr2"],
              "position": {"x": 100, "y": 200}
            }
          ],
          "relationships": [
            {
              "id": "uuid-string",
              "type": "RelationType",
              "participants": [
                {"entityName": "Entity1", "cardinality": "1"},
                {"entityName": "Entity2", "cardinality": "N"}
              ],
              "position": {"x": 200, "y": 300}
            }
          ]
        }
      }
      `;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      if (task === "analyze") {
        setResponse(aiResponse);
      } else if (task === "generate_state") {
        try {
          // Parse the JSON response from the AI
          const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const jsonStr = jsonMatch[0];
            const parsedData = JSON.parse(jsonStr);
            setGeneratedState(parsedData);
          } else {
            throw new Error("No valid JSON found in response");
          }
        } catch (jsonError) {
          console.error("Error parsing generated state JSON:", jsonError);
          setError("The AI generated an invalid JSON response. Please try again.");
        }
      }
    } catch (apiError) {
      console.error("Error fetching from Gemini API:", apiError);
      setError(`API Error: ${(apiError as Error).message || "Unknown error occurred"}`);
    } finally {
      setLoading(false);
      setCurrentTask(null);
    }
  };

  const applyGeneratedState = () => {
    if (generatedState?.state) {
      setFullState(generatedState.state);
      setGeneratedState(null);
    }
  };

  const cancelGeneratedState = () => {
    setGeneratedState(null);
  };

  return (
    <div className="mt-6 p-4 border bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => fetchGeminiResponse("analyze")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading && currentTask === "analyze" ? "Analyzing..." : "Analyze Diagram"}
        </button>

        <button
          onClick={() => fetchGeminiResponse("generate_state")}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading && currentTask === "generate_state" ? "Generating..." : "Suggest Improvements"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      {generatedState && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">AI Suggested Improvements</h3>
          <p className="mb-3">
            The AI has suggested changes to your diagram. Would you like to apply these changes?
          </p>
          <div className="flex gap-3">
            <button
              onClick={applyGeneratedState}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Apply Changes
            </button>
            <button
              onClick={cancelGeneratedState}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {response && (
        <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
          <h3 className="font-bold text-lg mb-2">AI Analysis:</h3>
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;