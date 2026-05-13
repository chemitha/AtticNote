import { formatDistanceToNow } from "date-fns";
import { FileText, StarOff } from "lucide-react";
import { getUser } from "@/lib/auth";
import { getFavoriteNotes } from "@/app/actions/notes";
import Link from "next/link";
import { NoteActions } from "@/components/NoteActions";

export default async function FavoritesPage() {
  const favorites = await getFavoriteNotes();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-white mb-1">Your Favorites</h1>
        <p className="text-sm text-[#4B5563]">Quick access to your most important notes.</p>
      </header>

      <section>
        {favorites.length === 0 ? (
          <div className="bg-[#181A20] border border-[#2A2E37] p-12 rounded-xl flex flex-col items-center justify-center text-center">
            <StarOff className="w-12 h-12 text-[#2A2E37] mb-4" />
            <p className="text-white font-medium">No favorites yet</p>
            <p className="text-sm text-[#4B5563]">Mark notes as favorites to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((note) => (
              <Link key={note.id} href={`/dashboard/notes/${note.id}`} className="block group relative">
                <div className="bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl hover:border-[#7C5CFF66] transition-colors cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">⭐</span>
                    <span className="text-[10px] bg-[#0F1115] text-[#9CA3AF] px-2 py-0.5 rounded-full border border-[#2A2E37] whitespace-nowrap">
                      {formatDistanceToNow(new Date(note.updated_at))} ago
                    </span>
                  </div>
                  <p className="font-medium text-sm truncate group-hover:text-[#F5F7FA]">{note.title || "Untitled"}</p>
                  <p className="text-xs text-[#4B5563] mt-1 truncate">Click to view note</p>
                  
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <NoteActions note={note} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
