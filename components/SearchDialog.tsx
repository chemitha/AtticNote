"use client";

import { useEffect, useState } from "react";
import { Search, FileText, Clock, Command, X, Globe, User, Settings, Star } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 bg-[#181A20] border-[#2A2E37] overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#2A2E37]">
          <Search className="w-5 h-5 text-[#9CA3AF]" />
          <input
            autoFocus
            placeholder="Search notes, items, or commands..."
            className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-[#4B5563] text-white focus:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 bg-[#111318] border border-[#2A2E37] px-2 py-1 rounded text-[10px] font-mono text-[#4B5563]">
            ESC
          </div>
          <button onClick={() => setOpen(false)} className="p-1 hover:bg-[#2A2E37] rounded-md transition-colors">
            <X className="w-4 h-4 text-[#9CA3AF]" />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#2A2E37]">
          {query.length === 0 ? (
            <div className="space-y-4 p-2">
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#4B5563] mb-2 px-2">Quick Commands</h4>
                <div className="space-y-1">
                  <CommandItem icon={<Command className="w-4 h-4" />} title="Import Content" shortcut="/im" />
                  <CommandItem icon={<Globe className="w-4 h-4" />} title="GitHub Management" shortcut="/gi" />
                  <CommandItem icon={<Settings className="w-4 h-4" />} title="Workspace Settings" shortcut="/ta" />
                </div>
              </div>
              
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#4B5563] mb-2 px-2">Recently Viewed</h4>
                <div className="space-y-1">
                  <NoteItem title="Project Roadmap 2026" time="2 hours ago" />
                  <NoteItem title="Engineering Standup" time="5 hours ago" />
                  <NoteItem title="App Architecture Design" time="Yesterday" />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              <p className="text-xs text-[#4B5563] px-2 mb-2">Results for &quot;{query}&quot;</p>
              <NoteItem title={`Search result for "${query}"`} time="Just now" />
              {/* This would actually be filtered results from an API */}
            </div>
          )}
        </div>

        <div className="bg-[#111318] border-t border-[#2A2E37] px-4 py-3 flex items-center justify-between text-[10px] text-[#4B5563] font-medium uppercase tracking-wider">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><kbd className="bg-[#181A20] border border-[#2A2E37] px-1 rounded text-[#9CA3AF]">↵</kbd> to select</span>
              <span className="flex items-center gap-1"><kbd className="bg-[#181A20] border border-[#2A2E37] px-1 rounded text-[#9CA3AF]">↑↓</kbd> to navigate</span>
           </div>
           <span>{query.length} items found</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CommandItem({ icon, title, shortcut }: { icon: React.ReactNode, title: string, shortcut: string }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-[#7C5CFF15] hover:text-white rounded-lg cursor-pointer group transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-[#111318] rounded-md group-hover:bg-[#7C5CFF33] transition-colors">{icon}</div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className="text-[10px] bg-[#111318] border border-[#2A2E37] px-1.5 py-0.5 rounded text-[#4B5563] group-hover:text-[#7C5CFF] group-hover:border-[#7C5CFF33] transition-colors">
        {shortcut}
      </span>
    </div>
  );
}

function NoteItem({ title, time }: { title: string, time: string }) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-[#7C5CFF15] hover:text-white rounded-lg cursor-pointer group transition-colors">
      <div className="p-1.5 bg-[#111318] rounded-md group-hover:bg-[#7C5CFF22] transition-colors">
        <FileText className="w-4 h-4 text-[#7C5CFF]" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-[10px] text-[#4B5563]">{time}</p>
      </div>
      <Star className="w-3.5 h-3.5 text-[#2A2E37] group-hover:text-yellow-500 transition-colors" />
    </div>
  );
}
