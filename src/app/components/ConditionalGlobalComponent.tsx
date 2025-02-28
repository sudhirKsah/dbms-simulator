"use client";
import { usePathname } from "next/navigation";
import FloatingAIAssistant from "./FloatingAIAssistant";

export default function ConditionalGlobalComponent() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return <FloatingAIAssistant />;
}
