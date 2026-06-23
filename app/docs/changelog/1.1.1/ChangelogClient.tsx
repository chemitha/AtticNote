"use client";

import React from "react";
import LoadingLink from "@/components/LoadingLink";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Github, 
  Sparkles, 
  Settings2,
  Clock,
  Laptop,
  ShieldCheck,
  Globe,
  Layers
} from "lucide-react";
import { motion } from "motion/react";

interface ChangelogClientProps {
  user: any; // Consider replacing 'any' with your actual User type if available
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
            <span>Version 1.1.1 Update</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 leading-tight">
            Domain Migration, Session Fixes & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] to-[#A890FF]">UI Polish</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-[#98A2B3] text-sm">
            <span>Released: June 23, 2026</span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#232734]" />
            <a 
              href="https://github.com/chemitha/AtticNote/commits" 
              target="_blank" 
              rel="noreferrer"
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
          {/* Feature 1: Custom Domain & Routing Migration */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C5CFF]/10 to-transparent blur-md pointer-events-none" />
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-semibold text-[#F4F7FA]">Custom Domain Migration & Documentation Base</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7C5CFF]/20 text-[#A890FF] font-bold uppercase tracking-wider">Infrastructure</span>
              </div>
              <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed">
                We officially moved production from the default Vercel domain over to our unified home at <code className="text-[#A890FF] bg-[#0B0D12] px-1.5 py-0.5 rounded text-xs font-mono">atticnote.chemitha.com</code>. Along with this branding step, we structured our metadata patterns and updated sitemaps to map clean paths under a uniform layout.
              </p>
              <ul className="space-y-2 pt-2 text-xs md:text-sm text-[#F4F7FA]">
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                  <span>Migrated SEO structural routes, canonical URLs, and documentation paths under a shared structure.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                  <span>Re-routed the system changelog path under a standardized directory structure layout (<code className="text-xs font-mono text-[#98A2B3]">/docs/changelog/1.1.0</code>).</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Feature 2: Idle Timeout Bug Fix */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C5CFF]/10 to-transparent blur-md pointer-events-none" />
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-semibold text-[#F4F7FA]">Smart Idle Timeout Coordination</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider">Bug Fix</span>
              </div>
              <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed">
                Resolved an issue where client-side activity listeners prematurely destroyed active sessions. The system now cross-references the server layout state cleanly on initialization, ensuring long-term 7-day tokens remain fully intact.
              </p>
              <ul className="space-y-2 pt-2 text-xs md:text-sm text-[#F4F7FA]">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                  <span>Implemented gated references on component mount to securely intercept layout states prior to running listener loops.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                  <span>Retains the strict 15-minute screen-wiping cleanup system on shared viewports while fully ignoring timers when "Remember Me" configurations are detected.</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Feature 3: Form Flows & User UX Fixes */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7C5CFF]/10 to-transparent blur-md pointer-events-none" />
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl md:text-2xl font-semibold text-[#F4F7FA]">Error Card Redirection & Landing Tweak</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold uppercase tracking-wider">UI Refinement</span>
              </div>
              <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed">
                Polished form flows by enhancing error contextual layouts. Registration views now feature active action anchors directly alongside error states, saving clicks if an email is already occupied.
              </p>
              <ul className="space-y-2 pt-2 text-xs md:text-sm text-[#F4F7FA]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                  <span>Added an inline quick-link redirect action to log in directly inside duplicate user warnings.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7C5CFF] shrink-0" />
                  <span>Optimized layout responsiveness on the landing workspace for smaller screens.</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Housekeeping Section */}
          <motion.section variants={itemVariants} className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-all duration-300">
            <h3 className="text-lg font-semibold text-[#F4F7FA] mb-4 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#98A2B3]" /> Under the Hood Improvements
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm text-[#98A2B3]">
              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#232734] space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Layers className="w-4 h-4 text-[#7C5CFF]" /> Dynamic Docs Stack & Timelines
                </div>
                <p>Introduced an automated root documentation portal and weighted, git-style nested version logs that analyze the project filesystem natively to eliminate manual tracking overhead.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#232734] space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Laptop className="w-4 h-4 text-[#7C5CFF]" /> Theme-Matched Scrollbars
                </div>
                <p>Standardized cross-browser scrollbars in global configurations to utilize a solid pitch-black layout backdrop rather than default transparent rules.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#232734] space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Clock className="w-4 h-4 text-[#7C5CFF]" /> Clear Banner Scaling
                </div>
                <p>Refactored the dashboard banners to collapse fluidly inside constrained viewing screens, preventing overflow text clip issues.</p>
              </div>
            </div>
          </motion.section>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 text-center p-8 rounded-2xl bg-[#12151C] border border-[#232734] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#7C5CFF]/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl font-bold mb-3">Explore Workspace Updates</h2>
          <p className="text-[#98A2B3] text-sm md:text-base mb-6 max-w-md mx-auto">
            Experience the new custom domain routing, secure session stability, and UI improvements right now.
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
            <a href="https://github.com/chemitha/AtticNote" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <span className="text-[#232734]">•</span>
            <LoadingLink href="/docs/changelog/1.1.0" className="hover:text-white transition-colors">
              Changelog
            </LoadingLink>
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