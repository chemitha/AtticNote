"use client";
import { FileText, MoreVertical, Github, Box, HardDrive, Filter, Clock } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Banner */}
      <div className="relative h-40 md:h-[320px] bg-gradient-to-br from-[#7C5CFF]/20 to-[#0B0D12] overflow-hidden shrink-0">
         <div className="absolute inset-0 bg-[#7C5CFF]/5 backdrop-blur-[100px]" />
         <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#98A2B3]">
              Welcome back
            </h1>
            <p className="text-sm md:text-base text-[#98A2B3] mt-1 md:mt-2">2 notes edited today.</p>
         </div>
         <button className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-[#12151C]/50 border border-[#232734] text-white hover:bg-[#232734]">
            <MoreVertical className="w-5 h-5" />
         </button>
      </div>

      <div className="flex-1 p-4 md:p-8 bg-[#0B0D12]">
         {/* Desktop Only header / filters */}
         <div className="hidden md:flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 text-sm font-medium">
               <button className="text-[#F4F7FA] border-b-2 border-[#7C5CFF] pb-1">All Notes</button>
               <button className="text-[#98A2B3] hover:text-[#F4F7FA] pb-1">Favorites</button>
               <button className="text-[#98A2B3] hover:text-[#F4F7FA] pb-1">Recent</button>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#232734] text-sm text-[#98A2B3] hover:bg-[#12151C]">
              <Filter className="w-4 h-4" /> Filter
            </button>
         </div>

         {/* Mobile Recent indicator */}
         <div className="md:hidden flex items-center justify-between mb-4 mt-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7C5CFF]" /> Recent Files
            </h2>
         </div>

         {/* Notes Grid / List */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {/* Desktop and Mobile Note Card */}
            <div className="group bg-[#12151C] border border-[#232734] rounded-xl p-4 flex flex-col hover:border-[#7C5CFF]/30 transition-all cursor-pointer">
               <div className="flex items-start justify-between mb-8 md:mb-12">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-[#232734] flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#F4F7FA]" />
                     </div>
                     <div>
                        <h3 className="font-medium text-base text-[#F4F7FA]">Project Roadmap</h3>
                        <p className="text-xs text-[#98A2B3]">2h ago</p>
                     </div>
                  </div>
                  {/* Mobile Actions: Kebab, Desktop Actions: Buttons */}
                  <div className="md:hidden">
                    <button className="p-2 -mr-2 text-[#98A2B3] active:bg-[#232734] rounded-full">
                       <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="hidden md:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-8 h-8 rounded bg-[#232734] flex items-center justify-center text-[#98A2B3] hover:text-white"><HardDrive className="w-4 h-4" /></div>
                     <div className="w-8 h-8 rounded bg-[#232734] flex items-center justify-center text-[#98A2B3] hover:text-white"><Box className="w-4 h-4" /></div>
                     <div className="w-8 h-8 rounded bg-[#232734] flex items-center justify-center text-[#98A2B3] hover:text-white"><Github className="w-4 h-4" /></div>
                  </div>
               </div>
               
               <div className="mt-auto hidden md:flex items-center gap-3 text-xs text-[#98A2B3]">
                  <span className="flex items-center gap-1.5"><Box className="w-3 h-3" /> Synced</span>
               </div>
            </div>

            <div className="group bg-[#12151C] border border-[#232734] rounded-xl p-4 flex flex-col hover:border-[#7C5CFF]/30 transition-all cursor-pointer">
               <div className="flex items-start justify-between mb-8 md:mb-12">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-[#232734] flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#98A2B3]" />
                     </div>
                     <div>
                        <h3 className="font-medium text-base text-[#E2E8F0]">Product Specs — MVP</h3>
                        <p className="text-xs text-[#98A2B3]">Yesterday</p>
                     </div>
                  </div>
                  <div className="md:hidden">
                    <button className="p-2 -mr-2 text-[#98A2B3] active:bg-[#232734] rounded-full">
                       <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="hidden md:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-8 h-8 rounded bg-[#232734] flex items-center justify-center text-[#98A2B3] hover:text-white"><HardDrive className="w-4 h-4" /></div>
                     <div className="w-8 h-8 rounded bg-[#232734] flex items-center justify-center text-[#98A2B3] hover:text-white"><Box className="w-4 h-4" /></div>
                     <div className="w-8 h-8 rounded bg-[#232734] flex items-center justify-center text-[#98A2B3] hover:text-white"><Github className="w-4 h-4" /></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Desktop FAB component in layout, but let's add one here for dashboard root (optional, handled in layout bottom nav for mobile and sidebar/header for desktop usually, or a floating action) */}
    </div>
  );
}
