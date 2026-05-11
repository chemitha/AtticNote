"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createNoteAction() {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  const note = await prisma.note.create({
    data: {
      title: "Untitled",
      user_id: user.id,
    },
  });

  revalidatePath("/dashboard");
  return { success: true, note };
}

export async function deleteNoteAction(noteId: string) {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  await prisma.note.delete({
    where: {
      id: noteId,
      user_id: user.id
    }
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateNoteBannerAction(noteId: string, bannerUrl: string | null) {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  await prisma.note.update({
    where: {
      id: noteId,
      user_id: user.id
    },
    data: {
      banner_url: bannerUrl
    }
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function getRecentNotes() {
  const user = await getUser();
  if (!user) return [];

  return prisma.note.findMany({
    where: { user_id: user.id },
    orderBy: { updated_at: "desc" },
    take: 5
  });
}

export async function getAllNotes() {
  const user = await getUser();
  if (!user) return [];

  return prisma.note.findMany({
    where: { user_id: user.id },
    orderBy: { updated_at: "desc" }
  });
}

export async function getNote(id: string) {
  const user = await getUser();
  if (!user) return null;

  return prisma.note.findUnique({
    where: {
      id,
      user_id: user.id
    }
  });
}

export async function updateNoteTitleAction(noteId: string, title: string) {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  await prisma.note.update({
    where: { id: noteId, user_id: user.id },
    data: { title }
  });
  
  revalidatePath(`/dashboard/${noteId}`);
  revalidatePath("/dashboard");
  return { success: true };
}
