"use client";

import Image from "next/image";
import { useState } from "react";
import LoadingLink from "@/components/LoadingLink";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/app/actions/auth";
import { useLoading } from "@/hooks/use-loading";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { startLoading, stopLoading } = useLoading.getState();
    startLoading();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res.error) {
      setError(res.error);
      stopLoading();
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F5F7FA] flex flex-col justify-center items-center px-4">
      <LoadingLink href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
          <Image src="/logo.svg" alt="AtticNote Logo" width={32} height={32} className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-bold tracking-tight">AtticNote</span>
      </LoadingLink>
      
      <div className="w-full max-w-md bg-[#181A20] border border-white/5 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6">Welcome back</h1>
        
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="you@example.com" 
              className="bg-black/20 border-white/10" 
              />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••" 
                className="bg-black/20 border-white/10" 
              />
              <Button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 !bg-transparent p-3 center rounded-full hover:text-white"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                aria-label="Show Password"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          <label htmlFor="remember" className="flex items-center space-x-3 pt-1 cursor-pointer select-none">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="peer appearance-none w-4 h-4 rounded bg-white/5 hover:bg-white/10 checked:bg-[#7C5CFF]/50 transition-colors cursor-pointer"
              />
              <svg
                className="absolute w-3 h-3 text-[#FAFAFA] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-gray-400 peer-checked:text-white cursor-pointer transition-colors">Remember this device</span>
          </label>
          
          <Button type="submit" className="w-full bg-[#7C5CFF] hover:bg-[#6A4BE5] text-white mt-4 cursor-pointer" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account? <LoadingLink href="/register" className="text-[#7C5CFF] hover:underline">Register</LoadingLink>
        </p>
      </div>
    </div>
  );
}