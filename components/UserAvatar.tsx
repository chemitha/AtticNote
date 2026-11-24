"use client";

import { useState } from "react";

export const AVATAR_GRADIENTS: { id: string; label: string; className: string }[] = [
  { id: "violet", label: "Violet", className: "from-[#7C5CFF] to-blue-400" },
  { id: "emerald", label: "Emerald", className: "from-emerald-500 to-teal-400" },
  { id: "amber", label: "Amber", className: "from-amber-500 to-orange-400" },
  { id: "rose", label: "Rose", className: "from-rose-500 to-pink-400" },
  { id: "cyan", label: "Cyan", className: "from-cyan-500 to-indigo-500" },
  { id: "slate", label: "Slate", className: "from-slate-600 to-zinc-400" },
];

export function getAvatarGradientClass(colorId?: string | null) {
  return AVATAR_GRADIENTS.find((g) => g.id === colorId)?.className || AVATAR_GRADIENTS[0].className;
}

interface UserAvatarProps {
  name?: string | null;
  avatarUrl?: string | null;
  avatarColor?: string | null;
  sizeClass?: string;
  textClass?: string;
}

export default function UserAvatar({
  name,
  avatarUrl,
  avatarColor,
  sizeClass = "w-8 h-8",
  textClass = "text-xs",
}: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initial = (name?.trim()?.charAt(0) || "U").toUpperCase();
  const gradientClass = getAvatarGradientClass(avatarColor);

  if (avatarUrl && !imgError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name || "User avatar"}
        onError={() => setImgError(true)}
        className={`${sizeClass} rounded-full object-cover border border-[#2A2E37] shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-tr ${gradientClass} flex items-center justify-center text-white font-medium ${textClass} shrink-0`}
    >
      {initial}
    </div>
  );
}
