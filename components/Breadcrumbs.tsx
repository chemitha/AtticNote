"use client";

import { usePathname } from "next/navigation";
import LoadingLink from "./LoadingLink";
import { ChevronRight, Home, FileText, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { getNoteBreadcrumbs } from "@/app/actions/notes";

export default function Breadcrumbs({ noteId }: { noteId: string }) {
  const [crumbs, setCrumbs] = useState<{ id: string; title: string }[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    // Fetch breadcrumb chain
    getNoteBreadcrumbs(noteId).then(setCrumbs);
  }, [noteId, pathname]);

  if (crumbs.length === 0) return null;

  // For responsive design, we might want to collapse middle crumbs if there are many
  const renderCrumbs = () => {
    if (crumbs.length <= 3) {
      return crumbs.map((crumb, idx) => (
        <CrumbItem 
          key={crumb.id} 
          crumb={crumb} 
          isLast={idx === crumbs.length - 1} 
        />
      ));
    }

    // If more than 3, show first, ellipsis, and last two
    return (
      <>
        <CrumbItem crumb={crumbs[0]} isLast={false} />
        <div className="flex items-center text-[#4B5563]">
          <MoreHorizontal className="w-4 h-4 mx-1" />
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
        </div>
        <CrumbItem crumb={crumbs[crumbs.length - 2]} isLast={false} />
        <CrumbItem crumb={crumbs[crumbs.length - 1]} isLast={true} />
      </>
    );
  };

  return (
    <nav className="flex items-center text-xs text-[#9CA3AF] mb-6 overflow-hidden max-w-full">
      <LoadingLink href="/dashboard" className="flex items-center hover:text-[#F5F7FA] transition-colors shrink-0">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span className="hidden sm:inline">Notes</span>
      </LoadingLink>
      
      <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-[#4B5563]" />
      
      {renderCrumbs()}
    </nav>
  );
}

function CrumbItem({ crumb, isLast }: { crumb: { id: string; title: string }, isLast: boolean }) {
  if (isLast) {
    return (
      <div className="flex items-center text-[#F5F7FA] font-medium truncate shrink min-w-[50px]">
        <FileText className="w-3.5 h-3.5 mr-1.5 text-[#7C5CFF]" />
        <span className="truncate">{crumb.title || "Untitled"}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center shrink min-w-[50px] max-w-[150px]">
      <LoadingLink 
        href={`/dashboard/notes/${crumb.id}`}
        className="flex items-center hover:text-[#F5F7FA] transition-colors truncate w-full"
      >
        <FileText className="w-3.5 h-3.5 mr-1.5 shrink-0" />
        <span className="truncate">{crumb.title || "Untitled"}</span>
      </LoadingLink>
      <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-[#4B5563]" />
    </div>
  );
}
