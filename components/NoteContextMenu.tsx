'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Star, Edit2, Copy, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toggleFavoriteAction } from "@/app/actions/notes";

interface NoteContextMenuProps {
  noteId: string;
  isFavorite: boolean;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
}

export function NoteContextMenu({
  noteId,
  isFavorite,
  onDuplicate,
  onDelete,
  onRename
}: NoteContextMenuProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      toggleFavoriteAction(noteId, !isFavorite);
    });
  };

  const handleAction = (e: React.MouseEvent, action: (id: string) => void) => {
    e.preventDefault();
    e.stopPropagation();
    action(noteId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="p-1.5 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer outline-none"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-[#181A20] border-[#2A2E37] text-white shadow-xl shadow-black/50"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem 
          onClick={(e) => handleToggleFavorite(e)}
          disabled={isPending}
          className="flex items-center justify-between text-sm cursor-pointer hover:bg-[#2A2E37] focus:bg-[#2A2E37] focus:text-white"
        >
          <div className="flex items-center gap-2">
            <Star className={`w-4 h-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </div>
          <span className="text-xs text-[#4B5563] tracking-widest font-mono">F</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={(e) => onRename && handleAction(e, onRename)}
          className="flex items-center justify-between text-sm cursor-pointer hover:bg-[#2A2E37] focus:bg-[#2A2E37] focus:text-white"
        >
          <div className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Rename
          </div>
          <span className="text-xs text-[#4B5563] tracking-widest font-mono">R</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={(e) => onDuplicate && handleAction(e, onDuplicate)}
          className="flex items-center justify-between text-sm cursor-pointer hover:bg-[#2A2E37] focus:bg-[#2A2E37] focus:text-white"
        >
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Duplicate
          </div>
          <span className="text-xs text-[#4B5563] tracking-widest font-mono">⌘D</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#2A2E37]" />

        <DropdownMenuItem 
          onClick={(e) => onDelete && handleAction(e, onDelete)}
          className="flex items-center justify-between text-sm cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500"
        >
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </div>
          <span className="text-xs text-[#4B5563] tracking-widest font-mono">DEL</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
