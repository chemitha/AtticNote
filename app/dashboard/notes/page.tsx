import { getAllNotes } from "@/app/actions/notes";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Note } from "@prisma/client";

export default async function AllNotesPage() {
  const notes: Note[] = await getAllNotes();

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">All Notes</h1>

      <div className="bg-[#181A20] border border-white/5 rounded-xl divide-y divide-white/5">
        {notes.map((note) => (
          <div key={note.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
            <Link href={`/dashboard/${note.id}`} className="flex items-center gap-3 flex-1 min-w-0">
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
                <Button variant="ghost" size="sm" className="h-7 text-xs bg-white/5 hover:bg-white/10 text-gray-300">GitHub</Button>
              </div>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No notes found. Create your first note from the sidebar.
          </div>
        )}
      </div>
    </div>
  );
}
