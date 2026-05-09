"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, Home, FileText, Clock, Trash2, Settings, LogOut, Search, Star } from "lucide-react";

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleCreateNote() {
    // mock
  }

  async function handleLogout() {
    // mock
    router.push("/");
  }

  return (
    <aside className="w-64 bg-[#111318] border-r border-[#2A2E37] flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#7C5CFF] rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-[#7C5CFF33]">
          N
        </div>
        <span className="font-semibold text-lg tracking-tight">NotionFlow</span>
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
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-sm">Google Drive</span>
              <span className="ml-auto text-[10px] bg-blue-900/30 text-blue-400 px-1.5 py-0.5 rounded">Syncing</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-sm">Notion</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
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
        <div className="flex items-center gap-3 px-3 py-2 bg-[#7C5CFF15] rounded-xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-blue-400"></div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold truncate text-[#F5F7FA]">Chemitha D.</p>
            <p className="text-[10px] text-[#9CA3AF] truncate">Personal Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ href, icon, children, active }: { href: string, icon: React.ReactNode, children: React.ReactNode, active: boolean }) {
  if (active) {
    return (
      <Link href={href} className="flex items-center gap-3 px-3 py-2 bg-[#181A20] text-[#F5F7FA] rounded-md border border-[#2A2E37] text-sm">
        {icon}
        <span>{children}</span>
      </Link>
    );
  }
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md transition-colors text-sm">
      {icon}
      <span>{children}</span>
    </Link>
  );
}
