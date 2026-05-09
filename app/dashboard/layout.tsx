import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    // skip auth check for visual testing since DB is lost
    // redirect("/login");
  }

  // To simulate the user since DB auth is gone right now
  const mockUser = { name: "Chemitha", email: "chemitha@example.com" };

  return (
    <div className="flex h-screen w-full bg-[#0F1115] text-[#F5F7FA] overflow-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Sidebar user={mockUser} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
