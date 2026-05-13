"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

export default function IdleTimeout() {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const logoutUser = async () => {
      await logoutAction();
      router.push("/login");
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      // 15 minutes idle timeout
      timeout = setTimeout(logoutUser, 15 * 60 * 1000);
    };

    resetTimer();

    // Reset the timer on any user interaction
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
