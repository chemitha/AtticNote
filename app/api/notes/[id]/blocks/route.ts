import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  // Verify auth for note
  const note = await prisma.note.findUnique({
    where: { id, user_id: user.id }
  });
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const blocks = await prisma.block.findMany({
    where: { note_id: id },
    orderBy: { position: "asc" }
  });

  return NextResponse.json(blocks);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: { id, user_id: user.id }
  });
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { blocks } = await req.json();

  // Transaction to update all blocks
  await prisma.$transaction(async (tx: any) => {
    // We could delete and recreate for simplicity
    await tx.block.deleteMany({
      where: { note_id: id }
    });

    const data = blocks.map((b: any, index: number) => ({
      id: crypto.randomUUID(),
      note_id: id,
      type: b.type,
      content: JSON.stringify(b),
      position: index,
      parent_block_id: null 
    }));

    if (data.length > 0) {
      // Need to insert one by one or createMany (sqlite supports createMany)
      await tx.block.createMany({ data });
    }
    
    // Update note's updated_at
    await tx.note.update({
      where: { id },
      data: { updated_at: new Date() }
    });
  });

  return NextResponse.json({ success: true });
}
