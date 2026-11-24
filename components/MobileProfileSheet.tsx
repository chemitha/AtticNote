"use client";

import { useEffect } from "react";
import { UserCog, Layers, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from "motion/react";
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
  return (
    <AnimatePresence>
      {isOpen && (
        <MobileProfileSheetContent
          onClose={onClose}
          user={user}
          activeWorkspace={activeWorkspace}
          onOpenManageAccount={onOpenManageAccount}
          onOpenSwitchWorkspace={onOpenSwitchWorkspace}
        />
      )}
    </AnimatePresence>
  );
}

function MobileProfileSheetContent({
  onClose,
  user,
  activeWorkspace,
  onOpenManageAccount,
  onOpenSwitchWorkspace,
}: Omit<MobileProfileSheetProps, "isOpen">) {
  const router = useRouter();
  const y = useMotionValue(380);

  // Interconnect overlay opacity & blur directly with sheet vertical position `y`
  const overlayOpacity = useTransform(y, [0, 320], [1, 0]);
  const overlayBlur = useTransform(y, [0, 320], ["blur(4px)", "blur(0px)"]);

  useEffect(() => {
    const controls = animate(y, 0, {
      type: "spring",
      damping: 32,
      stiffness: 360,
      mass: 0.8,
    });
    return () => controls.stop();
  }, [y]);

  const handleLogout = async () => {
    await logoutAction();
    onClose();
    router.push("/login");
    router.refresh();
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 90 || info.velocity.y > 400) {
      onClose();
    } else {
      animate(y, 0, {
        type: "spring",
        damping: 30,
        stiffness: 380,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
      {/* Dark Overlay Backdrop — interconnected with `y` for slide-up, drag, and slide-down */}
      <motion.div
        style={{
          opacity: overlayOpacity,
          backdropFilter: overlayBlur,
          WebkitBackdropFilter: overlayBlur,
        }}
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Bottom Sheet Panel with Physics Drag, Snap-Back & Upward Friction */}
      <motion.div
        exit={{
          y: 380,
          transition: { type: "spring", damping: 34, stiffness: 380 },
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.08, bottom: 0.85 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ y, touchAction: "none" }}
        className="fixed bottom-0 left-0 right-0 bg-[#111318] border-t border-[#2A2E37] rounded-t-2xl p-5 pb-8 shadow-2xl flex flex-col text-left cursor-grab active:cursor-grabbing"
      >
        {/* Pull Handle Indicator */}
        <div className="w-12 h-1.5 bg-[#2A2E37] rounded-full mx-auto mb-5" />

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

        {/* Hidden overflow skirt below the sheet so elastic upward pulls never expose a gap */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-full h-24 bg-[#111318] pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
