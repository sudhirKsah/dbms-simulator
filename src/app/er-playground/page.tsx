"use client";
import Toolbar from "../components/Toolbar";
import Canvas from "../components/Canvas";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Canvas />
      <Toolbar />
    </div>
  );
}