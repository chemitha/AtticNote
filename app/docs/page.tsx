import React from "react";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { 
  BookOpen, 
  History, 
  Terminal, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  ArrowLeft,
  Sparkles
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Explore the AtticNote developer stack, platform changelogs, architecture guides, and core configuration setups.",
};

// Polished fallback details for known root sections
const sectionRegistry: Record<string, { title: string; desc: string; icon: React.ReactNode }> = {
  changelog: {
    title: "Changelog History",
    desc: "Track platform evolution, system architecture topology shifts, minor feature sprints, and core patch builds.",
    icon: <History className="w-5 h-5 text-[#7C5CFF]" />
  },
  api: {
    title: "API Reference",
    desc: "Integrate with the dynamic block storage engine, manage access tokens, and coordinate automated webhook layers.",
    icon: <Terminal className="w-5 h-5 text-[#7C5CFF]" />
  },
  guides: {
    title: "Core Guides",
    desc: "Step-by-step breakdowns of nestable sub-pages, workspace setups, and data persistence loop options.",
    icon: <BookOpen className="w-5 h-5 text-[#7C5CFF]" />
  }
};

export default async function DocsHubPage() {
  const baseDir = process.cwd();
  let docsDir = path.join(baseDir, "app", "docs");

  // Fallback for src/ app router layouts
  if (!fs.existsSync(docsDir)) {
    docsDir = path.join(baseDir, "src", "app", "docs");
  }

  let docSections: string[] = [];

  try {
    if (fs.existsSync(docsDir)) {
      const items = fs.readdirSync(docsDir, { withFileTypes: true });
      
      docSections = items
        .filter((item) => {
          // Only scan first-level direct folders under /docs
          if (!item.isDirectory()) return false;
          
          // Ignore Next.js internal/special routing folders
          if (item.name.startsWith("(") || item.name.startsWith("_") || item.name.startsWith("[")) return false;
          
          return true;
        })
        .map((item) => item.name);
    }
  } catch (error) {
    // Graceful fallback array if disk read blocks
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F4F7FA] font-sans selection:bg-[#7C5CFF]/30 overflow-x-hidden relative">
      {/* Visual Ambient Backdrops */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-[#7C5CFF]/5 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#A890FF]/3 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#232734]/50 backdrop-blur-md bg-[#0B0D12]/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#12151C] border border-[#232734]">
                <Image src="/logo.svg" alt="AtticNote Logo" width={32} height={32} className="w-full h-full object-contain" priority />
              </div>
              <span className="font-semibold text-lg tracking-tight hover:text-[#7C5CFF] transition-colors">AtticNote</span>
            </Link>
            <span className="text-xs px-2 py-1 rounded bg-[#12151C] border border-[#232734] text-[#98A2B3]">
              Docs Index
            </span>
          </div>
          <Link href="/" className="text-sm font-medium text-[#98A2B3] hover:text-[#F4F7FA] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 relative z-10">
        
        {/* Hub Welcome Banner */}
        <div className="mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Documentation Stack
          </h1>
        </div>

        {/* Dynamic List Stack Layout Grid */}
        <div className="flex flex-col gap-4">
          {docSections.map((section) => {
            // Check lookup dictionary, or auto-generate human text properties on the fly
            const details = sectionRegistry[section] || {
              title: section.charAt(0).toUpperCase() + section.slice(1) + " Manual",
              desc: `Explore dynamic routing resources, configurations, and internal parameters found inside the /docs/${section} tree layout.`,
              icon: <BookOpen className="w-5 h-5 text-[#98A2B3]" />
            };

            return (
              <Link
                key={section}
                href={`/docs/${section}`}
                className="group relative flex items-start gap-5 p-6 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/40 transition-all duration-300 shadow-sm"
              >
                {/* Glowing Overlay Element */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C5CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                {/* Left Side Icon Hex Base */}
                <div className="w-10 h-10 hidden md:flex rounded-xl bg-[#0B0D12] border border-[#232734] group-hover:border-[#7C5CFF]/30 flex items-center justify-center shrink-0 transition-colors">
                  {details.icon}
                </div>

                {/* Center text data context */}
                <div className="flex-1 space-y-1 pr-6">
                  <h2 className="text-lg font-semibold text-[#F4F7FA] group-hover:text-[#A890FF] transition-colors flex items-center gap-2">
                    {details.title}
                  </h2>
                  <p className="text-[#98A2B3] text-xs md:text-sm leading-relaxed max-w-2xl">
                    {details.desc}
                  </p>
                  
                  {/* Internal Clean Path Preview Label */}
                  <div className="pt-2">
                    <code className="text-[11px] font-mono text-[#475467] bg-[#0B0D12]/50 px-1.5 py-0.5 rounded border border-[#232734]/40">
                      ./docs/{section}
                    </code>
                  </div>
                </div>

                {/* Action Arrow Indicator */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#475467] group-hover:text-[#7C5CFF] group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            );
          })}
        </div>

      </main>

      {/* Footer block */}
      <footer className="bg-[#0B0D12] border-t border-[#232734] py-8 absolute bottom-0 w-full">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#98A2B3] gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="AtticNote Logo" width={16} height={16} />
            <span className="font-semibold text-white">AtticNote</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <p>Internal Stack Mapping Engine</p>
        </div>
      </footer>
    </div>
  );
}