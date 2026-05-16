"use client";

import { Search } from "lucide-react";
import { useSearch } from "@/hooks/use-search";

export default function DashboardSearchBar() {
  const { openSearch } = useSearch();

  return (
    <div
      onClick={openSearch}
      className="bg-[#181A20] rounded-xl border border-[#2A2E37] flex items-center gap-3 px-4 py-3 shadow-2xl cursor-pointer hover:border-[#7C5CFF]/30 transition-colors"
    >
      <Search className="w-5 h-5 text-[#9CA3AF]" />
      <span className="text-sm text-[#4B5563] flex-1">Search notes, tags, and blocks...</span>
      <div className="hidden sm:flex items-center gap-1 bg-[#0F1115] border border-[#2A2E37] px-2 py-0.5 rounded text-[10px] font-mono text-[#9CA3AF]">
        <span className="text-[12px]">⌘</span> K
      </div>
    </div>
  );
}
