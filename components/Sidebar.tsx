"use client";

import Image from "next/image";
import LoadingLink from "./LoadingLink";
import { usePathname, useRouter } from "next/navigation";
import { Plus, Home, FileText, Clock, Trash2, Settings, LogOut, Search, Star, Box } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { GoogleDriveIcon, NotionIcon, GitHubIcon } from "@/components/Icons";
import { useLoading } from "@/hooks/use-loading";

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const { startLoading } = useLoading.getState();
    startLoading();
    await logoutAction();
    router.push("/");
  }

  return (
    <aside className="w-64 bg-[#111318] border-r border-[#2A2E37] flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <LoadingLink href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
            <Image src="/logo.svg" alt="Attic Logo" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-lg tracking-tight">AtticNote</span>
        </LoadingLink>
      </div>
      

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-widest mb-2 px-2">Workspace</div>
        <div className="space-y-1">
          <NavLink href="/dashboard" icon={<Home className="w-4 h-4" />} active={pathname === "/dashboard"}>Home</NavLink>
        </div>
        
        <div className="pt-2">
          <div className="space-y-1">
            <NavLink href="/dashboard/notes" icon={<FileText className="w-4 h-4" />} active={pathname.startsWith("/dashboard/notes")}>Notes</NavLink>
            <NavLink href="/dashboard/favorites" icon={<Star className="w-4 h-4" />} active={pathname === "/dashboard/favorites"}>Favorites</NavLink>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-widest mb-2 px-2">Integrations</p>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group">
              <GoogleDriveIcon className="w-4 h-4" />
              <span className="text-sm">Google Drive</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group">
              <NotionIcon className="w-4 h-4" />
              <span className="text-sm">Notion</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group">
              <GitHubIcon className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-[#2A2E37] space-y-2">
        <div className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer text-sm">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-red-500/10 hover:text-red-400 rounded-md cursor-pointer text-sm transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        <div className="flex items-center gap-3 px-3 py-2 bg-[#7C5CFF15] rounded-xl mt-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-blue-400 flex items-center justify-center text-white font-medium text-xs">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold truncate text-[#F5F7FA]">{user?.name || "User"}</p>
            <p className="text-[10px] text-[#9CA3AF] truncate">Personal Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ href, icon, children, active }: { href: string, icon: React.ReactNode, children: React.ReactNode, active: boolean }) {
  const { startLoading } = useLoading.getState();
  
  const handleClick = () => {
    if (!active) startLoading();
  };

  if (active) {
    return (
      <LoadingLink href={href} onClick={handleClick} className="flex items-center gap-3 px-3 py-2 bg-[#181A20] text-[#F5F7FA] rounded-md border border-[#2A2E37] text-sm">
        {icon}
        <span>{children}</span>
      </LoadingLink>
    );
  }
  return (
    <LoadingLink href={href} onClick={handleClick} className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md transition-colors text-sm">
      {icon}
      <span>{children}</span>
    </LoadingLink>
  );
}
