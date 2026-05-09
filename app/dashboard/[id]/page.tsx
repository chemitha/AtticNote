import { getNote } from "@/app/actions/notes";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Editor from "@/components/Editor";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await getNote(id);

  if (!note) {
    notFound();
  }

  const initialBlocks = await prisma.block.findMany({
    where: { note_id: id },
    orderBy: { position: "asc" }
  });

  return (
    <div className="min-h-full">
      {note.banner_url ? (
        <div className="h-64 w-full relative group">
          <img src={note.banner_url} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Change Cover
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-48 w-full group relative transition-colors hover:bg-white/5 flex items-end px-8 pb-4">
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity gap-2 text-gray-400 hover:text-white">
            <ImageIcon className="h-4 w-4" />
            Add Cover
          </Button>
        </div>
      )}

      <Editor noteId={id} initialBlocks={initialBlocks} initialTitle={note.title} />
    </div>
  );
}
