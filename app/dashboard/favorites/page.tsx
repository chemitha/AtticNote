import LoadingLink from "@/components/LoadingLink";
import { formatDistanceToNow } from "date-fns";
import { FileText, MoreVertical, Search, ExternalLink, Copy, Trash, RefreshCw, StarOff } from "lucide-react";
import { getUser } from "@/lib/auth";
import { getFavoriteNotes } from "@/app/actions/notes";
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

export default async function FavoritesPage() {
  const user = await getUser();
  const favoriteNotes = await getFavoriteNotes();

  return (
    <div className="flex-1 flex flex-col relative w-full h-full text-[#F5F7FA]">
      <section className="h-40 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1D2B] to-[#0F1115]"></div>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#F5A623 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        <div className="absolute bottom-8 left-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">Favorites</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">You have {favoriteNotes.length} favorited note{favoriteNotes.length !== 1 ? 's' : ''}.</p>
        </div>
      </section>

      <div className="px-10 -mt-6 z-10 shrink-0">
        <div className="bg-[#181A20] rounded-xl border border-[#2A2E37] flex items-center gap-3 px-4 py-3 shadow-2xl">
          <Search className="w-5 h-5 text-[#9CA3AF]" />
          <input 
            type="text" 
            placeholder="Search favorites..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#4B5563] text-white focus:ring-0" 
          />
          <div className="flex items-center gap-1 bg-[#0F1115] border border-[#2A2E37] px-2 py-0.5 rounded text-[10px] font-mono text-[#9CA3AF]">
            <span className="text-[12px]">⌘</span> K
          </div>
        </div>
      </div>

      <div className="px-10 mt-10 shrink-0 mb-20 overflow-visible flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs uppercase font-bold tracking-widest text-[#4B5563]">Starred Notes</h3>
        </div>
        
        {favoriteNotes.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
             <div className="w-20 h-20 bg-[#181A20] rounded-2xl flex items-center justify-center border border-[#2A2E37] shadow-xl text-yellow-500 mb-6">
                <StarOff className="w-10 h-10 opacity-50" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">No favorites yet</h3>
             <p className="text-[#9CA3AF] text-sm max-w-sm text-center">Star a note from your workspace to see it here for quick access later!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {favoriteNotes.map((note) => (
              <ContextMenu key={note.id}>
                <ContextMenuTrigger asChild>
                  <LoadingLink href={`/dashboard/notes/${note.id}`} className="block">
                    <div className="group bg-[#181A20] border border-[#2A2E37] p-4 rounded-xl flex items-center gap-4 hover:border-yellow-500/50 transition-all cursor-pointer mb-2">
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
                          <span className="text-yellow-500 mx-2">★</span>
                          <button className="p-1.5 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">
                              <MoreVertical className="w-4 h-4" />
                          </button>
                      </div>
                    </div>
                  </LoadingLink>
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
                    <StarOff className="mr-2 h-4 w-4 text-yellow-500" />
                    <span className="text-yellow-500">Remove from Favorites</span>
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
