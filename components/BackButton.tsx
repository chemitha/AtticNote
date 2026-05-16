"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// --- Internal path helpers ---

const INTERNAL_PREFIXES = [
  "/dashboard/notes",
  "/dashboard/favorites",
  "/dashboard",
];

function isInternalPath(path: string): boolean {
  return INTERNAL_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/")
  );
}

// --- sessionStorage history helpers ---

const HISTORY_KEY = "attic_nav_history";

function readHistory(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeHistory(history: string[]) {
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-15)));
  } catch {
    // sessionStorage unavailable (private browsing edge-cases) — fail silently
  }
}

function pushPath(path: string) {
  const history = readHistory();
  // Avoid consecutive duplicates
  if (history[history.length - 1] === path) return;
  history.push(path);
  writeHistory(history);
}

function getPreviousPath(): string | null {
  const history = readHistory();
  // history[-1] is current, history[-2] is previous
  if (history.length < 2) return null;
  return history[history.length - 2] ?? null;
}

// --- Component ---

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  // Track every route change in sessionStorage
  useEffect(() => {
    pushPath(pathname);
  }, [pathname]);

  // Don't render on the dashboard home — that IS the destination
  if (pathname === "/dashboard") return null;

  function handleBack() {
    const prev = getPreviousPath();

    // 1. Previous path is a known internal route → go back
    if (prev && isInternalPath(prev)) {
      router.back();
      return;
    }

    // 2. Check the browser referrer as a secondary signal
    if (typeof document !== "undefined" && document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (
          ref.origin === window.location.origin &&
          isInternalPath(ref.pathname)
        ) {
          router.back();
          return;
        }
      } catch {
        // Malformed referrer — ignore
      }
    }

    // 3. Fallback: always safe to land on dashboard
    router.push("/dashboard");
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="
        md:hidden
        fixed top-4 left-4 z-50
        flex items-center gap-1.5
        px-3 py-1.5
        rounded-full
        bg-[#181A20]/80 backdrop-blur-md
        border border-[#2A2E37]
        text-[#9CA3AF]
        hover:text-white hover:border-[#7C5CFF]/60 hover:bg-[#181A20]
        active:scale-95
        transition-all duration-150
        shadow-lg shadow-black/30
        text-sm
      "
    >
      <ChevronLeft className="w-4 h-4 shrink-0" />
      <span className="text-xs font-medium leading-none">Back</span>
    </button>
  );
}
