"use client";

import Image from "next/image";
import LoadingLink from "./LoadingLink";
import { usePathname, useRouter } from "next/navigation";
import { Home, FileText, Settings, LogOut, Star } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { GoogleDriveIcon, NotionIcon, GitHubIcon } from "@/components/Icons";
import { useLoading } from "@/hooks/use-loading";
import { useState, useEffect, useRef } from "react";

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [rememberEnabled, setRememberEnabled] = useState(false);
  const [rememberExpiresIn, setRememberExpiresIn] = useState(0);
  const [rememberLoading, setRememberLoading] = useState(false);
  const [rememberError, setRememberError] = useState<string | null>(null);

  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const loadRememberState = async () => {
    setRememberLoading(true);
    setRememberError(null);

    try {
      const response = await fetch("/api/session/remember");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to load remember state");
      }
      setRememberEnabled(Boolean(data.remember));
      setRememberExpiresIn(Math.max(0, Math.floor(data.expiresInSeconds ?? 0)));
    } catch (error: any) {
      setRememberError(error?.message || "Unable to load remember settings");
    } finally {
      setRememberLoading(false);
    }
  };

  useEffect(() => {
    if (!isSettingsOpen) return;
    loadRememberState();
  }, [isSettingsOpen]);

  useEffect(() => {
    if (rememberExpiresIn <= 0) return;
    const interval = setInterval(() => {
      setRememberExpiresIn((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [rememberExpiresIn]);

  const updateRemember = async (checked: boolean) => {
    setRememberLoading(true);
    setRememberError(null);
    
    // Optimistic UI update so switch is instantly snappy
    setRememberEnabled(checked);

    try {
      const response = await fetch("/api/session/remember", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remember: checked }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to update remember settings");
      }
      setRememberEnabled(Boolean(data.remember));
      setRememberExpiresIn(Math.max(0, Math.floor(data.expiresInSeconds ?? 0)));
    } catch (error: any) {
      // Rollback if network fails
      setRememberEnabled(!checked);
      setRememberError(error?.message || "Unable to update remember settings");
    } finally {
      setRememberLoading(false);
    }
  };

  async function handleLogout() {
    const { startLoading } = useLoading.getState();
    startLoading();
    await logoutAction();
    router.push("/");
  }

  const handleFeatureMockClick = (featureName: string) => {
    if (featureName === "Settings") {
      alert("Account settings and advance preferences are being updated. Check back soon!");
    } else {
      alert(`${featureName} integration coming soon!`);
    }
  };

  return (
    <aside className="w-64 bg-[#111318] border-r border-[#2A2E37] hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <LoadingLink href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
            <Image src="/logo.svg" alt="AtticNote - Digital Backpack" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <span className="font-semibold text-lg tracking-tight">AtticNote</span>
        </LoadingLink>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-widest mb-2 px-2">Workspace</div>
        <div className="space-y-1">
          <NavLink href="/dashboard" icon={<Home className="w-4 h-4" />} active={pathname === "/dashboard"}>Home</NavLink>
        </div>
        
        <div className="pt-2">
          <div className="space-y-1">
            <NavLink href="/dashboard/notes" icon={<FileText className="w-4 h-4" />} active={pathname.startsWith("/dashboard/notes")}>Notes</NavLink>
            <NavLink href="/dashboard/favorites" icon={<Star className="w-4 h-4" />} active={pathname === "/dashboard/favorites"}>Favorites</NavLink>
          </div>
        </div>

        <div className="pt-6">
          <p className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-widest mb-2 px-2">Integrations</p>
          <div className="space-y-1">
            <div 
              onClick={() => handleFeatureMockClick("Google Drive")}
              className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group"
            >
              <GoogleDriveIcon className="w-4 h-4" />
              <span className="text-sm">Google Drive</span>
            </div>
            <div 
              onClick={() => handleFeatureMockClick("Notion")}
              className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group"
            >
              <NotionIcon className="w-4 h-4" />
              <span className="text-sm">Notion</span>
            </div>
            <div 
              onClick={() => handleFeatureMockClick("GitHub")}
              className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer group"
            >
              <GitHubIcon className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-[#2A2E37] space-y-2">
        <div 
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md cursor-pointer text-sm"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
        
        <button 
          onClick={() => setIsLogoutConfirmOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-red-500/10 hover:text-red-400 rounded-md cursor-pointer text-sm transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        <div ref={profileRef} className="relative pt-2">
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[#111318] border border-[#2A2E37] rounded-xl p-3 shadow-2xl animate-in slide-in-from-bottom-2 duration-150 z-40">
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-widest px-2">
                  Profile Hub
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#7C5CFF20] text-[#7C5CFF] font-bold tracking-wider uppercase rounded-full border border-[#7C5CFF]/20">
                  WIP
                </span>
              </div>
              <hr className="my-3 w-full border-[#2A2E37]" />
              <div className="space-y-1.5">
                <button 
                  onClick={() => alert("Profile customization is currently under construction!")}
                  className="w-full text-left text-xs px-2.5 py-2 text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#F5F7FA] rounded-md transition-colors"
                >
                  Manage Account
                </button>
                <button 
                  onClick={() => alert("Switching workspaces is a feature in progress!")}
                  className="w-full text-left text-xs px-2.5 py-2 text-[#9CA3AF] hover:bg-[#181A20] hover:text-[#F5F7FA] rounded-md transition-colors"
                >
                  Switch Workspace
                </button>
              </div>
            </div>
          )}

          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 px-3 py-2 bg-[#7C5CFF15] hover:bg-[#7C5CFF25] transition-colors rounded-xl cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-blue-400 flex items-center justify-center text-white font-medium text-xs">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate text-[#F5F7FA]">{user?.name || "User"}</p>
              <p className="text-[10px] text-[#9CA3AF] truncate">Personal Workspace</p>
            </div>
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <div 
          onClick={() => setIsSettingsOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#111318] border border-[#2A2E37] w-full max-w-md rounded-xl p-6 shadow-2xl text-left cursor-default"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-[#F5F7FA]">Workspace Settings</h3>
              <span className="text-[10px] px-2 py-0.5 bg-[#7C5CFF20] text-[#7C5CFF] font-bold tracking-wider uppercase rounded-full border border-[#7C5CFF]/20">
                WIP
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] mb-6">Manage your account preferences and application layout.</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-[#181A20] border border-[#2A2E37] rounded-lg">
                <span className="text-sm text-[#9CA3AF]">Dark Mode</span>
                <span className="text-xs px-2 py-1 bg-[#7C5CFF20] text-[#7C5CFF] font-medium rounded">Active</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#181A20] border border-[#2A2E37] rounded-lg opacity-50">
                <span className="text-sm text-[#9CA3AF]">Export Data (JSON)</span>
                <span className="text-xs text-[#9CA3AF]">Unavailable</span>
              </div>
              
              <div className="p-3 bg-[#181A20] border border-[#2A2E37] rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label htmlFor="remember-toggle" className="text-sm text-gray-400 cursor-pointer select-none">
                      Remember this device
                    </label>
                    <span className="text-xs font-mono text-[#7C5CFF] bg-[#7C5CFF]/10 px-2 py-0.5 rounded-full">
                      {rememberLoading && rememberExpiresIn === 0
                        ? "syncing..."
                        : rememberExpiresIn > 0
                        ? formatDuration(rememberExpiresIn)
                        : "session status"}
                    </span>
                  </div>
                  
                  {/* Fixed Switch Wrapper with relative positioning context */}
                  <div className="relative inline-flex items-center h-5 w-9 cursor-pointer">
                    <input
                      type="checkbox"
                      id="remember-toggle"
                      name="remember-toggle"
                      className="sr-only peer"
                      checked={rememberEnabled}
                      onChange={(event) => updateRemember(event.target.checked)}
                      disabled={rememberLoading}
                    />
                    <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all duration-200 peer-checked:bg-[#7C5CFF] peer-checked:after:translate-x-full peer-checked:after:bg-white"></div>
                  </div>
                </div>
                {rememberError && <p className="mt-2 text-[10px] text-red-400 font-medium">{rememberError}</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 bg-[#7C5CFF] hover:bg-[#6b4ce6] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isLogoutConfirmOpen && (
        <div 
          onClick={() => setIsLogoutConfirmOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#111318] border border-[#2A2E37] w-full max-w-sm rounded-xl p-6 shadow-2xl text-left cursor-default"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-[#F5F7FA]">Confirm Logout</h3>
              <span className="text-[10px] px-2 py-0.5 bg-[#FF5C5C20] text-[#FF5C5C] font-bold tracking-wider uppercase rounded-full border border-[#FF5C5C]/20">
                Warning
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] mb-6">You are about to end your current session. This action will sign you out immediately.</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="px-4 py-2 text-[#9CA3AF] border border-[#2A2E37] rounded-lg transition-colors hover:bg-[#181A20] cursor-pointer text-xs font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsLogoutConfirmOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-[#FF5C5C] hover:bg-[#e04848] text-white rounded-lg transition-colors cursor-pointer text-xs font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function NavLink({ href, icon, children, active }: { href: string, icon: React.ReactNode, children: React.ReactNode, active: boolean }) {
  const { startLoading } = useLoading.getState();
  
  const handleClick = () => {
    if (!active) startLoading();
  };

  if (active) {
    return (
      <LoadingLink href={href} onClick={handleClick} className="flex items-center gap-3 px-3 py-2 bg-[#181A20] text-[#F5F7FA] rounded-md border border-[#2A2E37] text-sm">
        {icon}
        <span>{children}</span>
      </LoadingLink>
    );
  }
  return (
    <LoadingLink href={href} onClick={handleClick} className="flex items-center gap-3 px-3 py-2 text-[#9CA3AF] hover:bg-[#181A20] rounded-md transition-colors text-sm">
      {icon}
      <span>{children}</span>
    </LoadingLink>
  );
}