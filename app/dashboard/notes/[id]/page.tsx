import { notFound } from "next/navigation";
import { getNote } from "@/app/actions/notes";
import EditorLoader from "@/components/EditorLoader";
import { prisma } from "@/lib/prisma";

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const note = await getNote(resolvedParams.id);

  if (!note) {
    notFound();
  }

  const blocks = await prisma.block.findMany({
    where: { note_id: note.id },
    orderBy: { position: "asc" }
  });

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-10 py-12">
      <EditorLoader noteId={note.id} initialTitle={note.title} initialBlocks={blocks} />
    </div>
  );
}
