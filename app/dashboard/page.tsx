import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical, Search, Plus, ExternalLink, Copy, Trash, RefreshCw } from "lucide-react";
import { getUser } from "@/lib/auth";
import { getAllNotes, getRecentNotes } from "@/app/actions/notes";
import CreateNoteButton from "@/components/CreateNoteButton";
import { GoogleDriveIcon, NotionIcon, GitHubIcon } from "@/components/Icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default async function DashboardPage() {
  const user = await getUser();
  const recentNotes = await getRecentNotes();
  const allNotes = await getAllNotes();

  return (
    <div className="flex-1 flex flex-col relative w-full h-full text-[#F5F7FA]">
      <section className="h-40 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1D2B] to-[#0F1115]"></div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#7C5CFF 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        <div className="absolute bottom-8 left-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, {user?.name || "User"}</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">You have {allNotes.length} note{allNotes.length !== 1 ? 's' : ''} in your workspace.</p>
        </div>
      </section>

      <div className="px-10 -mt-6 z-10 shrink-0">
        <div className="bg-[#181A20] rounded-xl border border-[#2A2E37] flex items-center gap-3 px-4 py-3 shadow-2xl">
          <Search className="w-5 h-5 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search notes, tags, and blocks..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#4B5563] text-white focus:ring-0" 
          />
          <div className="flex items-center gap-1 bg-[#0F1115] border border-[#2A2E37] px-2 py-0.5 rounded text-[10px] font-mono text-[#9CA3AF]">
            <span className="text-[12px]">⌘</span> K
          </div>
        </div>
      </div>

      {recentNotes.length > 0 && (
        <div className="px-10 mt-8 shrink-0">
          <h3 className="text-xs uppercase font-bold tracking-widest text-[#4B5563] mb-4">Recent Workspace</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentNotes.map((note) => (
              <ContextMenu key={note.id}>
                <ContextMenuTrigger asChild>
                  <Link href={`/dashboard/notes/${note.id}`} className="block">
                    <div className="bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl hover:border-[#7C5CFF66] transition-colors cursor-pointer group">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">📄</span>
                        <span className="text-[10px] bg-[#0F1115] text-[#9CA3AF] px-2 py-0.5 rounded-full border border-[#2A2E37] whitespace-nowrap">
                          {formatDistanceToNow(new Date(note.updated_at))} ago
                        </span>
                      </div>
                      <p className="font-medium text-sm truncate group-hover:text-[#F5F7FA]">{note.title || "Untitled"}</p>
                      <p className="text-xs text-[#4B5563] mt-1 truncate">Click to view note</p>
                    </div>
                  </Link>
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
          </div>
        </div>
      )}

      <div className="px-10 mt-10 shrink-0 mb-20 overflow-visible">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs uppercase font-bold tracking-widest text-[#4B5563]">All Notes</h3>
        </div>
        
        {allNotes.length === 0 ? (
          <div className="text-center py-10 bg-[#181A20] border border-[#2A2E37] rounded-xl">
             <p className="text-[#9CA3AF] text-sm mb-4">No notes yet. Create your first note!</p>
             <CreateNoteButton />
          </div>
        ) : (
          <div className="space-y-2">
            {allNotes.map((note) => (
              <ContextMenu key={note.id}>
                <ContextMenuTrigger asChild>
                  <Link href={`/dashboard/notes/${note.id}`} className="block">
                    <div className="group bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl flex items-center gap-4 hover:border-[#7C5CFF] transition-all cursor-pointer mb-2">
                      <div className="text-xl shrink-0">📝</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate group-hover:text-white transition-colors">{note.title || "Untitled"}</p>
                        <p className="text-xs text-[#4B5563] truncate">Last edited {formatDistanceToNow(new Date(note.updated_at))} ago</p>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider delay={0}>
                            <Tooltip>
                              <TooltipTrigger className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-blue-400 hover:border-blue-500 transition-colors cursor-pointer">
                                <GoogleDriveIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent>Upload to G-Drive</TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-gray-300 hover:border-gray-300 transition-colors cursor-pointer">
                                <NotionIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent>Sync with Notion</TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger className="p-1.5 bg-[#0F1115] border border-[#2A2E37] text-[#9CA3AF] rounded-lg hover:text-[#7C5CFF] hover:border-[#7C5CFF] transition-colors cursor-pointer">
                                <GitHubIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent>Push to GitHub</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <button className="p-1.5 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">
                              <MoreVertical className="w-4 h-4" />
                          </button>
                      </div>
                    </div>
                  </Link>
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
                  </ContextMenuItem>
                  <ContextMenuSeparator className="bg-[#2A2E37]" />
                  <ContextMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-400/10">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Note
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <CreateNoteButton iconOnly />
      </div>
    </div>
  );
}
