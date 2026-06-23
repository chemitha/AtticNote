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
import { Eye, EyeOff, ArrowRightLeft } from "lucide-react";

export default function RegisterPage() {
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
        
        {error && <div className="flex justify-between items-center bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm"><span>{error} </span>
        <a href="/login" className="flex items-center gap-1.5 bg-[#7C5CFF]/15 text-[#7C5CFF] border border-[#7C5CFF]/30 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#7C5CFF]/20 transition-all"><ArrowRightLeft className="w-3.5 h-3.5 rotate-180"></ArrowRightLeft>Login</a> </div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" required placeholder="John Doe" className="bg-black/20 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" className="bg-black/20 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••" className="bg-black/20 border-white/10" />
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
          <Button type="submit" className="w-full bg-[#7C5CFF] hover:bg-[#6A4BE5] text-white mt-4 cursor-pointer" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account? <LoadingLink href="/login" className="text-[#7C5CFF] hover:underline">Log in</LoadingLink>
        </p>
      </div>
      
      <p className="mt-8 text-xs text-gray-500 max-w-sm text-center">
        Security Note: Passwords are securely hashed using bcrypt. This app uses simple authentication without 2FA, allowing login globally from any device.
      </p>
    </div>
  );
}