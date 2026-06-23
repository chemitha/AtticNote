import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { 
  GitCommit, 
  GitBranch,
  GitPullRequest,
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft 
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog Timeline",
  description: "Browse the dynamic history of updates, features, improvements, and bug fixes for AtticNote.",
};

export default async function ChangelogTimelinePage() {
  const baseDir = process.cwd();
  let changelogDir = path.join(baseDir, "app", "docs", "changelog");
  
  // Fallback for src/ directory layouts if applicable
  if (!fs.existsSync(changelogDir)) {
    changelogDir = path.join(baseDir, "src", "app", "docs", "changelog");
  }

  if (!fs.existsSync(changelogDir)) {
    redirect("/");
  }

  const entries = fs.readdirSync(changelogDir, { withFileTypes: true });

  // 1. Gather all folders that contain an active page.tsx
  const validVersions = entries
    .filter((entry) => {
      if (!entry.isDirectory()) return false;
      if (!/^\d+\.\d+\.\d+$/.test(entry.name)) return false;
      const pagePath = path.join(changelogDir, entry.name, "page.tsx");
      return fs.existsSync(pagePath);
    })
    .map((entry) => entry.name);

  if (validVersions.length === 0) {
    redirect("/");
  }

  // 2. Sort versions descending semantically (e.g., 1.1.1 -> 1.1.0)
  validVersions.sort((a, b) => {
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);
    for (let i = 0; i < 3; i++) {
      if (aParts[i] > bParts[i]) return -1;
      if (aParts[i] < bParts[i]) return 1;
    }
    return 0;
  });

  // Helper to determine semantic weight categories
  const getVersionWeight = (version: string) => {
    const [, minor, patch] = version.split(".").map(Number);
    if (patch > 0) return "patch";
    if (minor > 0) return "minor";
    return "major";
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F4F7FA] font-sans selection:bg-[#7C5CFF]/30 overflow-x-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7C5CFF]/5 blur-[140px] rounded-full pointer-events-none z-0" />

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
              Automated Timeline Engine
            </span>
          </div>
          <Link href="/" className="text-sm font-medium text-[#98A2B3] hover:text-[#F4F7FA] transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </div>
      </header>

      {/* Main Timeline Block */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24 relative z-10">
        
        <div className="text-center md:text-left mb-16 pb-8 border-b border-[#232734]/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151C] border border-[#232734] text-xs font-semibold text-[#7C5CFF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Topology</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Release Tree History
          </h1>
          <p className="text-[#98A2B3] text-sm md:text-base max-w-xl leading-relaxed">
            Direct file-system evaluation mapping architecture logs, build weights, and environmental deployment branches.
          </p>
        </div>

        {/* Dynamic Timeline Layout Wrapper */}
        <div className="relative border-l-2 border-[#232734]/70 ml-4 md:ml-32 space-y-10 pl-6 md:pl-8">
          {validVersions.map((version) => {
            const weight = getVersionWeight(version);
            const pagePath = path.join(changelogDir, version, "page.tsx");

            // --- 3. DYNAMIC DATA HARVESTING ---
            let title = `Version ${version} Release Build`;
            let description = "System refinements, configuration package updates, and routine environment maintenance.";
            let formattedDate = "Recently Deployed";
            
            try {
              // Get accurate file instantiation timestamps natively
              const stats = fs.statSync(pagePath);
              const targetDate = stats.birthtimeMs === 0 ? stats.mtime : stats.birthtime;
              formattedDate = new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              }).format(targetDate);

              // Extract text metadata arrays directly from the file content safely without dynamic script evaluations
              const fileContent = fs.readFileSync(pagePath, "utf-8");
              const titleMatch = fileContent.match(/title:\s*['"`]([^'"`]+)['"`]/);
              const descMatch = fileContent.match(/description:\s*['"`]([\s\S]*?)['"`]/);

              if (titleMatch && titleMatch[1]) title = titleMatch[1];
              if (descMatch && descMatch[1]) description = descMatch[1].replace(/\s+/g, ' ').trim();
            } catch (e) {
              // Fail-safes run silently if parsing catches text irregularities
            }

            // Map visual classifications based on semantic weights
            const styles = {
              major: {
                cardClass: "bg-gradient-to-br from-[#161922] via-[#12151C] to-[#12151C] border-[#7C5CFF]/40 hover:border-[#7C5CFF]/80 p-8 shadow-[0_0_35px_rgba(124,92,255,0.08)]",
                indentClass: "ml-0",
                icon: <Sparkles className="w-5 h-5 text-[#A890FF]" />,
                dotContainer: "-left-[31px] md:-left-[39px] bg-[#7C5CFF]/20 border border-[#7C5CFF]/50 p-1.5 text-[#7C5CFF]",
                titleClass: "text-xl md:text-2xl font-bold text-white tracking-tight",
                badgeClass: "bg-[#7C5CFF] text-white text-xs font-extrabold uppercase px-2.5 py-1",
                tags: ["Major Architecture"]
              },
              minor: {
                cardClass: "bg-[#12151C] border-[#232734] hover:border-[#7C5CFF]/40 p-6 shadow-sm",
                indentClass: "ml-0",
                icon: <GitBranch className="w-4 h-4 text-[#7C5CFF]" />,
                dotContainer: "-left-[29px] md:-left-[37px] bg-[#12151C] border border-[#232734] p-1.5 text-[#98A2B3] group-hover:text-[#7C5CFF]",
                titleClass: "text-lg md:text-xl font-semibold text-[#F4F7FA]",
                badgeClass: "bg-[#7C5CFF]/10 text-[#A890FF] border border-[#7C5CFF]/20 text-xs font-bold px-2 py-0.5",
                tags: ["Feature Update"]
              },
              patch: {
                cardClass: "bg-[#12151C]/40 border-[#232734]/50 hover:border-[#232734] p-4 shadow-none",
                indentClass: "ml-2 md:ml-8 scale-[0.97] origin-left opacity-85 hover:opacity-100",
                icon: <GitPullRequest className="w-3.5 h-3.5 text-[#475467]" />,
                dotContainer: "-left-[23px] md:-left-[31px] bg-[#0B0D12] p-1 text-[#475467] group-hover:text-[#98A2B3]",
                titleClass: "text-base font-medium text-[#D0D5DD]",
                badgeClass: "bg-[#232734]/60 text-[#98A2B3] text-[11px] font-mono px-1.5 py-0.25",
                tags: ["Patch Fix"]
              }
            }[weight];

            return (
              <div key={version} className={`relative group transition-all duration-300 ${styles.indentClass}`}>
                
                {/* Visual Connection Node */}
                <div className={`absolute top-2.5 rounded-full z-20 transition-colors duration-300 ${styles.dotContainer}`}>
                  {styles.icon}
                </div>

                {/* Left Absolute Sidebar for Desktop (Hidden on small patches to maximize clarity) */}
                {weight !== "patch" && (
                  <div className="hidden md:block absolute -left-40 top-3.5 w-28 text-right">
                    <span className={`rounded-full tracking-wide ${styles.badgeClass}`}>
                      v{version}
                    </span>
                    <div className="text-[11px] text-[#98A2B3] mt-2.5 flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3" /> {formattedDate.split(",")[0]}
                    </div>
                  </div>
                )}

                {/* Version Card Link */}
                <Link 
                  href={`/docs/changelog/${version}`}
                  className={`block rounded-2xl border transition-all duration-300 relative overflow-hidden group/card ${styles.cardClass}`}
                >
                  <div className="space-y-3">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {(weight === "patch" || typeof window === "undefined") && (
                        <span className={`rounded font-mono ${styles.badgeClass}`}>
                          v{version}
                        </span>
                      )}
                      <span className="text-xs text-[#98A2B3] font-medium">
                        {weight === "patch" ? `— Deployed: ${formattedDate}` : `• ${formattedDate}`}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h2 className={`transition-colors leading-snug ${styles.titleClass} group-hover/card:text-[#A890FF]`}>
                        {title}
                      </h2>
                      <ChevronRight className="w-4 h-4 text-[#475467] group-hover/card:text-[#7C5CFF] group-hover/card:translate-x-1 transition-all shrink-0 mt-1.5" />
                    </div>

                    <p className={`text-[#98A2B3] leading-relaxed max-w-3xl ${weight === "patch" ? "text-xs" : "text-sm"}`}>
                      {description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                      {styles.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[10px] px-2 py-0.5 rounded bg-[#232734]/30 border border-[#232734]/60 text-[#98A2B3]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#0B0D12] border-t border-[#232734] py-8 absolute bottom-0 w-full">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#98A2B3] gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="AtticNote Logo" width={16} height={16} />
            <span className="font-semibold text-white">AtticNote</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <p>Built Open Source</p>
        </div>
      </footer>
    </div>
  );
}