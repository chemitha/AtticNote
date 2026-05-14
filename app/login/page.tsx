"use client";

import Image from "next/image";
import { useState } from "react";
import LoadingLink from "@/components/LoadingLink";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/app/actions/auth";
import { useLoading } from "@/hooks/use-loading";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-[#0F1115] text-[#F5F7FA] flex flex-col justify-center items-center px-4 font-sans">
      <LoadingLink href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
          <Image src="/logo.svg" alt="Attic Logo" width={32} height={32} className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-bold tracking-tight">AtticNote</span>
      </LoadingLink>
      
      <div className="w-full max-w-md bg-[#181A20] border border-[#2A2E37] p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-[#9CA3AF] text-sm mb-6">Log in to your account</p>
        
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium text-[#9CA3AF]">Email</label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="font-medium text-[#9CA3AF]">Password</label>
            <Input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>
          <div className="flex items-center space-x-2 pt-1">
            <input 
              type="checkbox" 
              id="remember" 
              name="remember" 
              className="rounded border-[#2A2E37] bg-[#0F1115] text-[#7C5CFF] focus:ring-[#7C5CFF]"
            />
            <label htmlFor="remember" className="text-sm font-medium text-[#9CA3AF]">
              Remember this device
            </label>
          </div>
          <Button type="submit" className="w-full mt-4 font-bold tracking-wider" disabled={loading}>
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
