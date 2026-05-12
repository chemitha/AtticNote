import { Button } from "@/components/ui/button";

export default function NotePage(props: { params: Promise<{ id: string }> }) {
  return (
    <div className="flex-1 flex flex-col relative w-full h-full text-[#F5F7FA] p-10 max-w-4xl mx-auto">
      <div className="h-48 w-full group relative transition-colors bg-[#181A20] border border-[#2A2E37] rounded-xl flex items-center justify-center -mt-4 mb-10 overflow-hidden group">
         <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
         <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity gap-2 relative z-10">
            Add Cover
         </Button>
      </div>
      
      <input
        type="text"
        defaultValue="Draft Note"
        className="w-full bg-transparent text-4xl font-bold border-none outline-none mb-8 placeholder-[#4B5563] focus:ring-0 text-[#F5F7FA]"
      />
      <div className="text-[#9CA3AF] text-sm">
        <p>Editor instance would be mounted here.</p>
        <p className="mt-4">Type &apos;/&apos; for commands</p>
      </div>
    </div>
  );
}
