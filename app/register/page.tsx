"use client";

import Image from "next/image";
import { useState } from "react";
import LoadingLink from "@/components/LoadingLink";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/app/actions/auth";
import { useLoading } from "@/hooks/use-loading";
import { Box } from "lucide-react";

export default function RegisterPage() {
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
    const res = await registerAction(formData);

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
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>
        
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" required className="bg-black/20 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="bg-black/20 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required className="bg-black/20 border-white/10" />
          </div>
          <Button type="submit" className="w-full bg-[#7C5CFF] hover:bg-[#6A4BE5] text-white mt-4" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account? <LoadingLink href="/login" className="text-[#7C5CFF] hover:underline">Log in</LoadingLink>
        </p>
      </div>
      
      <p className="mt-8 text-xs text-gray-500 max-w-sm text-center">
        Security Note: Passwords are securely hashed using bcrypt. This MVP uses simple authentication without 2FA, allowing login globally from any device.
      </p>
    </div>
  );
}
