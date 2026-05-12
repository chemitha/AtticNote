import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import SearchDialog from "@/components/SearchDialog";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full bg-[#0F1115] text-[#F5F7FA] overflow-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <SearchDialog />
    </div>
  );
}
