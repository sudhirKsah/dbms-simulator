import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ConditionalGlobalComponent from "./components/ConditionalGlobalComponent";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DBMS Visualizer",
  description: "Learn and Visualize ER Diagrams, normalization with an AI Assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <Link
          href="/"
          className="fixed top-4 left-4 text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-300"
        >
          Olabs
        </Link>
        <ConditionalGlobalComponent />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
