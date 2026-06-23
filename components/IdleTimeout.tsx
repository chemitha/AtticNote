"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

export default function IdleTimeout() {
  const router = useRouter();
  const isRemembered = useRef<boolean | null>(null);
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const logoutUser = async () => {
      await logoutAction();
      router.push("/login");
    };

    const resetTimer = () => {
      if (!isInitialized.current) return;
      if (isRemembered.current === true) return;

      clearTimeout(timeout);
      timeout = setTimeout(logoutUser, 15 * 60 * 1000);
    };

    const init = async () => {
      try {
        const res = await fetch("/api/session/remember", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          isRemembered.current = data.remember === true;
        } else {
          isRemembered.current = false;
        }
      } catch {
        isRemembered.current = false;
      }

      isInitialized.current = true;
      resetTimer();
    };

    init();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer, true);
    window.addEventListener("touchstart", resetTimer);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer, true);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [router]);

  return null;
}