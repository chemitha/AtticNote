"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Search, FileText, User, Menu, X, Plus, Github, HardDrive, Box, MoreVertical } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#0B0D12] overflow-hidden text-[#F4F7FA] font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-[#232734] bg-[#0B0D12]">
        <div className="p-4 flex items-center justify-between border-b border-[#232734]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-[#7C5CFF]/10 flex items-center justify-center text-[#7C5CFF] font-bold">U</div>
             <span className="font-medium text-sm">User&apos;s Workspace</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <div className="text-xs font-semibold text-[#98A2B3] mb-3 px-2 tracking-wider">WORKSPACE</div>
            <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1.5 text-sm rounded bg-[#232734] text-[#F4F7FA]">
               <Layout className="w-4 h-4" /> Home
            </Link>
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3] cursor-pointer mt-1">
               <Search className="w-4 h-4" /> Search
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#98A2B3] mb-3 px-2 tracking-wider">NOTES</div>
            <Link href="/dashboard/1" className="block px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3]">
               📄 Project Alpha
            </Link>
            <Link href="/dashboard/2" className="block px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3]">
               📄 Weekly Meeting
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-[80vw] max-w-sm h-full bg-[#0B0D12] border-r border-[#232734] flex flex-col transform transition-transform duration-300">
            <div className="p-4 flex items-center justify-between border-b border-[#232734]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#7C5CFF]/10 flex items-center justify-center text-[#7C5CFF] font-bold">U</div>
                <span className="font-medium text-sm">User&apos;s Workspace</span>
              </div>
              <button className="p-2 text-[#98A2B3] hover:text-[#F4F7FA]" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
               <div>
                  <div className="text-xs font-semibold text-[#98A2B3] mb-3 px-2 tracking-wider">HOME</div>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-2 py-3 text-base rounded hover:bg-[#232734] text-[#F4F7FA]">
                     <Layout className="w-5 h-5" /> Dashboard
                  </Link>
                  <div className="flex items-center gap-3 px-2 py-3 text-base rounded hover:bg-[#232734] text-[#98A2B3]">
                     <Search className="w-5 h-5" /> Search
                  </div>
               </div>
               <div>
                  <div className="text-xs font-semibold text-[#98A2B3] mb-3 px-2 tracking-wider">NOTES</div>
                  <Link href="/dashboard/1" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-3 text-base rounded hover:bg-[#232734] text-[#98A2B3]">
                     📄 Project Alpha
                  </Link>
                  <Link href="/dashboard/2" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-3 text-base rounded hover:bg-[#232734] text-[#98A2B3]">
                     📄 Weekly Meeting
                  </Link>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Mobile Topbar */}
        <header className="md:hidden h-14 border-b border-[#232734] flex items-center px-4 justify-between bg-[#0B0D12]">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-[#98A2B3] hover:text-[#F4F7FA]">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-sm">User&apos;s Workspace</span>
          <button className="p-2 -mr-2 text-[#98A2B3] hover:text-[#F4F7FA]">
            <Search className="w-5 h-5" />
          </button>
        </header>

        {/* Desktop Topbar */}
        <header className="hidden md:flex h-14 border-b border-[#232734] bg-[#0B0D12] items-center px-8 justify-end">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#12151C] border border-[#232734] text-xs text-[#98A2B3] w-64 cursor-text">
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="ml-auto bg-[#232734] px-1.5 rounded">Ctrl+K</kbd>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-20 md:pb-0 hide-scrollbar relative">
          {children}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-16 border-t border-[#232734] bg-[#0B0D12]/95 backdrop-blur-md flex items-center justify-around px-2 z-40 pb-safe">
          <Link href="/dashboard" className={`flex flex-col items-center gap-1 ${pathname === "/dashboard" ? "text-[#7C5CFF]" : "text-[#98A2B3]"}`}>
            <Layout className="w-6 h-6" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <div className="flex flex-col items-center gap-1 text-[#98A2B3]">
            <FileText className="w-6 h-6" />
            <span className="text-[10px] font-medium">Notes</span>
          </div>
          <div className="relative -top-5">
            <div className="w-14 h-14 rounded-full bg-[#7C5CFF] shadow-[0_4px_20px_rgba(124,92,255,0.4)] flex items-center justify-center text-white cursor-pointer hover:bg-[#684CE6] transition-colors">
              <Plus className="w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-[#98A2B3]">
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-medium">Search</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-[#98A2B3]">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">Me</span>
          </div>
        </div>
      </main>
    </div>
  );
}
