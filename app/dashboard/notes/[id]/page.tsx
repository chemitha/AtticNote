import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getNote } from "@/app/actions/notes";
import EditorLoader from "@/components/EditorLoader";
import { prisma } from "@/lib/prisma";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const note = await getNote(resolvedParams.id);
  
  return {
    title: note?.title || "Untitled Note",
  };
}

export default async function NotePage({ params }: Props) {
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
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-10 py-6 md:py-12 relative">
      <div className="hidden md:block">
        <Breadcrumbs noteId={note.id} />
      </div>
      <EditorLoader 
        noteId={note.id} 
        initialTitle={note.title} 
        initialBlocks={blocks} 
        parentId={note.parent?.id}
        parentTitle={note.parent?.title}
      />
    </div>
  );
}
