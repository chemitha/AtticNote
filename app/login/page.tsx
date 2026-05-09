import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F5F7FA] flex flex-col justify-center items-center px-4 font-sans">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#7C5CFF] rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-[#7C5CFF33]">N</div>
        <span className="text-xl font-bold tracking-tight">NotionFlow</span>
      </Link>
      
      <div className="w-full max-w-md bg-[#181A20] border border-[#2A2E37] p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-[#9CA3AF] text-sm mb-6">Log in to your account</p>
        
        <form className="space-y-4 text-sm">
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium text-[#9CA3AF]">Email</label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="font-medium text-[#9CA3AF]">Password</label>
            <Input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>
          <Button type="button" className="w-full mt-4 font-bold tracking-wider">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
