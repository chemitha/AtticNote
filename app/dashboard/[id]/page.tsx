"use client";
import React, { useState } from "react";
import { ArrowLeft, MoreVertical, Plus, Type, Heading1, CheckSquare, Image as ImageIcon, Code, Minus, Layout } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditorPage() {
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const params = useParams();

  return (
    <div className="flex flex-col h-full bg-[#0B0D12] md:bg-[#12151C]/30 relative">
      {/* Mobile Editor Topbar */}
      <header className="md:hidden sticky top-0 z-20 h-14 border-b border-[#232734] bg-[#0B0D12]/95 backdrop-blur-md flex items-center px-4 justify-between">
         <Link href="/dashboard" className="flex items-center text-[#98A2B3] hover:text-[#F4F7FA]">
            <ArrowLeft className="w-5 h-5 mr-4" />
            <span className="font-semibold text-sm truncate w-40 text-[#F4F7FA]">Project Roadmap</span>
         </Link>
         <button className="p-2 -mr-2 text-[#98A2B3] hover:text-[#F4F7FA]">
            <MoreVertical className="w-5 h-5" />
         </button>
      </header>
      
      {/* Desktop Header */}
      <div className="hidden md:flex h-12 items-center px-8 border-b border-[#232734] bg-[#0B0D12] top-0 sticky z-20">
         <div className="text-xs text-[#98A2B3] font-mono">Workspace / Project Roadmap</div>
         <div className="ml-auto flex gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold bg-[#232734] text-white rounded">Share</button>
         </div>
      </div>

      <div className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-16 md:bg-[#0B0D12] md:min-h-screen md:shadow-2xl md:border-x border-[#232734]">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F4F7FA] outline-none" contentEditable suppressContentEditableWarning>Project Roadmap</h1>
        
        <div className="space-y-4 outline-none text-base md:text-lg text-[#E2E8F0]" contentEditable suppressContentEditableWarning>
           <div className="flex items-start gap-3">
             <input type="checkbox" className="w-5 h-5 mt-0.5 md:mt-1 rounded border-[#232734] bg-[#12151C] accent-[#7C5CFF]" readOnly />
             <span>Finalize dashboard mobile layout</span>
           </div>
           <div className="flex items-start gap-3">
             <input type="checkbox" className="w-5 h-5 mt-0.5 md:mt-1 rounded border-[#232734] bg-[#12151C] accent-[#7C5CFF]" readOnly />
             <span>Push repository</span>
           </div>
           <div className="flex items-start gap-3 text-[#98A2B3]">
             <span className="w-5 flex justify-center mt-1">-</span>
             <span>Empty list item</span>
           </div>
        </div>

        {/* Desktop inline slash command hint */}
        <div className="hidden md:flex relative mt-8 group items-center gap-2 text-[#98A2B3]">
           <span className="text-[#232734] group-hover:text-[#98A2B3] transition-colors"><Plus className="w-6 h-6" /></span>
           <div>Type &apos;/&apos; for commands</div>
        </div>

        {/* Mobile inline text */}
        <div className="md:hidden mt-8 text-[#98A2B3] text-sm">
           Tap + or type / to add blocks
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <button 
         onClick={() => setBottomSheetOpen(true)}
         className="md:hidden fixed bottom-24 right-4 w-14 h-14 bg-[#7C5CFF] rounded-full shadow-lg shadow-[#7C5CFF]/30 flex items-center justify-center text-white z-30 active:scale-95 transition-transform"
      >
         <Plus className="w-7 h-7" />
      </button>

      {/* Mobile Bottom Sheet for Actions/Commands */}
      {(slashMenuOpen || bottomSheetOpen) && (
         <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/60" onClick={() => { setSlashMenuOpen(false); setBottomSheetOpen(false); }} />
            <div className="relative bg-[#12151C] rounded-t-2xl border-t border-[#232734] p-4 pb-12 animate-in slide-in-from-bottom flex flex-col max-h-[80vh]">
               <div className="w-12 h-1.5 bg-[#232734] rounded-full mx-auto mb-6" />
               <h3 className="text-sm font-semibold text-[#98A2B3] px-2 mb-4">BASIC BLOCKS</h3>
               <div className="space-y-1 overflow-y-auto hide-scrollbar">
                 <button className="w-full flex items-center gap-3 px-3 py-4 hover:bg-[#232734] active:bg-[#232734] rounded-xl text-left">
                    <Type className="w-5 h-5 text-[#F4F7FA]" />
                    <span className="text-base text-[#F4F7FA]">Text</span>
                 </button>
                 <button className="w-full flex items-center gap-3 px-3 py-4 hover:bg-[#232734] active:bg-[#232734] rounded-xl text-left bg-[#232734]/50">
                    <Heading1 className="w-5 h-5 text-[#F4F7FA]" />
                    <span className="text-base text-[#F4F7FA]">Heading 1</span>
                 </button>
                 <button className="w-full flex items-center gap-3 px-3 py-4 hover:bg-[#232734] active:bg-[#232734] rounded-xl text-left">
                    <CheckSquare className="w-5 h-5 text-[#F4F7FA]" />
                    <span className="text-base text-[#F4F7FA]">To-do list</span>
                 </button>
                 <button className="w-full flex items-center gap-3 px-3 py-4 hover:bg-[#232734] active:bg-[#232734] rounded-xl text-left">
                    <ImageIcon className="w-5 h-5 text-[#F4F7FA]" />
                    <span className="text-base text-[#F4F7FA]">Embed Image / Link</span>
                 </button>
                 <button className="w-full flex items-center gap-3 px-3 py-4 hover:bg-[#232734] active:bg-[#232734] rounded-xl text-left">
                    <Code className="w-5 h-5 text-[#F4F7FA]" />
                    <span className="text-base text-[#F4F7FA]">Code Block</span>
                 </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
