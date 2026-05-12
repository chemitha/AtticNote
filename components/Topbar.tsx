"use client";

import { usePathname } from "next/navigation";
import { Search, Plus, Bell, Settings, User, Star, MessageSquare, Share2 } from "lucide-react";
import CreateNoteButton from "./CreateNoteButton";

export default function Topbar({ user }: { user: any }) {
  const pathname = usePathname();
  
  // Format pathname for breadcrumbs
  const pathParts = pathname.split('/').filter(p => p);
  
  return (
    <header className="h-14 border-b border-[#2A2E37] bg-[#0F1115]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
          {pathParts.map((part, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="capitalize hover:text-white cursor-pointer transition-colors">
                {part === "dashboard" ? "Home" : part}
              </span>
              {index < pathParts.length - 1 && <span>/</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button className="p-2 text-[#9CA3AF] hover:text-white transition-colors relative group">
            <Search className="w-4 h-4" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#181A20] text-[10px] px-2 py-1 rounded border border-[#2A2E37] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Search <span className="opacity-50 ml-1">⌘K</span>
            </span>
          </button>
          <button className="p-2 text-[#9CA3AF] hover:text-white transition-colors relative group">
            <Bell className="w-4 h-4" />
            <span className="absolute -bottom-1 bg-red-500 w-1.5 h-1.5 rounded-full right-2 border border-[#0F1115]"></span>
          </button>
          <button className="p-2 text-[#9CA3AF] hover:text-white transition-colors">
            <Star className="w-4 h-4" />
          </button>
        </div>
        
        <div className="h-4 w-px bg-[#2A2E37] mx-1"></div>
        
        <div className="flex items-center gap-2">
          <CreateNoteButton />
          <button className="px-3 py-1.5 bg-[#181A20] border border-[#2A2E37] rounded-lg text-xs font-medium hover:bg-[#2A2E37] transition-all flex items-center gap-2">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>

        <div className="h-4 w-px bg-[#2A2E37] mx-1"></div>

        <div className="flex items-center gap-2 p-1 pl-3 bg-[#181A20] border border-[#2A2E37] rounded-full hover:border-[#7C5CFF66] cursor-pointer transition-all">
          <span className="text-xs font-medium text-[#F5F7FA]">Personal</span>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-blue-400 flex items-center justify-center text-white text-[10px]">
             {user?.name?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
