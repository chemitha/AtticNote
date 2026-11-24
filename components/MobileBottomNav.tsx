"use client";

import React, { useState } from "react";
import { Layout, Search, Star, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import LoadingLink from "./LoadingLink";
import { useSearch } from "@/hooks/use-search";
import { useLoading } from "@/hooks/use-loading";
import { createNoteAction } from "@/app/actions/notes";
import UserAvatar from "./UserAvatar";
import MobileProfileSheet from "./MobileProfileSheet";
import ManageAccountModal from "./ManageAccountModal";
import SwitchWorkspaceModal from "./SwitchWorkspaceModal";
import { WorkspaceSummary } from "@/app/actions/workspaces";

interface MobileBottomNavProps {
  user: any;
  activeWorkspace?: { id: string; name: string; color?: string };
  workspaces?: WorkspaceSummary[];
}

export default function MobileBottomNav({
  user,
  activeWorkspace,
  workspaces = [],
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { openSearch } = useSearch();
  const [creating, setCreating] = useState(false);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [isManageAccountOpen, setIsManageAccountOpen] = useState(false);
  const [isSwitchWorkspaceOpen, setIsSwitchWorkspaceOpen] = useState(false);

  const handleCreate = async () => {
    if (creating) return;
    const { startLoading } = useLoading.getState();
    try {
      startLoading();
      setCreating(true);
      const res = await createNoteAction();
      if (res.success && res.note) {
        router.push(`/dashboard/notes/${res.note.id}`);
      }
    } catch (e) {
      console.error(e);
      useLoading.getState().stopLoading();
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <div className="md:hidden flex fixed bottom-0 left-0 right-0 h-16 border-t border-[#2A2E37] bg-[#0F1115]/95 backdrop-blur-md items-center justify-around px-2 z-40">
        <LoadingLink
          href="/dashboard"
          className={`flex flex-col items-center gap-1 w-14 ${
            pathname === "/dashboard" ? "text-[#F4F7FA]" : "text-[#9CA3AF]"
          }`}
        >
          <Layout className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </LoadingLink>

        <button
          onClick={openSearch}
          className="flex flex-col items-center gap-1 w-14 text-[#9CA3AF] active:text-[#F4F7FA]"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="w-12 h-12 rounded-full bg-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/30 flex items-center justify-center -translate-y-4 active:scale-95 transition-transform disabled:opacity-50"
          aria-label="New Note"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>

        <LoadingLink
          href="/dashboard/favorites"
          className={`flex flex-col items-center gap-1 w-14 ${
            pathname === "/dashboard/favorites" ? "text-[#F4F7FA]" : "text-[#9CA3AF]"
          }`}
        >
          <Star className="w-5 h-5" />
          <span className="text-[10px] font-medium">Favorites</span>
        </LoadingLink>

        <button
          type="button"
          onClick={() => setIsProfileSheetOpen(true)}
          className="flex flex-col items-center gap-1 w-14 text-[#9CA3AF] active:text-[#F4F7FA]"
        >
          <UserAvatar
            name={user?.name}
            avatarUrl={user?.avatar_url}
            avatarColor={user?.avatar_color}
            sizeClass="w-5 h-5"
            textClass="text-[9px]"
          />
          <span className="text-[10px] font-medium">Me</span>
        </button>
      </div>

      <MobileProfileSheet
        isOpen={isProfileSheetOpen}
        onClose={() => setIsProfileSheetOpen(false)}
        user={user}
        activeWorkspace={activeWorkspace}
        onOpenManageAccount={() => setIsManageAccountOpen(true)}
        onOpenSwitchWorkspace={() => setIsSwitchWorkspaceOpen(true)}
      />

      <ManageAccountModal
        isOpen={isManageAccountOpen}
        onClose={() => setIsManageAccountOpen(false)}
        user={user}
      />

      <SwitchWorkspaceModal
        isOpen={isSwitchWorkspaceOpen}
        onClose={() => setIsSwitchWorkspaceOpen(false)}
        workspaces={workspaces}
        activeWorkspaceId={activeWorkspace?.id || ""}
      />
    </>
  );
}
