import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { title } = await req.json();

  await prisma.note.update({
    where: { id, user_id: user.id },
    data: { title }
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/notes/${id}`);

  return NextResponse.json({ success: true });
}
