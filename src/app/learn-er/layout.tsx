"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LearnERLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="flex space-x-4 p-4 bg-white shadow-md w-full justify-center">
        <Link href="/learn-er">
          <button
            className={`px-4 py-2 rounded-md ${
              pathname === "/learn-er" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Theory
          </button>
        </Link>
        <Link href="/learn-er/er-playground">
          <button
            className={`px-4 py-2 rounded-md ${
              pathname === "/learn-er/er-playground" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            ER Simulator
          </button>
        </Link>
      </div>

      {/* Content Below Buttons */}
      <div className="w-full p-4">{children}</div>
    </div>
  );
}
