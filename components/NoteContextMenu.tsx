"use client";

import { 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuShortcut 
} from "./ui/context-menu";
import { 
  ExternalLink, 
  Copy, 
  Trash, 
  Link2, 
  FolderInput, 
  Star, 
  Download, 
  Github, 
  Cloud, 
  FileJson,
  Edit2
} from "lucide-react";

export function NoteContextMenuContent({ noteId }: { noteId: string }) {
  return (
    <ContextMenuContent className="w-64 bg-[#181A20] border-[#2A2E37] text-white">
      <ContextMenuItem>
        <Edit2 className="mr-2 h-4 w-4" />
        Edit 
        <ContextMenuShortcut>↵</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        <ExternalLink className="mr-2 h-4 w-4" />
        Open as Page
      </ContextMenuItem>
      <ContextMenuItem>
        <Copy className="mr-2 h-4 w-4" />
        Duplicate
      </ContextMenuItem>
      <ContextMenuItem onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/dashboard/notes/${noteId}`);
      }}>
        <Link2 className="mr-2 h-4 w-4" />
        Copy Link
      </ContextMenuItem>
      <ContextMenuItem>
        <FolderInput className="mr-2 h-4 w-4" />
        Move To
      </ContextMenuItem>
      <ContextMenuSeparator className="bg-[#2A2E37]" />
      <ContextMenuItem>
        <Star className="mr-2 h-4 w-4 text-yellow-500" />
        Add to Favorites
      </ContextMenuItem>
      <ContextMenuSeparator className="bg-[#2A2E37]" />
      <div className="px-2 py-1.5 text-[10px] font-bold text-[#4B5563] uppercase tracking-widest">Integrations</div>
      <ContextMenuItem>
        <Github className="mr-2 h-4 w-4 text-[#7C5CFF]" />
        <span className="text-[#7C5CFF]">Push to GitHub</span>
        <ContextMenuShortcut>⌘S</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        <Cloud className="mr-2 h-4 w-4 text-blue-400" />
        <span className="text-blue-400">Sync with Drive</span>
      </ContextMenuItem>
      <ContextMenuSeparator className="bg-[#2A2E37]" />
      <div className="px-2 py-1.5 text-[10px] font-bold text-[#4B5563] uppercase tracking-widest">Export</div>
      <ContextMenuItem>
        <Download className="mr-2 h-4 w-4" />
        Export Markdown
      </ContextMenuItem>
      <ContextMenuItem>
        <FileJson className="mr-2 h-4 w-4" />
        Export JSON
      </ContextMenuItem>
      <ContextMenuSeparator className="bg-[#2A2E37]" />
      <ContextMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-400/10">
        <Trash className="mr-2 h-4 w-4" />
        Move to Trash
        <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
