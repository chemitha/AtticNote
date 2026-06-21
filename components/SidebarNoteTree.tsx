"use client";

import { useState, useEffect } from "react";
import { ChevronRight, FileText, ChevronDown, LoaderCircle, MoreVertical } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "@/hooks/use-loading";
import { NoteContextMenu, NoteDropdownMenu } from "@/components/NoteContextMenu";

interface NoteNode {
  id: string;
  title: string;
  is_favorite: boolean;
  updated_at?: string;
  _count?: { subpages: number };
  [key: string]: any;
}

export function SidebarNoteTree({ 
  notes 
}: { 
  notes: NoteNode[]
}) {
  return (
    <div className="space-y-[2px]">
      {notes.map(note => (
        <SidebarNoteItem key={note.id} note={note} depth={0} />
      ))}
    </div>
  );
}

function SidebarNoteItem({ note, depth }: { note: NoteNode, depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subpages, setSubpages] = useState<NoteNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // Tracks self-unmounting
  
  const pathname = usePathname();
  const router = useRouter();
  const { startLoading } = useLoading();
  const isActive = pathname === `/dashboard/notes/${note.id}`;
  const hasChildren = note._count ? note._count.subpages > 0 : false;

  const MAX_DEPTH = 5;

  useEffect(() => {
    const expandedStr = localStorage.getItem(`atticnote_expanded_${note.id}`);
    if (expandedStr === "true") {
      setIsExpanded(true);
      fetchSubpages();
    }
  }, [note.id]);

  useEffect(() => {
    const handleNoteDeleted = (e: Event) => {
      const deletedId = (e as CustomEvent).detail;
      
      // If this exact instance was deleted, self-destruct from DOM
      if (note.id === deletedId) {
        setIsDeleted(true);
        return;
      }

      // If a nested child of this component was deleted, filter it out
      setSubpages((prev) => prev.filter(subpage => subpage.id !== deletedId));
    };

    window.addEventListener("note-deleted", handleNoteDeleted);
    return () => window.removeEventListener("note-deleted", handleNoteDeleted);
  }, [note.id]);

  // Handle live renaming sync safely
  useEffect(() => {
    const handleNoteRenamed = (e: Event) => {
      const { id, title } = (e as CustomEvent).detail;
      if (note.id === id) {
        note.title = title;
      }
      setSubpages((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, title } : sub))
      );
    };

    window.addEventListener("note-renamed", handleNoteRenamed);
    return () => window.removeEventListener("note-renamed", handleNoteRenamed);
  }, [note.id]);

  if (isDeleted) return null; // Instantly hides deleted item and children

  const fetchSubpages = async () => {
    if (subpages.length > 0) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/notes/${note.id}/subpages`);
      const data = await res.json();
      setSubpages(data);
    } catch (e) {
      console.error("Failed to load subpages", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    localStorage.setItem(`atticnote_expanded_${note.id}`, nextState.toString());
    
    if (nextState && subpages.length === 0) {
      fetchSubpages();
    }
  };

  const navigateToNote = () => {
    if (!isActive) {
      startLoading();
      router.push(`/dashboard/notes/${note.id}`);
    }
  };

  return (
    <div className="flex flex-col relative">
      <NoteContextMenu note={note}>
        <div 
          onClick={navigateToNote}
          className={`group flex items-center h-8 rounded-md cursor-pointer transition-colors px-1 text-sm ${
            isActive 
              ? "bg-[#181A20] text-[#F5F7FA] font-medium" 
              : "text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#F5F7FA]"
          }`}
          style={{ paddingLeft: `${depth * 12 + 4}px` }}
        >
          <div 
            onClick={hasChildren ? toggleExpand : undefined}
            className={`w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 shrink-0 ${hasChildren ? "cursor-pointer" : ""}`}
          >
            {hasChildren && !isDeleted ? (
              isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              )
            ) : (
              <span className="w-3.5 h-3.5" /> 
            )}
          </div>
          
          <FileText className={`w-3.5 h-3.5 mr-2 shrink-0 ${isActive ? "text-[#7C5CFF]" : "opacity-60"}`} />
          <span className="truncate flex-1 select-none">{note.title || "Untitled"}</span>

          <div 
            className="opacity-0 group-hover:opacity-100 transition-opacity pr-1"
            onClick={(e) => e.stopPropagation()} 
          >
            <NoteDropdownMenu note={note}>
              <button className="p-1 text-[#9CA3AF] hover:text-white transition-colors rounded hover:bg-white/5">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </NoteDropdownMenu>
          </div>
        </div>
      </NoteContextMenu>

      {isExpanded && depth < MAX_DEPTH && (
        <div className="flex flex-col">
          {isLoading && (
            <div 
              className="text-xs text-[#4B5563] h-8 flex items-center" 
              style={{ paddingLeft: `${(depth + 1) * 12 + 32}px` }}
            >
              <LoaderCircle className="w-3.5 h-3.5 mr-2 shrink-0 animate-spin" />Fetching
            </div>
          )}
          {subpages.map(subpage => (
            <SidebarNoteItem key={subpage.id} note={subpage} depth={depth + 1} />
          ))}
          
          {subpages.length > 0 && (
             <div 
                className="absolute w-px bg-white/5 top-8 bottom-0 pointer-events-none" 
                style={{ left: `${depth * 12 + 14}px` }} 
             />
          )}
        </div>
      )}
    </div>
  );
}