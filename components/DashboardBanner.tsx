"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BannerWithLink } from "@/components/ui/banner";

export default function DashboardBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if user has closed it permanently
    const isClosed = localStorage.getItem("atticnote_changelog_closed") === "true";
    if (isClosed) {
      setIsVisible(false);
      return;
    }

    const viewsStr = localStorage.getItem("atticnote_changelog_views");
    const views = viewsStr ? parseInt(viewsStr, 10) : 0;

    if (views >= 3) {
      setIsVisible(false);
      return;
    }

    const lastPath = localStorage.getItem("atticnote_last_viewed_path");

    if (pathname !== lastPath) {
      const newViews = views + 1;
      localStorage.setItem("atticnote_changelog_views", newViews.toString());
      localStorage.setItem("atticnote_last_viewed_path", pathname);

      if (newViews > 3) {
        setIsVisible(false);
        return;
      }
    }

    setIsVisible(true);
  }, [pathname, mounted]);

  const handleClose = () => {
    localStorage.setItem("atticnote_changelog_closed", "true");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="w-full shrink-0 border-b border-[#2A2E37] sticky top-0 z-40">
      <BannerWithLink onClose={handleClose} />
    </div>
  );
}
