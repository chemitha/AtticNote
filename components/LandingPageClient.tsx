"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoadingLink from "./LoadingLink";
import Image from "next/image";
import { ArrowRight, Box, CheckCircle2, Cloud, File, FileText, FolderGit2, Github, HardDrive, Keyboard, Layout, Search, Sparkles, TerminalSquare, UploadCloud, Menu, Link as LinkIcon, Youtube, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LandingPage({ user }: { user: any }) {
  return (
    <div className="min-h-screen bg-[#0B0D12] text-[#F4F7FA] font-sans selection:bg-[#7C5CFF]/30">
      <Navbar user={user} />
      <main>
        <HeroSection user={user} />
        <SocialProof />
        <FeaturesGrid />
        <EditorDemo />
        <IntegrationsSection />
        <WorkflowSection />
        <EmbedSection />
        <KeyboardFirstSection />
        <DashboardPreview />
        <PricingSection />
        <FAQSection />
        <CTASection user={user} />
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ user }: { user: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent transition-all backdrop-blur-md bg-[#0B0D12]/80 data-[scrolled=true]:border-[#232734]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <LoadingLink href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-110 flex items-center justify-center">
              <Image src="/logo.svg" alt="Attic - Digital Backpack" width={32} height={32} className="w-full h-full object-contain" priority />
            </div>
            <span className="font-semibold text-lg tracking-tight">Attic</span>
          </LoadingLink>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#98A2B3]">
            <Link href="#features" className="hover:text-[#F4F7FA] transition-colors">Features</Link>
            <Link href="#integrations" className="hover:text-[#F4F7FA] transition-colors">Integrations</Link>
            <Link href="#pricing" className="hover:text-[#F4F7FA] transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-[#F4F7FA] transition-colors">Docs</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          {!user && (
            <LoadingLink href="/login" className="hidden sm:inline-block text-[#98A2B3] hover:text-[#F4F7FA] transition-colors">Log in</LoadingLink>
          )}
          <LoadingLink href={user ? "/dashboard" : "/register"} className="hidden sm:inline-flex items-center bg-[#F4F7FA] text-[#0B0D12] px-4 py-2 rounded-lg hover:bg-white transition-colors">
            {user ? "Dashboard" : "Get Started"} {user ? <ArrowRight className="w-4 h-4 ml-1 shrink-0" /> : null}
          </LoadingLink>
          <button className="md:hidden text-[#98A2B3] hover:text-[#F4F7FA]">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

const cycleData = [
  {
    label: "Sync Anywhere",
    desc: "Pick up right where you left off.",
    typing: "Connecting to your workspace..."
  },
  {
    label: "Always Accessible",
    desc: "Works on school PCs, libraries, or laptops.",
    typing: "Opening notes in browser..."
  },
  {
    label: "Export Freely",
    desc: "Your notes are never trapped.",
    typing: "Saving to Google Drive..."
  },
  {
    label: "Fast Workflow",
    desc: "Markdown native, designed for speed.",
    typing: "# Today's Tasks"
  }
];

function HeroSection({ user }: { user: any }) {
  const [cycle, setCycle] = useState(0);
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((c) => (c + 1) % cycleData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targetText = cycleData[cycle].typing;
    
    let currentIndex = 0;
    let typeTimer: NodeJS.Timeout;
    
    const startTimer = setTimeout(() => {
      setTypingText("");
      typeTimer = setInterval(() => {
        if (currentIndex <= targetText.length) {
          setTypingText(targetText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeTimer);
        }
      }, 50);
    }, 0);

    return () => {
      clearTimeout(startTimer);
      if (typeTimer) clearInterval(typeTimer);
    };
  }, [cycle]);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7C5CFF]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151C] border border-[#232734] text-xs font-medium text-[#98A2B3] mb-8 relative overflow-hidden">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#7C5CFF]" />
              <div className="relative overflow-hidden w-[140px] h-[18px]">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={cycle}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center whitespace-nowrap"
                  >
                    {cycleData[cycle].label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
              Your personal <br />
              workspace. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFF] to-[#A890FF]">Anywhere.</span>
            </h1>
            
            <div className="relative h-[60px] md:h-[80px] mb-10 max-w-lg overflow-hidden">
               <AnimatePresence initial={false}>
                <motion.p
                  key={cycle}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 text-lg text-[#98A2B3] leading-relaxed"
                >
                  {cycleData[cycle].desc}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <LoadingLink href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#7C5CFF] hover:bg-[#684CE6] text-white px-6 py-3.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(124,92,255,0.3)] hover:shadow-[0_0_30px_rgba(124,92,255,0.5)]">
                Start Writing <ArrowRight className="w-4 h-4" />
              </LoadingLink>
              <Link href="#demo" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#12151C] border border-[#232734] hover:bg-[#232734]/50 text-[#F4F7FA] px-6 py-3.5 rounded-xl font-medium transition-colors">
                View Demo
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#98A2B3]">
              {['Instantly Available', 'Block Editor', 'Lightweight', 'Export Anywhere'].map((feature) => (
                <div key={feature} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
           animate={{ opacity: 1, scale: 1, rotateX: 0 }}
           transition={{ duration: 0.7, delay: 0.2 }}
           style={{ perspective: 1000 }}
           className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-tr from-[#7C5CFF]/30 to-transparent rounded-2xl blur-xl opacity-50" />
          <div className="relative bg-[#12151C] border border-[#232734] rounded-2xl shadow-2xl overflow-hidden shadow-[#000]/50 transform md:-rotate-y-6 md:rotate-x-2">
            {/* Editor TopBar */}
            <div className="h-12 border-b border-[#232734] flex items-center px-4 justify-between bg-[#12151C]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
                <div className="w-3 h-3 rounded-full bg-[#F5BF4F]" />
                <div className="w-3 h-3 rounded-full bg-[#61C554]" />
              </div>
              <div className="flex gap-2 opacity-80">
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#e8eaed] bg-[#000] border border-[#232734] rounded">G-Drive</div>
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#F4F7FA] bg-[#12151C] border border-[#232734] rounded">Notion</div>
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-[#fff] bg-[#7C5CFF] rounded">GitHub</div>
              </div>
            </div>
            {/* Editor Content */}
            <div className="p-8 pb-12 font-sans bg-[#0B0D12]">
              <h2 className="text-3xl font-bold mb-6">Product Roadmap</h2>
              <div className="space-y-3 text-[#E2E8F0]">
                <div className="flex items-start gap-2">
                  <span className="text-[#98A2B3] select-none mt-1">-</span>
                  <p>Dashboard MVP</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#98A2B3] select-none mt-1">-</span>
                  <p>GitHub sync</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#98A2B3] select-none mt-1">-</span>
                  <div className="relative">
                    <p className="border-r-2 border-[#7C5CFF] pr-1 animate-pulse">{typingText}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-3 rounded-lg border border-[#232734] bg-[#12151C] flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#232734] flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-[#98A2B3]" />
                </div>
                <div>
                  <div className="text-sm font-medium">Figma Prototype</div>
                  <div className="text-xs text-[#98A2B3]">figma.com/file/...</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-16 border-y border-[#232734]/50 bg-[#12151C]/30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-[#98A2B3] mb-8 tracking-widest uppercase">
          Built for students, writers, travelers, and anyone who switches devices.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-xl"><Github className="w-6 h-6"/> GitHub</div>
          <div className="flex items-center gap-2 font-bold text-xl"><FileText className="w-6 h-6"/> Markdown</div>
          <div className="flex items-center gap-2 font-bold text-xl"><HardDrive className="w-6 h-6"/> Drive</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Box className="w-6 h-6"/> Notion</div>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    {
      title: "Block-Based Editor",
      desc: "Every line is a block. Rearrange content naturally.",
      icon: <Layout className="w-5 h-5" />
    },
    {
      title: "Lightweight & Fast",
      desc: "No heavy desktop apps. Open a browser and start writing instantly.",
      icon: <TerminalSquare className="w-5 h-5" />
    },
    {
      title: "Export Anywhere",
      desc: "Your notes are never trapped. Push to GitHub, Notion, or Drive.",
      icon: <FolderGit2 className="w-5 h-5" />
    },
    {
      title: "Rich Embeds",
      desc: "Embed PDFs, images, YouTube videos, and links naturally.",
      icon: <LinkIcon className="w-5 h-5" />
    },
    {
      title: "Keyboard Friendly",
      desc: "Designed for speed. Write, format, and search without a mouse.",
      icon: <Keyboard className="w-5 h-5" />
    },
    {
      title: "Find Everything",
      desc: "Instant search across all your notes and blocks.",
      icon: <Search className="w-5 h-5" />
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#0B0D12]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">A complete workspace</h2>
          <p className="text-[#98A2B3] max-w-2xl text-lg">A lightweight digital backpack that follows you across devices.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#12151C] border border-[#232734] hover:border-[#7C5CFF]/30 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#232734] flex items-center justify-center text-[#F4F7FA] mb-4 group-hover:bg-[#7C5CFF] group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorDemo() {
  return (
    <section id="demo" className="py-24 bg-[#12151C]/20 border-y border-[#232734]/50 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7C5CFF]/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl font-semibold mb-12">See it in action</h2>
        
        <div className="bg-[#12151C] rounded-xl border border-[#232734] shadow-2xl text-left overflow-hidden">
          <div className="h-10 bg-[#0B0D12] border-b border-[#232734] flex items-center px-4">
             <div className="text-xs text-[#98A2B3] font-mono">Weekly Planning.md</div>
          </div>
          <div className="p-6 md:p-10 font-sans space-y-4 min-h-[300px]">
             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F4F7FA]">Weekly Planning</h2>
             <div className="flex items-center gap-3 text-base md:text-lg text-[#E2E8F0]">
               <input type="checkbox" className="w-4 h-4 rounded border-[#232734] bg-[#0B0D12] accent-[#7C5CFF]" readOnly />
               <span>Finalize dashboard</span>
             </div>
             <div className="flex items-center gap-3 text-lg text-[#E2E8F0]">
               <input type="checkbox" className="w-4 h-4 rounded border-[#232734] bg-[#0B0D12] accent-[#7C5CFF]" readOnly />
               <span>Upload GitHub export</span>
             </div>
             
             <div className="relative mt-8 group flex items-center gap-2">
                <span className="text-[#232734] group-hover:text-[#98A2B3] transition-colors"><PlusIcon /></span>
                <div className="relative flex-1">
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#12151C] border border-[#232734] rounded-lg shadow-xl p-2 z-20">
                     <div className="text-xs font-semibold text-[#98A2B3] px-2 py-1 mb-1">BASIC BLOCKS</div>
                     <div className="px-2 py-1.5 hover:bg-[#232734] rounded text-sm flex items-center gap-2 cursor-pointer">
                        <TypeIcon /> Text
                     </div>
                     <div className="px-2 py-1.5 hover:bg-[#232734] rounded text-sm flex items-center gap-2 cursor-pointer bg-[#232734]">
                        <HeadingIcon /> Heading 1
                     </div>
                     <div className="px-2 py-1.5 hover:bg-[#232734] rounded text-sm flex items-center gap-2 cursor-pointer">
                        <CheckSquareIcon /> To-do list
                     </div>
                  </div>
                  <div className="text-[#98A2B3]">/h1</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>; }
function TypeIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>; }
function HeadingIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/></svg>; }
function CheckSquareIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>; }


function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 bg-[#0B0D12]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">Ownership and freedom</h2>
          <p className="text-[#98A2B3] max-w-2xl mx-auto text-lg">Your workspace shouldn't feel like a trap. Export anywhere with a single click.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Cloud className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Google Drive</h3>
            <p className="text-[#98A2B3] mb-8 flex-1">Export notes and assets as ZIP archives directly to your Drive.</p>
            <div className="p-4 rounded-lg bg-[#0B0D12] border border-[#232734] shadow-inner text-sm text-[#F4F7FA] flex items-center justify-between">
              <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#98A2B3]"/> note.zip</span>
              <UploadCloud className="w-4 h-4 text-[#7C5CFF]" />
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
              <Box className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Notion</h3>
            <p className="text-[#98A2B3] mb-8 flex-1">Create pages instantly inside your Notion workspace.</p>
            <div className="p-4 rounded-lg bg-[#0B0D12] border border-[#232734] shadow-inner text-sm text-[#F4F7FA] flex items-center justify-between">
              <span className="flex items-center gap-2 border border-[#232734] px-2 py-1 rounded text-xs">Page Created</span>
              <ArrowRight className="w-4 h-4 text-[#98A2B3]" />
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#12151C] border border-[#232734] flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-[#24292e] flex items-center justify-center mb-6">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">GitHub</h3>
            <p className="text-[#98A2B3] mb-8 flex-1">Keep a permanent backup of your notes as markdown files in GitHub.</p>
            <div className="p-4 rounded-lg bg-[#0B0D12] border border-[#232734] shadow-inner text-sm text-[#F4F7FA]">
               <div className="text-xs text-[#98A2B3] mb-2 font-mono">git commit -m</div>
               <div className="flex items-center gap-2 text-sm text-[#7C5CFF]">&quot;Update docs&quot;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="py-24 bg-[#12151C]/20 border-y border-[#232734]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#232734] text-transparent to-transparent -z-10" />
          
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-[#12151C] border-2 border-[#232734] text-[#F4F7FA] flex items-center justify-center text-xl font-bold md:mx-0 mx-auto mb-6 shadow-xl shadow-[#000]">1</div>
            <h3 className="text-xl font-bold mb-3">Write</h3>
            <p className="text-[#98A2B3]">Drop your thoughts instantly without a complex setup or slow loading screens.</p>
          </div>
          
          <div className="relative">
             <div className="w-14 h-14 rounded-full bg-[#12151C] border-2 border-[#7C5CFF] text-[#F4F7FA] flex items-center justify-center text-xl font-bold md:mx-0 mx-auto mb-6 shadow-xl shadow-[#7C5CFF]/20">2</div>
            <h3 className="text-xl font-bold mb-3">Organize</h3>
            <p className="text-[#98A2B3]">Access your organized workspace instantly from any public or private computer.</p>
          </div>

          <div className="relative">
             <div className="w-14 h-14 rounded-full bg-[#12151C] border-2 border-[#232734] text-[#F4F7FA] flex items-center justify-center text-xl font-bold md:mx-0 mx-auto mb-6 shadow-xl shadow-[#000]">3</div>
            <h3 className="text-xl font-bold mb-3">Export</h3>
            <p className="text-[#98A2B3]">You own your data. Send it to GitHub, Drive, or Notion whenever you want.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmbedSection() {
  return (
    <section className="py-24 bg-[#0B0D12]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
           <div className="flex-1 w-full text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-4">Powerful link embedding</h2>
              <p className="text-[#98A2B3] text-lg mb-6 max-w-sm mx-auto md:mx-0">Keep your database light. Embed PDFs, Figma files, YouTube videos, and rich links directly into your notes without uploading large files.</p>
              <div className="space-y-3 max-w-sm mx-auto md:mx-0">
                 <div className="flex items-center gap-3 p-3 bg-[#12151C] rounded-lg border border-[#232734]">
                    <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center"><Youtube className="w-4 h-4 text-red-400" /></div>
                    <div className="flex-1 text-sm font-medium text-left">Product Demo</div>
                    <div className="text-xs text-[#98A2B3]">youtube.com</div>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-[#12151C] rounded-lg border border-[#232734]">
                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-blue-400" /></div>
                    <div className="flex-1 text-sm font-medium text-left">UI Mockup</div>
                    <div className="text-xs text-[#98A2B3]">imgur.com</div>
                 </div>
              </div>
           </div>
           
           <div className="w-full md:w-[400px]">
             <div className="aspect-square rounded-2xl border-2 border-dashed border-[#232734] bg-[#12151C]/50 flex flex-col items-center justify-center p-8 text-center hover:border-[#7C5CFF]/50 transition-colors">
                <div className="w-16 h-16 rounded-full bg-[#232734] flex items-center justify-center mb-6">
                  <LinkIcon className="w-8 h-8 text-[#98A2B3]" />
                </div>
                <h3 className="text-lg font-medium mb-2">Paste any URL</h3>
                <p className="text-sm text-[#98A2B3]">Formats automatically</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function KeyboardFirstSection() {
  return (
    <section className="py-24 bg-[#12151C] border-y border-[#232734]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">A minimalist interface that never slows you down.</h2>
          <p className="text-[#98A2B3] text-lg">Built for speed. Write, structure, and search entirely with your keyboard.</p>
        </div>
        
        <div className="bg-[#0B0D12] rounded-xl border border-[#232734] p-8 shadow-2xl font-mono text-sm">
           <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#232734]/50 hover:bg-[#232734]/10 transition-colors">
                <span className="text-[#98A2B3]">Open commands</span>
                <kbd className="px-2 py-1 rounded bg-[#232734] border border-[#3b4256] text-[#F4F7FA]"> / </kbd>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#232734]/50 hover:bg-[#232734]/10 transition-colors">
                <span className="text-[#98A2B3]">Global Search</span>
                <div className="flex gap-1">
                   <kbd className="px-2 py-1 rounded bg-[#232734] border border-[#3b4256] text-[#F4F7FA]">Ctrl</kbd>
                   <span className="text-[#98A2B3] leading-7">+</span>
                   <kbd className="px-2 py-1 rounded bg-[#232734] border border-[#3b4256] text-[#F4F7FA]"> K </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#232734]/50 hover:bg-[#232734]/10 transition-colors">
                <span className="text-[#98A2B3]">Nest block</span>
                <kbd className="px-2 py-1 rounded bg-[#232734] border border-[#3b4256] text-[#F4F7FA]">Tab</kbd>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#98A2B3]">Bold text</span>
                <div className="flex gap-1">
                   <kbd className="px-2 py-1 rounded bg-[#232734] border border-[#3b4256] text-[#F4F7FA]">Ctrl</kbd>
                   <span className="text-[#98A2B3] leading-7">+</span>
                   <kbd className="px-2 py-1 rounded bg-[#232734] border border-[#3b4256] text-[#F4F7FA]"> B </kbd>
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="py-24 bg-[#0B0D12]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-12">A workspace that gets out of your way</h2>
        
        <div className="rounded-2xl border border-[#232734] bg-[#12151C] overflow-hidden shadow-2xl relative">
          {/* Header */}
          <div className="h-14 border-b border-[#232734] flex items-center px-4 justify-between bg-[#0B0D12]">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded bg-[#7C5CFF]/10 flex items-center justify-center text-[#7C5CFF] font-bold">U</div>
              <div className="font-medium text-sm">User&apos;s Workspace</div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#12151C] border border-[#232734] text-xs text-[#98A2B3] w-64">
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="ml-auto bg-[#232734] px-1.5 rounded">Ctrl+K</kbd>
            </div>
          </div>
          
          {/* Content area mock */}
          <div className="flex flex-col md:flex-row h-[500px] md:h-[400px]">
             {/* Sidebar */}
             <div className="w-56 border-r border-[#232734] bg-[#0B0D12] hidden md:block p-4 space-y-1">
               <div className="text-xs font-semibold text-[#98A2B3] mb-3 mt-2 px-2 tracking-wider">NOTES</div>
               <div className="px-2 py-1.5 text-sm rounded bg-[#232734] text-[#F4F7FA]">📝 All Notes</div>
               <div className="px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3] flex justify-between">
                  <span>📄 Project Alpha</span>
               </div>
               <div className="px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3] flex justify-between">
                  <span>📄 Weekly Meeting</span>
               </div>
               
               <div className="text-xs font-semibold text-[#98A2B3] mb-3 mt-8 px-2 tracking-wider">INTEGRATIONS</div>
               <div className="px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"/> Google Drive
               </div>
               <div className="px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-white"/> Notion
               </div>
               <div className="px-2 py-1.5 text-sm rounded hover:bg-[#232734]/50 text-[#98A2B3] flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500"/> GitHub
               </div>
             </div>
             
             {/* Main */}
             <div className="flex-1 p-6 md:p-8 bg-[#12151C] overflow-hidden text-left relative flex flex-col">
               <h2 className="text-2xl md:text-3xl font-bold mb-6">All Notes</h2>
               
               <div className="space-y-3 flex-1 overflow-y-auto pb-20 md:pb-0 hide-scrollbar">
                 <div className="bg-[#0B0D12] border border-[#232734] p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:border-[#7C5CFF]/30 transition-colors">
                    <div className="flex items-center gap-4">
                       <FileText className="w-5 h-5 text-[#7C5CFF]" />
                       <div>
                         <div className="font-medium text-sm text-[#F4F7FA]">Product Specs — MVP</div>
                         <div className="text-xs text-[#98A2B3]">Last edited 2h ago</div>
                       </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <div className="px-3 py-1 bg-[#12151C] border border-[#232734] text-[10px] uppercase font-bold rounded">G-Drive</div>
                        <div className="px-3 py-1 bg-[#12151C] border border-[#232734] text-[10px] uppercase font-bold rounded">Notion</div>
                        <div className="px-3 py-1 bg-[#7C5CFF] text-[#fff] text-[10px] uppercase font-bold rounded">GitHub</div>
                    </div>
                 </div>

                 <div className="bg-[#0B0D12] border border-[#232734] p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:border-[#232734] transition-colors">
                    <div className="flex items-center gap-4">
                       <FileText className="w-5 h-5 text-[#98A2B3]" />
                       <div>
                         <div className="font-medium text-sm text-[#F4F7FA]">Meeting Notes - Tech</div>
                         <div className="text-xs text-[#98A2B3]">Last edited yesterday</div>
                       </div>
                    </div>
                 </div>
               </div>
               
              <div className="hidden md:flex absolute bottom-8 right-8 w-12 h-12 bg-[#7C5CFF] rounded-full shadow-lg items-center justify-center shadow-[#7C5CFF]/30 cursor-pointer hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
                </svg>
              </div>

               {/* Mobile Bottom Nav */}
               <div className="md:hidden absolute bottom-0 left-0 right-0 h-16 border-t border-[#232734] bg-[#0B0D12]/90 backdrop-blur-md flex items-center justify-around px-4 z-10">
                 <div className="flex flex-col items-center gap-1 text-[#F4F7FA]">
                   <Layout className="w-5 h-5" />
                   <span className="text-[10px]">Home</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 text-[#98A2B3]">
                   <Search className="w-5 h-5" />
                   <span className="text-[10px]">Search</span>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/30 flex items-center justify-center -translate-y-4">  
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
                   </svg>
                 </div>
                 <div className="flex flex-col items-center gap-1 text-[#98A2B3]">
                   <FileText className="w-5 h-5" />
                   <span className="text-[10px]">Notes</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 text-[#98A2B3]">
                   <div className="w-5 h-5 rounded-full bg-[#232734] flex items-center justify-center text-[10px] text-white">U</div>
                   <span className="text-[10px]">Me</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#12151C]/20 border-y border-[#232734]/50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">Early access</h2>
          <p className="text-[#98A2B3] text-lg">
            The app is currently free while in early development. Limitations may apply as we scale.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

          {/* Free */}
          <div className="p-8 rounded-2xl bg-[#0B0D12] border border-[#232734]">
            <h3 className="text-2xl font-bold mb-2">Free</h3>

            <div className="text-3xl font-semibold mb-6">
              $0<span className="text-lg text-[#98A2B3] font-normal">/mo</span>
            </div>

            <p className="text-[#98A2B3] text-sm mb-8 pb-8 border-b border-[#232734]">
              Full access during early access period.
            </p>

            <ul className="space-y-4 mb-8 text-sm text-[#F4F7FA]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                All core features included
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                Markdown export
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                Basic embeds
              </li>

              <li className="flex items-center gap-3 opacity-60">
                <CheckCircle2 className="w-4 h-4 text-[#98A2B3]" />
                Temporary usage limits may apply
              </li>
            </ul>

            <Link
              href="/register"
              className="block w-full py-3 text-center rounded-xl bg-[#12151C] border border-[#232734] hover:bg-[#232734] text-[#F4F7FA] font-medium transition-colors"
            >
              Start for free
            </Link>
          </div>

          {/* Future Pro */}
          <div className="p-8 rounded-2xl bg-[#12151C] border border-[#7C5CFF] relative shadow-[0_0_40px_rgba(124,92,255,0.1)]">

            <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-[#7C5CFF] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              Future
            </div>

            <h3 className="text-2xl font-bold mb-2 text-[#7C5CFF]">
              Pro
            </h3>

            <div className="text-3xl font-semibold mb-6 text-[#98A2B3]">
              Not available yet
            </div>

            <p className="text-[#98A2B3] text-sm mb-8 pb-8 border-b border-[#232734]">
              Will be introduced when scaling infrastructure or adding advanced workflows.
            </p>

            <ul className="space-y-4 mb-8 text-sm text-[#F4F7FA]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                Everything in Free
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                Higher usage limits
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                Advanced integrations
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#7C5CFF]" />
                Performance upgrades
              </li>
            </ul>

            <div className="w-full py-3 text-center rounded-xl bg-[#7C5CFF]/20 text-[#7C5CFF] font-medium border border-[#7C5CFF]/40">
              Coming soon
            </div>
          </div>
        </div>

        {/* Support / Donation */}
        <div className="mt-14 text-center text-sm text-[#98A2B3]">
          This project is currently free and self-funded.
          <a
            href="https://ko-fi.com/sevenplx"
            className="flex items-center justify-center gap-1 text-[#7C5CFF] hover:underline ml-1"
          >
            Support development ♥ <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Is this a Notion replacement?",
      a: "No. Notion is an all-in-one company wiki. Attic is a fast, personal digital backpack meant to be accessed quickly from anywhere."
    },
    {
      q: "Are files supported?",
      a: "To keep things fast and structured, we stick to embeds. Paste links for PDFs, images, videos, and Figma prototypes and they'll render inline automatically."
    },
    {
      q: "Can I sync with GitHub?",
      a: "Yes. Notes can be pushed as markdown commits directly to your configured GitHub repositories."
    },
    {
      q: "Is Markdown supported?",
      a: "Markdown is the native format. The editor supports Markdown shortcuts, and all data is structured as Markdown."
    },
    {
      q: "Does it support collaboration?",
      a: "Not right now. Attic is heavily focused on being a reliable, private, and personal workspace for your own thoughts."
    }
  ];

  return (
    <section className="py-24 bg-[#0B0D12]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-12 text-center">Frequently asked questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-xl bg-[#12151C] border border-[#232734]">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ user }: { user: any }) {
  return (
    <section className="py-32 bg-[#12151C] border-t border-[#232734] relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#7C5CFF]/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold tracking-tight mb-6">Start building your workspace.</h2>
        <p className="text-xl text-[#98A2B3] mb-10">Join thousands of developers turning their thoughts into shipped features.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LoadingLink href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#7C5CFF] hover:bg-[#684CE6] text-white font-medium text-lg transition-colors shadow-xl shadow-[#7C5CFF]/30 flex items-center gap-2">
            {user ? "Dashboard" : "Get Started for Free"} {user ? <ArrowRight className="w-4 h-4" /> : null}
          </LoadingLink>
          <Link href="#" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0B0D12] border border-[#232734] hover:bg-[#232734] text-[#F4F7FA] font-medium text-lg transition-colors flex items-center justify-center gap-2">
            <Github className="w-5 h-5"/> View Source Code
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B0D12] border-t border-[#232734] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center">
              <Image src="/logo.svg" alt="AtticNote Logo" width={24} height={24} className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-[#F4F7FA]">Attic</span>
          </Link>
          <p className="text-sm text-[#98A2B3] max-w-xs">
            A fast, minimal workspace designed for keyboard-first developers and creators.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-[#F4F7FA] mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-[#98A2B3]">
            <li><Link href="#features" className="hover:text-[#7C5CFF] transition-colors">Features</Link></li>
            <li><Link href="#pricing" className="hover:text-[#7C5CFF] transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Roadmap</Link></li>
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Changelog</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="font-semibold text-[#F4F7FA] mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-[#98A2B3]">
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Documentation</Link></li>
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">API Reference</Link></li>
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Integrations</Link></li>
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Help Center</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="font-semibold text-[#F4F7FA] mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-[#98A2B3]">
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-[#7C5CFF] transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 border-t border-[#232734] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#98A2B3]">
        <p>© {new Date().getFullYear()} Attic. All rights reserved.</p>
        <p>Built by <a href="https://github.com/chemitha">Chemitha Sathsilu</a> ♥ Open Source</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
           <Link className="text-[#98A2B3] hover:text-white transition-colors" target="_blank" href="https://www.github.com/chemitha/attic/issues/new">Report Bug</Link>
           <Github className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />

        </div>
      </div>
    </footer>
  );
}
