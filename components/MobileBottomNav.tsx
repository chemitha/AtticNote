"use client";

import React, { useState } from "react";
import { Layout, Search, Star, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import LoadingLink from "./LoadingLink";
import { useSearch } from "@/hooks/use-search";
import { useLoading } from "@/hooks/use-loading";
import { createNoteAction } from "@/app/actions/notes";

export default function MobileBottomNav({ userInitial }: { userInitial: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { openSearch } = useSearch();
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (creating) return;
    const { startLoading } = useLoading.getState();
    try {
      startLoading();
      setCreating(true);
      const res = await createNoteAction();
      if (res.success && res.note) {
        router.push(`/dashboard/notes/${res.note.id}`);
      }
    } catch (e) {
      console.error(e);
      useLoading.getState().stopLoading();
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="md:hidden flex fixed bottom-0 left-0 right-0 h-16 border-t border-[#2A2E37] bg-[#0F1115]/95 backdrop-blur-md items-center justify-around px-2 z-40">
      <LoadingLink href="/dashboard" className={`flex flex-col items-center gap-1 w-14 ${pathname === "/dashboard" ? "text-[#F4F7FA]" : "text-[#9CA3AF]"}`}>
        <Layout className="w-5 h-5" />
        <span className="text-[10px] font-medium">Home</span>
      </LoadingLink>
      
      <button onClick={openSearch} className="flex flex-col items-center gap-1 w-14 text-[#9CA3AF] active:text-[#F4F7FA]">
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-medium">Search</span>
      </button>

      <button
        onClick={handleCreate}
        disabled={creating}
        className="w-12 h-12 rounded-full bg-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/30 flex items-center justify-center -translate-y-4 active:scale-95 transition-transform disabled:opacity-50"
        aria-label="New Note"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      <LoadingLink href="/dashboard/favorites" className={`flex flex-col items-center gap-1 w-14 ${pathname === "/dashboard/favorites" ? "text-[#F4F7FA]" : "text-[#9CA3AF]"}`}>
        <Star className="w-5 h-5" />
        <span className="text-[10px] font-medium">Favorites</span>
      </LoadingLink>

      <div className="flex flex-col items-center gap-1 w-14 text-[#9CA3AF]">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-blue-400 flex items-center justify-center text-[9px] text-white font-medium">
          {userInitial}
        </div>
        <span className="text-[10px] font-medium">Me</span>
      </div>
    </div>
  );
}
