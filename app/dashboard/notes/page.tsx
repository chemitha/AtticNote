import { getAllNotes } from "@/app/actions/notes";
import { Metadata } from "next";
import LoadingLink from "@/components/LoadingLink";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Note } from "@prisma/client";
import CreateNoteButton from "@/components/CreateNoteButton";
// 1. Import your custom unified components
import { NoteContextMenu, NoteDropdownMenu } from "@/components/NoteContextMenu"; 

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function AllNotesPage() {
  const notes: Note[] = await getAllNotes();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">All Notes</h1>
        <CreateNoteButton />
      </div>

      <div className="bg-[#181A20] border border-white/5 rounded-xl divide-y divide-white/5">
        {notes.map((note) => (
          // 2. Use the exact same wrapper you used in dashboard/page.tsx
          <NoteContextMenu key={note.id} note={note}>
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
              <LoadingLink href={`/dashboard/notes/${note.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="h-4 w-4 text-[#7C5CFF] shrink-0" />
                <span className="font-medium truncate text-white group-hover:text-[#7C5CFF] transition-colors">
                  {note.title || "Untitled"}
                </span>
              </LoadingLink>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDistanceToNow(new Date(note.updated_at))} ago
                </span>
                
                <div className="hidden md:flex opacity-0 group-hover:opacity-100 items-center gap-2 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-7 text-xs bg-white/5 hover:bg-white/10 text-gray-300">G-Drive</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs bg-white/5 hover:bg-white/10 text-gray-300">Notion</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs bg-[#7C5CFF] hover:bg-[#6042db] text-white">GitHub</Button>
                </div>
                
                {/* 3. Wrap the trigger button inside NoteDropdownMenu so it works on left-clicks */}
                <NoteDropdownMenu note={note}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </NoteDropdownMenu>
              </div>
            </div>
          </NoteContextMenu>
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