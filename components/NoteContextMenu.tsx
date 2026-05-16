"use client";

import { useTransition } from "react";
import {
  ExternalLink,
  Copy,
  Trash,
  RefreshCw,
  Star,
  StarOff,
} from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  deleteNoteAction,
  duplicateNoteAction,
  toggleFavoriteAction,
} from "@/app/actions/notes";

import { useLoading } from "@/hooks/use-loading";
import { useRouter } from "next/navigation";

/* -----------------------------
   Shared hook (unchanged logic)
------------------------------ */
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
    handleDelete,
  };
}

/* -----------------------------
   Types
------------------------------ */
export interface NoteActionsProps {
  note: {
    id: string;
    is_favorite: boolean;
  };
}

interface NoteContextMenuProps extends NoteActionsProps {
  children: React.ReactNode;
}

/* -----------------------------
   Shared Notion-like styles
------------------------------ */
const menuContentClass =
  "w-64 rounded-xl bg-[#1F1F1F]/90 backdrop-blur-xl text-white shadow-2xl p-1 border-0 outline-none ring-0 focus:outline-none focus:ring-0";

/* -----------------------------
   Context Menu (Notion style)
------------------------------ */
export function NoteContextMenu({
  children,
  note,
}: NoteContextMenuProps) {
  const {
    isPending,
    handleOpen,
    handleDuplicate,
    handleToggleFavorite,
    handleDelete,
  } = useNoteActions(note.id, note.is_favorite);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className={menuContentClass}>
        <ContextMenuItem className="rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4 opacity-70" />
          Open Note
        </ContextMenuItem>

        <ContextMenuItem
          onClick={handleDuplicate}
          disabled={isPending}
          className="rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition cursor-pointer"
        >
          <Copy className="mr-2 h-4 w-4 opacity-70" />
          Duplicate Note
        </ContextMenuItem>

        <ContextMenuItem
          onClick={handleToggleFavorite}
          disabled={isPending}
          className="rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition cursor-pointer"
        >
          {note.is_favorite ? (
            <StarOff className="mr-2 h-4 w-4 opacity-70" />
          ) : (
            <Star className="mr-2 h-4 w-4 opacity-70" />
          )}
          {note.is_favorite ? "Remove from Favorites" : "Add to Favorites"}
        </ContextMenuItem>

        <div className="my-1 h-px bg-white/10" />

        <ContextMenuItem className="rounded-lg px-3 py-2 text-sm opacity-40 cursor-not-allowed">
          <RefreshCw className="mr-2 h-4 w-4 text-indigo-400" />
          Sync to GitHub
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>

        <div className="my-1 h-px bg-white/10" />

        <ContextMenuItem
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Note
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

/* -----------------------------
   Dropdown Menu (same style)
------------------------------ */
interface NoteDropdownMenuProps extends NoteActionsProps {
  children: React.ReactNode;
}

export function NoteDropdownMenu({
  children,
  note,
}: NoteDropdownMenuProps) {
  const {
    isPending,
    handleOpen,
    handleDuplicate,
    handleToggleFavorite,
    handleDelete,
  } = useNoteActions(note.id, note.is_favorite);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={menuContentClass}
      >
        <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4 opacity-70" />
          Open Note
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDuplicate}
          disabled={isPending}
          className="rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition cursor-pointer"
        >
          <Copy className="mr-2 h-4 w-4 opacity-70" />
          Duplicate Note
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleToggleFavorite}
          disabled={isPending}
          className="rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition cursor-pointer"
        >
          {note.is_favorite ? (
            <StarOff className="mr-2 h-4 w-4 opacity-70" />
          ) : (
            <Star className="mr-2 h-4 w-4 opacity-70" />
          )}
          {note.is_favorite ? "Remove from Favorites" : "Add to Favorites"}
        </DropdownMenuItem>

        <div className="my-1 h-px bg-white/10" />

        <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm opacity-40 cursor-not-allowed">
          <RefreshCw className="mr-2 h-4 w-4 text-indigo-400" />
          Sync to Github
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>

        <div className="my-1 h-px bg-white/10" />

        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Note
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}