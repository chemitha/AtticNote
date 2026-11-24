"use client";

import { UserCog, Layers, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { logoutAction } from "@/app/actions/auth";

interface MobileProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  activeWorkspace?: { id: string; name: string; color?: string };
  onOpenManageAccount: () => void;
  onOpenSwitchWorkspace: () => void;
}

export default function MobileProfileSheet({
  isOpen,
  onClose,
  user,
  activeWorkspace,
  onOpenManageAccount,
  onOpenSwitchWorkspace,
}: MobileProfileSheetProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await logoutAction();
    onClose();
    router.push("/login");
    router.refresh();
  };

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
          <UserAvatar
            name={user?.name}
            avatarUrl={user?.avatar_url}
            avatarColor={user?.avatar_color}
            sizeClass="w-9 h-9"
            textClass="text-xs"
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-[#F5F7FA]">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-[#9CA3AF] truncate">
              {activeWorkspace?.name || "Personal Workspace"}
            </p>
          </div>
        </div>

        {/* Section Label */}
        <div className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest mb-2 px-1">
          Profile Hub
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-1.5">
          <button
            onClick={() => {
              onClose();
              onOpenManageAccount();
            }}
            className="w-full flex items-center gap-3 text-left text-sm px-3 py-2.5 text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#F5F7FA] rounded-md transition-colors"
          >
            <UserCog className="w-4 h-4" />
            <span>Manage Account</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenSwitchWorkspace();
            }}
            className="w-full flex items-center gap-3 text-left text-sm px-3 py-2.5 text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#F5F7FA] rounded-md transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Switch Workspace</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-left text-sm px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
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
