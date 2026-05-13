import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical, Search, Plus, ExternalLink, Copy, Trash, RefreshCw, Star } from "lucide-react";
import { getUser } from "@/lib/auth";
import { getAllNotes, getRecentNotes } from "@/app/actions/notes";
import CreateNoteButton from "@/components/CreateNoteButton";
import { NoteActions } from "@/components/NoteActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function DashboardPage() {
  const user = await getUser();
  const recentNotes = await getRecentNotes();
  const allNotes = await getAllNotes();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, {user?.name || "User"}</h1>
          <p className="text-sm text-[#4B5563]">Here's what's happening with your notes.</p>
        </div>
        <CreateNoteButton />
      </header>

      {/* Recent Notes Grid */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-[#9CA3AF]">
          <RefreshCw className="w-4 h-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wider">Recent Workspace</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentNotes.map((note) => (
            <Link key={note.id} href={`/dashboard/notes/${note.id}`} className="block group relative">
              <div className="bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl hover:border-[#7C5CFF66] transition-colors cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">📄</span>
                  <div className="flex items-center gap-2">
                    {note.is_favorite && <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />}
                    <span className="text-[10px] bg-[#0F1115] text-[#9CA3AF] px-2 py-0.5 rounded-full border border-[#2A2E37] whitespace-nowrap">
                      {formatDistanceToNow(new Date(note.updated_at))} ago
                    </span>
                  </div>
                </div>
                <p className="font-medium text-sm truncate group-hover:text-[#F5F7FA]">{note.title || "Untitled"}</p>
                <p className="text-xs text-[#4B5563] mt-1 truncate">Click to view note</p>
                
                {/* Reveal on hover actions */}
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <NoteActions note={note} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Notes List */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-[#9CA3AF]">
          <FileText className="w-4 h-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wider">All Notes</h2>
        </div>
        <div className="space-y-2">
          {allNotes.map((note) => (
            <Link key={note.id} href={`/dashboard/notes/${note.id}`} className="group block">
              <div className="bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl flex items-center gap-4 hover:border-[#7C5CFF] transition-all cursor-pointer">
                <div className="text-xl shrink-0">📝</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate group-hover:text-white transition-colors">{note.title || "Untitled"}</p>
                    {note.is_favorite && <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-[#4B5563] truncate">Last edited {formatDistanceToNow(new Date(note.updated_at))} ago</p>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <NoteActions note={note} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
