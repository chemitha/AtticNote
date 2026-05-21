"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useLoading } from "@/hooks/use-loading";

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const { startLoading } = useLoading();

  // Don't render on the dashboard home — that IS the destination
  if (pathname === "/dashboard") return null;

  function handleBack() {
    const segments = pathname.split('/').filter(Boolean);

    // Deterministic hierarchical back navigation
    if (segments.length > 2) {
      // e.g., /dashboard/notes/[id] -> /dashboard/notes
      segments.pop();
      startLoading();
      router.push('/' + segments.join('/'));
    } else {
      // Default fallback
      startLoading();
      router.push("/dashboard");
    }
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="
        md:absolute md:top-6 md:left-6 md:z-10
        fixed top-4 left-4 z-50
        flex items-center justify-center
        p-2
        rounded-full
        bg-[#181A20]/80 backdrop-blur-md
        border border-[#2A2E37]
        text-[#9CA3AF]
        hover:text-white hover:border-[#7C5CFF]/60 hover:bg-[#181A20]
        active:scale-95
        active-black
        transition-all duration-150
        shadow-lg shadow-black/30
        cursor-pointer
        focus:outline-2 focus:outline-offset-2 focus:outline-white/50
      "
    >
      <ChevronLeft className="w-5 h-5 shrink-0" />
    </button>
  );
}
