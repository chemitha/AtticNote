'use client';

import { GoogleDriveIcon, NotionIcon, GitHubIcon } from "@/components/Icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NoteContextMenu } from "./NoteContextMenu";
import { deleteNoteAction, duplicateNoteAction, renameNoteAction } from "@/app/actions/notes";
import { useTransition } from "react";

export function NoteActions({ note }: { note: any }) {
  const [isPending, startTransition] = useTransition();

  const handleDuplicate = (id: string) => {
    startTransition(async () => {
      try {
        await duplicateNoteAction(id);
      } catch (error) {
        console.error("Failed to duplicate:", error);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      startTransition(async () => {
        try {
          await deleteNoteAction(id);
        } catch (error) {
          console.error("Failed to delete:", error);
        }
      });
    }
  };

  const handleRename = (id: string) => {
    const newTitle = prompt("Enter new title", note.title || "");
    if (newTitle !== null && newTitle !== note.title) {
      startTransition(async () => {
        try {
          await renameNoteAction(id, newTitle);
        } catch (error) {
          console.error("Failed to rename:", error);
        }
      });
    }
  };

  const preventNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={preventNavigation}>
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("G-Drive sync for", note.id);
              }}
              className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-blue-400 hover:border-blue-500 transition-colors cursor-pointer outline-none"
            >
              <GoogleDriveIcon className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#181A20] border-[#2A2E37] text-white">Upload to G-Drive</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Notion sync for", note.id);
              }}
              className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-gray-300 hover:border-gray-300 transition-colors cursor-pointer outline-none"
            >
              <NotionIcon className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#181A20] border-[#2A2E37] text-white">Sync with Notion</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("GitHub sync for", note.id);
              }}
              className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-[#7C5CFF] hover:border-[#7C5CFF] transition-colors cursor-pointer outline-none"
            >
              <GitHubIcon className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#181A20] border-[#2A2E37] text-white">Push to GitHub</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <NoteContextMenu 
        noteId={note.id} 
        isFavorite={note.is_favorite} 
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onRename={handleRename}
      />
    </div>
  );
}
