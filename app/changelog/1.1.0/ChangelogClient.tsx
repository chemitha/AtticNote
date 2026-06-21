"use client";

import React from "react";
import Link from "next/link";
import LoadingLink from "@/components/LoadingLink";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Database, 
  FileText, 
  FolderTree, 
  Github, 
  LayoutDashboard, 
  Lock, 
  Sparkles, 
  Settings2,
  Clock,
  Laptop
} from "lucide-react";
import { motion } from "motion/react";

interface ChangelogClientProps {
  user: any;
}

export default function ChangelogClient({ user }: ChangelogClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  } as const;

  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F4F7FA] font-sans selection:bg-[#7C5CFF]/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-[#7C5CFF]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#A890FF]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#232734]/50 backdrop-blur-md bg-[#0B0D12]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <LoadingLink href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-115 flex items-center justify-center bg-[#12151C] border border-[#232734]">
                <Image src="/logo.svg" alt="AtticNote Logo" width={32} height={32} className="w-full h-full object-contain" priority />
              </div>
              <span className="font-semibold text-lg tracking-tight hover:text-[#7C5CFF] transition-colors">AtticNote</span>
            </LoadingLink>
            
            <span className="hidden sm:inline-block text-xs px-2 py-1 rounded bg-[#12151C] border border-[#232734] text-[#98A2B3]">
              Changelog
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <LoadingLink href="/" className="text-[#98A2B3] hover:text-[#F4F7FA] transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Home
            </LoadingLink>
            <LoadingLink 
              href={user ? "/dashboard" : "/login"} 
              className="inline-flex items-center bg-[#7C5CFF] hover:bg-[#684CE6] text-white px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(124,92,255,0.25)]"
            >
              {user ? "Dashboard" : "Log In"} <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
            </LoadingLink>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24 relative z-10">
        
        {/* Release Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16 pb-8 border-b border-[#232734]/40"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151C] border border-[#232734] text-xs font-semibold text-[#7C5CFF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Version 1.1.0 Update</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 leading-tight">
            Core Note Hierarchy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] to-[#A890FF]">Block Storage</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[#98A2B3] text-sm">
            <span>Released: June 21, 2026</span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#232734]" />
            <a 
              href="https://github.com/chemitha/AtticNote/commits" 
              target="_blank" 
              className="hover:text-white transition-colors flex items-center gap-1 hover:underline"
            >
              <Github className="w-4 h-4" /> View Commits
            </a>
          </div>
        </motion.div>

        {/* Change Highlights Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Feature 1: Nestable Sub-Pages */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C5CFF]/10 to-transparent blur-md pointer-events-none" />
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center text-[#7C5CFF] shrink-0">
                <FolderTree className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-semibold text-[#F4F7FA]">Nestable Sub-Pages</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7C5CFF]/20 text-[#A890FF] font-bold uppercase tracking-wider">Major Feature</span>
                </div>
                <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed">
                  You can now create highly structured document hierarchies. Keep notes organized inside parent notes, up to 5 levels deep. Perfect for complex projects, lecture series, or personal wikis.
                </p>
                
                {/* Visual Representation */}
                <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#232734] font-mono text-xs text-[#98A2B3] space-y-2">
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <span className="text-[#7C5CFF]">📁</span> <span>AtticNote Docs (Root)</span>
                  </div>
                  <div className="pl-6 border-l border-[#232734] space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#7C5CFF]">📁</span> <span>Project Setup</span>
                    </div>
                    <div className="pl-6 border-l border-[#232734] flex items-center gap-1.5 text-[#A890FF]">
                      <span>📄</span> <span>Environment variables.md (Level 2 Sub-page)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#7C5CFF]">📁</span> <span>Deployment Guides</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 pt-2 text-xs md:text-sm text-[#F4F7FA]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>Recursive sidebar navigation tree that renders children on-demand (lazy-fetching).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>State persistence: folder expand/collapse state is saved automatically to localStorage.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>Real-time local event listeners sync title updates and deletions instantly across the sidebar tree.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Feature 2: Block Storage API */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C5CFF]/10 to-transparent blur-md pointer-events-none" />
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center text-[#7C5CFF] shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-semibold text-[#F4F7FA]">Persistent Block Storage API</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider">Engine Upgrade</span>
                </div>
                <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed">
                  We integrated a full backend block storage API route that communicates directly with the database to auto-save and fetch the exact editor configuration line-by-line. No more losing content on refresh.
                </p>
                <ul className="space-y-2 pt-2 text-xs md:text-sm text-[#F4F7FA]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>Uses robust, secure server endpoints to handle CRUD operations on notes blocks.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>Fixed a critical bug with block key generation by implementing server-supported randomUUID generation, preventing sudden editor cursor resets.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Feature 3: Redesigned Dashboard Sidebar & Breadcrumbs */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C5CFF]/10 to-transparent blur-md pointer-events-none" />
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center text-[#7C5CFF] shrink-0">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-semibold text-[#F4F7FA]">Improved Sidebar & Breadcrumbs Layout</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold uppercase tracking-wider">UI Refinement</span>
                </div>
                <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed">
                  Navigating large workspaces is now smoother. We redesigned the sidebar layout and introduced a dynamic Breadcrumbs component to provide instant structural context, making it easy to see exactly where your note lives.
                </p>
                <ul className="space-y-2 pt-2 text-xs md:text-sm text-[#F4F7FA]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>Breadcrumbs map out parent folders and sub-pages horizontally above the editor.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>Added interactive hover context menus directly to sidebar items for quick rename, deletion, or favoriting.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Feature 4: Security & Authentication UI */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C5CFF]/10 to-transparent blur-md pointer-events-none" />
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7C5CFF]/10 flex items-center justify-center text-[#7C5CFF] shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-semibold text-[#F4F7FA]">Auth Flow Refinement & Remember Settings</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold uppercase tracking-wider">Security</span>
                </div>
                <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed">
                  We tightened session security and improved user convenience across forms:
                </p>
                <ul className="space-y-2 pt-2 text-xs md:text-sm text-[#F4F7FA]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span><strong>Remember Me Session:</strong> Standard window size reduced to 15 minutes for heightened security, including an active countdown display.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span><strong>Login & Register UI:</strong> Added password visibility toggles, styled custom checkmarks, and structured checkbox bindings.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                    <span>Interactive toggle switches and session logout confirmation popups preventing accidental logouts.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Developer Improvements / Housekeeping */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-[#F4F7FA] mb-4 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#98A2B3]" /> Under the Hood & UI Polish
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-[#98A2B3]">
              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#232734] space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Laptop className="w-4 h-4 text-[#7C5CFF]" /> Responsive Viewports
                </div>
                <p>Configured specific device viewport scalability standards inside next config settings.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#232734] space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Clock className="w-4 h-4 text-[#7C5CFF]" /> Dynamic Headers
                </div>
                <p>Linked the homepage and navbar headers directly back to the dynamic loading system.</p>
              </div>
            </div>
          </motion.section>
        </motion.div>

        {/* Next Goals / Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 text-center p-8 rounded-2xl bg-[#12151C] border border-[#232734] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#7C5CFF]/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl font-bold mb-3">Ready to try the new updates?</h2>
          <p className="text-[#98A2B3] text-sm md:text-base mb-6 max-w-md mx-auto">
            Experience sub-pages, block API saving, and the revamped dashboard right now in your workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LoadingLink 
              href={user ? "/dashboard" : "/register"} 
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#7C5CFF] hover:bg-[#684CE6] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(124,92,255,0.25)]"
            >
              Go to Workspace <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
            </LoadingLink>
            <LoadingLink 
              href="/" 
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0B0D12] border border-[#232734] hover:bg-[#232734] text-[#F4F7FA] px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Back to Home
            </LoadingLink>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="bg-[#0B0D12] border-t border-[#232734] py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#98A2B3] gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="AtticNote Logo" width={20} height={20} />
            <span className="font-semibold text-white">AtticNote</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <p>Built by Chemitha Sathsilu ♥ Open Source</p>
          <div className="flex gap-4">
            <a href="https://github.com/chemitha/AtticNote" target="_blank" className="hover:text-white transition-colors">
              GitHub
            </a>
            <span className="text-[#232734]">•</span>
            <LoadingLink href="/" className="hover:text-white transition-colors">
              Home
            </LoadingLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
