"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, MessageCircle, Send } from "lucide-react";
import { useERDiagramStore } from "../lib/store";

const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { entities, relationships } = useERDiagramStore();
  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleDragStart = (e) => {
    setDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrag = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        handleDrag(e);
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        handleDragEnd();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const isDBMSRelatedQuestion = (query) => {
    // Keywords related to DBMS
    const dbmsKeywords = [
      "database", "dbms", "sql", "query", "table", "schema", "entity", "relationship",
      "er diagram", "primary key", "foreign key", "normalization", "index", "transaction",
      "acid", "constraint", "join", "view", "procedure", "trigger", "relational",
      "nosql", "mongodb", "mysql", "postgresql", "oracle", "sqlite", "cardinality",
      "attributes", "tuple", "data model", "dml", "ddl", "dcl", "tcl", "entity relationship",
      "data integrity", "data consistency", "data redundancy", "normal form", "boyce codd",
      "concurrency", "deadlock", "referential integrity", "aggregate", "union", "intersect",
      "group by", "having", "order by", "select", "insert", "update", "delete", "from"
    ];
    
    const queryLower = query.toLowerCase();
    return dbmsKeywords.some(keyword => queryLower.includes(keyword.toLowerCase()));
  };

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    
    const userMessage = message.trim();
    setChat(prevChat => [...prevChat, { role: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);
    
    // Check if question is DBMS related
    if (!isDBMSRelatedQuestion(userMessage)) {
      setTimeout(() => {
        setChat(prevChat => [
          ...prevChat, 
          { 
            role: "assistant", 
            content: "Sorry, I'm specifically designed to answer questions about database management systems and ER diagrams. Please ask me about DBMS concepts, ER modeling, or your current diagram." 
          }
        ]);
        setLoading(false);
      }, 500);
      return;
    }
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setChat(prevChat => [
        ...prevChat, 
        { 
          role: "assistant", 
          content: "Error: Missing API key. Please check your environment variables." 
        }
      ]);
      setLoading(false);
      return;
    }

    try {
      // Create context from the current ER diagram
      const contextInfo = {
        entities: entities.length,
        entityNames: entities.map(e => e.name),
        relationships: relationships.length,
        relationshipTypes: relationships.map(r => r.type)
      };

      const prompt = `
      You are a database expert assistant. Answer the following question about DBMS concepts, specifically in the context of ER diagrams and database design. 
      
      User's current ER diagram context: ${JSON.stringify(contextInfo)}
      
      User question: ${userMessage}

      Provide a short, concise, and informative answer. If you don't know the answer, say so clearly.
      `;

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      setChat(prevChat => [...prevChat, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      setChat(prevChat => [
        ...prevChat, 
        { 
          role: "assistant", 
          content: "Sorry, I encountered an error while processing your question. Please try again." 
        }
      ]);
      console.error("AI Assistant Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Circular Button */}
      <div
        className="fixed z-50 flex items-center justify-center cursor-move"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
        onMouseDown={handleDragStart}
      >
        <button
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
            isOpen ? "bg-red-500" : "bg-blue-600"
          } text-white hover:${isOpen ? "bg-red-600" : "bg-blue-700"} transition-colors`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed z-40 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
          style={{
            right: "20px",
            bottom: "20px",
            height: "400px"
          }}
        >
          <div className="bg-blue-600 text-white p-3 font-medium flex justify-between items-center">
            <span>DBMS Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 p-3 overflow-y-auto"
          >
            {chat.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <p className="mb-2">👋 Hello! I'm your DBMS Assistant.</p>
                <p>Ask me any question about databases, ER diagrams, or SQL!</p>
              </div>
            ) : (
              chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-3 ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="text-left mb-3">
                <div className="inline-block max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-2 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about DBMS concepts..."
              className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIAssistant;