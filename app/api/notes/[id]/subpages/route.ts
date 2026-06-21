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

  // Verify the parent note belongs to the user
  const note = await prisma.note.findUnique({
    where: { id, user_id: user.id }
  });
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const subpages = await prisma.note.findMany({
    where: { parent_id: id, user_id: user.id },
    include: { _count: { select: { subpages: true } } },
    orderBy: { updated_at: "desc" }
  });

  return NextResponse.json(subpages);
}
