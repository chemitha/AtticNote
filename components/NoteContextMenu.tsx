"use client";

import { useTransition } from "react";
import { 
  ExternalLink, 
  Copy, 
  Trash, 
  RefreshCw,
  Star,
  StarOff
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteNoteAction, duplicateNoteAction, toggleFavoriteAction } from "@/app/actions/notes";
import { useLoading } from "@/hooks/use-loading";
import { useRouter } from "next/navigation";

// Custom hook to share logic between both menus
export function useNoteActions(noteId: string, isFavorite: boolean) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading.getState();

  const handleOpen = () => {
    window.open(`/dashboard/notes/${noteId}`, "_blank");
  };

  const handleDuplicate = () => {
    startTransition(async () => {
      try {
        const res = await duplicateNoteAction(noteId);
        if (res.success && res.note) {
          router.push(`/dashboard/notes/${res.note.id}`);
        }
      } catch (error) {
        console.error("Failed to duplicate note:", error);
      }
    });
  };

  const handleToggleFavorite = () => {
    startTransition(async () => {
      try {
        await toggleFavoriteAction(noteId, !isFavorite);
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteNoteAction(noteId);
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    });
  };

  return {
    isPending,
    handleOpen,
    handleDuplicate,
    handleToggleFavorite,
    handleDelete
  };
}

export interface NoteActionsProps {
  note: {
    id: string;
    is_favorite: boolean;
  };
}

interface NoteContextMenuProps extends NoteActionsProps {
  children: React.ReactNode;
}

export function NoteContextMenu({ children, note }: NoteContextMenuProps) {
  const { isPending, handleOpen, handleDuplicate, handleToggleFavorite, handleDelete } = useNoteActions(note.id, note.is_favorite);

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
        <ContextMenuItem onClick={handleToggleFavorite} className="cursor-pointer" disabled={isPending}>
          {note.is_favorite ? <StarOff className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
          {note.is_favorite ? "Remove from Favorites" : "Add to Favorites"}
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

interface NoteDropdownMenuProps extends NoteActionsProps {
  children: React.ReactNode;
}

export function NoteDropdownMenu({ children, note }: NoteDropdownMenuProps) {
  const { isPending, handleOpen, handleDuplicate, handleToggleFavorite, handleDelete } = useNoteActions(note.id, note.is_favorite);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-[#181A20] border-[#2A2E37] text-white z-50">
        <DropdownMenuItem onClick={handleOpen} className="cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Open Note
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate} className="cursor-pointer" disabled={isPending}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggleFavorite} className="cursor-pointer" disabled={isPending}>
          {note.is_favorite ? <StarOff className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
          {note.is_favorite ? "Remove from Favorites" : "Add to Favorites"}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#2A2E37]" />
        <DropdownMenuItem className="cursor-not-allowed opacity-50">
          <RefreshCw className="mr-2 h-4 w-4 text-[#7C5CFF]" />
          <span className="text-[#7C5CFF]">Sync to GitHub</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#2A2E37]" />
        <DropdownMenuItem 
          onClick={handleDelete} 
          className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
          disabled={isPending}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Note
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
