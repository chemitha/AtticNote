import { getAllNotes } from "@/app/actions/notes";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical, ExternalLink, Copy, Trash, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Note } from "@prisma/client";
import CreateNoteButton from "@/components/CreateNoteButton";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export const dynamic = "force-dynamic";

export default async function AllNotesPage() {
  const notes: Note[] = await getAllNotes();

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Notes</h1>
        <CreateNoteButton />
      </div>

      <div className="bg-[#181A20] border border-white/5 rounded-xl divide-y divide-white/5">
        {notes.map((note) => (
          <ContextMenu key={note.id}>
            <ContextMenuTrigger asChild>
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                <Link href={`/dashboard/notes/${note.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="h-4 w-4 text-[#7C5CFF] shrink-0" />
                  <span className="font-medium truncate text-white group-hover:text-[#7C5CFF] transition-colors">{note.title || "Untitled"}</span>
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDistanceToNow(new Date(note.updated_at))} ago
                  </span>
                  
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-7 text-xs bg-white/5 hover:bg-white/10 text-gray-300">G-Drive</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs bg-white/5 hover:bg-white/10 text-gray-300">Notion</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs bg-[#7C5CFF] hover:bg-[#6042db] text-white">GitHub</Button>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64 bg-[#181A20] border-[#2A2E37] text-white">
              <ContextMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Note
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </ContextMenuItem>
              <ContextMenuSeparator className="bg-[#2A2E37]" />
              <ContextMenuItem>
                <RefreshCw className="mr-2 h-4 w-4 text-[#7C5CFF]" />
                <span className="text-[#7C5CFF]">Sync to GitHub</span>
                <ContextMenuShortcut>⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator className="bg-[#2A2E37]" />
              <ContextMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-400/10">
                <Trash className="mr-2 h-4 w-4" />
                Delete Note
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
        {notes.length === 0 && (
          <div className="p-8 text-center text-gray-500">
             <p className="mb-4">No notes found. Create your first note!</p>
          </div>
        )}
      </div>
    </div>
  );
}
