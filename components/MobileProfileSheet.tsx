"use client";

interface MobileProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function MobileProfileSheet({ isOpen, onClose, user }: MobileProfileSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Dark Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Bottom Sheet Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111318] border-t border-[#2A2E37] rounded-t-2xl p-5 pb-6 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out flex flex-col text-left">
        
        {/* Pull Handle Indicator */}
        <div className="w-12 h-1 bg-[#2A2E37] rounded-full mx-auto mb-5" />
        
        {/* User Workspace Header */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#2A2E37]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-blue-400 flex items-center justify-center text-white font-medium text-xs">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-[#F5F7FA]">{user?.name || "User"}</p>
            <p className="text-[11px] text-[#9CA3AF] truncate">Personal Workspace</p>
          </div>
        </div>

        {/* Section Label (Matches Workspace Headings) */}
        <div className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest mb-2 px-1">
          Profile Hub (WIP)
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-1.5">
          <button 
            onClick={() => {
              alert("Profile customization is currently under construction!");
              onClose();
            }}
            className="w-full text-left text-sm px-3 py-2.5 text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#F5F7FA] rounded-md transition-colors"
          >
            Manage Account
          </button>
          <button 
            onClick={() => {
              alert("Switching workspaces is a feature in progress!");
              onClose();
            }}
            className="w-full text-left text-sm px-3 py-2.5 text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#F5F7FA] rounded-md transition-colors"
          >
            Switch Workspace
          </button>
        </div>

        {/* Neutral Cancel Button */}
        <button 
          onClick={onClose}
          className="mt-4 w-full text-center text-xs font-medium py-2.5 bg-[#181A20] text-[#9CA3AF] hover:text-[#F5F7FA] rounded-md border border-[#2A2E37] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}