"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LearnERLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="flex space-x-4 p-4 bg-white shadow-md w-full justify-center">
        <Link href="/learn-normalization">
          <button
            className={`px-4 py-2 rounded-md ${
              pathname === "/learn-normalization" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Theory
          </button>
        </Link>
        <Link href="/learn-normalization/normalization-simulation">
          <button
            className={`px-4 py-2 rounded-md ${
              pathname === "/learn-normalization/normalization-simulation" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Normalization Simulator
          </button>
        </Link>
      </div>

      {/* Content Below Buttons */}
      <div className="w-full p-4">{children}</div>
    </div>
  );
}
