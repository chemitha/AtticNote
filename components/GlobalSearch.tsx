"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllNotes } from "@/app/actions/notes";
import { Note } from "@prisma/client";
import { useSearch } from "@/hooks/use-search";
import { useLoading } from "@/hooks/use-loading";

export default function GlobalSearch() {
  const { isOpen, closeSearch, toggleSearch } = useSearch();
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { startLoading } = useLoading();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleSearch]);

  useEffect(() => {
    if (isOpen && notes.length === 0) {
      getAllNotes().then(setNotes);
    }
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen, notes.length]);

  const filteredNotes = notes.filter((note) =>
    (note.title || "Untitled").toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (id: string) => {
    closeSearch();
    startLoading();
    startTransition(() => {
      router.push(`/dashboard/notes/${id}`);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeSearch()}>
      <DialogContent className="p-0 overflow-hidden bg-[#181A20] border-[#2A2E37] max-w-2xl" showCloseButton={false}>
        <DialogTitle className="sr-only">Search Workspace</DialogTitle>
        <div className="flex items-center px-4 py-4 border-b border-[#2A2E37]">
          <Search className="w-5 h-5 text-[#9CA3AF] mr-3 shrink-0" />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[#4B5563] text-lg"
            placeholder="Search notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="text-xs text-[#4B5563] bg-[#0F1115] px-2 py-1 rounded border border-[#2A2E37]">ESC</div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredNotes.length === 0 ? (
            <p className="p-4 text-sm text-[#9CA3AF] text-center">No results found.</p>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleSelect(note.id)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2A2E37] cursor-pointer text-[#F5F7FA] group transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#0F1115] border border-[#2A2E37] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#7C5CFF]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{note.title || "Untitled"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
