"use client";

import { useTransition } from "react";
import { 
  ExternalLink, 
  Copy, 
  Trash, 
  RefreshCw 
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { deleteNoteAction, duplicateNoteAction } from "@/app/actions/notes";
import { useLoading } from "@/hooks/use-loading";
import { useRouter } from "next/navigation";

interface NoteContextMenuProps {
  children: React.ReactNode;
  noteId: string;
}

export default function NoteContextMenu({ children, noteId }: NoteContextMenuProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading.getState();

  const handleOpen = () => {
    console.log("Opening note:", noteId);
    window.open(`/dashboard/notes/${noteId}`, "_blank");
  };

  const handleDuplicate = () => {
    console.log("Duplicating note:", noteId);
    startTransition(async () => {
      try {
        const res = await duplicateNoteAction(noteId);
        console.log("Duplicate result:", res);
        if (res.success && res.note) {
          router.push(`/dashboard/notes/${res.note.id}`);
        }
      } catch (error) {
        console.error("Failed to duplicate note:", error);
      }
    });
  };

  const handleDelete = () => {
    console.log("Deleting note:", noteId);
    startTransition(async () => {
      try {
        const res = await deleteNoteAction(noteId);
        console.log("Delete result:", res);
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 bg-[#181A20] border-[#2A2E37] text-white">
        <ContextMenuItem onClick={handleOpen} className="cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Note
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="cursor-pointer" disabled={isPending}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-[#2A2E37]" />
        <ContextMenuItem className="cursor-not-allowed opacity-50">
          <RefreshCw className="mr-2 h-4 w-4 text-[#7C5CFF]" />
          <span className="text-[#7C5CFF]">Sync to GitHub</span>
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-[#2A2E37]" />
        <ContextMenuItem 
          onClick={handleDelete} 
          className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
          disabled={isPending}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Note
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
