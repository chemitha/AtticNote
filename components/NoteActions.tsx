'use client';

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
    <div className="flex items-center" onClick={preventNavigation}>
      <NoteContextMenu 
        noteId={note.id} 
        isFavorite={note.is_favorite} 
        updatedAt={note.updated_at}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onRename={handleRename}
      />
    </div>
  );
}
