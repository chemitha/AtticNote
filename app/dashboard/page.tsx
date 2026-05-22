import Link from "next/link";
import { Metadata } from "next";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical, Search, Plus, ExternalLink, Copy, Trash, RefreshCw } from "lucide-react";
import { getUser } from "@/lib/auth";
import { getAllNotes, getRecentNotes } from "@/app/actions/notes";
import CreateNoteButton from "@/components/CreateNoteButton";
import LoadingLink from "@/components/LoadingLink";
import { GoogleDriveIcon, NotionIcon, GitHubIcon } from "@/components/Icons";
import { NoteContextMenu, NoteDropdownMenu } from "@/components/NoteContextMenu";
import DashboardSearchBar from "@/components/DashboardSearchBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getUser();
  const recentNotes = await getRecentNotes();
  const allNotes = await getAllNotes();

  return (
    <div className="flex-1 flex flex-col relative w-full h-full text-[#F5F7FA]">
      <section className="h-32 md:h-40 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1D2B] to-[#0F1115]"></div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#7C5CFF 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        <div className="absolute bottom-6 left-4 md:bottom-8 md:left-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Welcome back, {user?.name || "User"}</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">You have {allNotes.length} note{allNotes.length !== 1 ? 's' : ''} in your workspace.</p>
        </div>
      </section>

      <div className="px-4 md:px-10 -mt-6 z-10 shrink-0">
        <DashboardSearchBar />
      </div>

      {recentNotes.length > 0 && (
        <div className="px-4 md:px-10 mt-8 shrink-0">
          <h3 className="text-xs uppercase font-bold tracking-widest text-[#4B5563] mb-4">Recent Workspace</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentNotes.map((note) => (
              <NoteContextMenu key={note.id} note={note}>
                <LoadingLink href={`/dashboard/notes/${note.id}`} className="block">
                  <div className="bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl hover:border-[#7C5CFF66] transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl"><FileText className="text-[#FAFAFA] group-hover:text-[#7C5CFF]" /></span>
                      <span className="text-[10px] bg-[#0F1115] text-[#9CA3AF] px-2 py-0.5 rounded-full border border-[#2A2E37] whitespace-nowrap">
                        {formatDistanceToNow(new Date(note.updated_at))} ago
                      </span>
                    </div>
                    <p className="font-medium text-sm truncate group-hover:text-[#F5F7FA]">{note.title || "Untitled"}</p>
                    <p className="text-xs text-[#4B5563] mt-1 truncate">Click to view note</p>
                  </div>
                </LoadingLink>
              </NoteContextMenu>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 md:px-10 mt-10 shrink-0 pb-20 overflow-visible">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs uppercase font-bold tracking-widest text-[#4B5563]">All Notes</h3>
        </div>

        {allNotes.length === 0 ? (
          <div className="text-center py-10 bg-[#181A20] border border-[#2A2E37] rounded-xl">
            <p className="text-[#9CA3AF] text-sm mb-4">Your workspace is empty. Drop a note here and access it from any device.</p>
            <CreateNoteButton />
          </div>
        ) : (
          <div className="space-y-2">
            {allNotes.map((note) => (
              <NoteContextMenu key={note.id} note={note}>
                <div className="relative group bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl hover:border-[#7C5CFF] transition-all mb-2">
                  <LoadingLink href={`/dashboard/notes/${note.id}`} className="absolute inset-0 z-0 rounded-xl block" />

                  <div className="relative z-10 flex items-center gap-4 pointer-events-none">
                    <div className="text-xl shrink-0"><FileText className="text-[#9CA3AF] group-hover:text-[#7C5CFF]" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate group-hover:text-white transition-colors">{note.title || "Untitled"}</p>
                      <p className="text-xs text-[#4B5563] truncate">Last edited {formatDistanceToNow(new Date(note.updated_at))} ago</p>
                    </div>

                    <div className="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                      <TooltipProvider delay={0}>
                        <Tooltip>
                          <TooltipTrigger className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-blue-400 hover:border-blue-500 transition-colors cursor-pointer">
                            <GoogleDriveIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>Coming Soon!</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-gray-300 hover:border-gray-300 transition-colors cursor-pointer">
                            <NotionIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>Coming Soon!</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-[#7C5CFF] hover:border-[#7C5CFF] transition-colors cursor-pointer">
                            <GitHubIcon className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>Coming Soon!</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <NoteDropdownMenu note={note}>
                        <button className="p-1.5 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </NoteDropdownMenu>
                    </div>
                  </div>
                </div>
              </NoteContextMenu>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <CreateNoteButton iconOnly />
      </div>
    </div>
  );
}
