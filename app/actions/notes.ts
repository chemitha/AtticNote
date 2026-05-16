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
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note || note.user_id !== user.id) {
      return { error: "Note not found or unauthorized" };
    }

    await prisma.note.delete({
      where: { id: noteId }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Delete note error:", error);
    return { error: error.message || "Failed to delete note" };
  }
}

export async function duplicateNoteAction(noteId: string) {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  const originalNote = await prisma.note.findUnique({
    where: { id: noteId, user_id: user.id },
    include: { blocks: true }
  });

  if (!originalNote) return { error: "Note not found" };

  const duplicatedNote = await prisma.note.create({
    data: {
      title: `${originalNote.title} (Copy)`,
      user_id: user.id,
      banner_url: originalNote.banner_url,
      is_favorite: originalNote.is_favorite,
      blocks: {
        create: originalNote.blocks.map(block => ({
          type: block.type,
          content: block.content,
          position: block.position,
          parent_block_id: block.parent_block_id
        }))
      }
    }
  });

  revalidatePath("/dashboard");
  return { success: true, note: duplicatedNote };
}

export async function updateNoteBannerAction(noteId: string, bannerUrl: string | null) {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note || note.user_id !== user.id) return { error: "Unauthorized" };

  await prisma.note.update({
    where: { id: noteId },
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

export async function toggleFavoriteAction(noteId: string, isFavorite: boolean) {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note || note.user_id !== user.id) return { error: "Unauthorized" };

  await prisma.note.update({
    where: { id: noteId },
    data: { is_favorite: isFavorite }
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/favorites");
  return { success: true };
}

export async function getFavoriteNotes() {
  const user = await getUser();
  if (!user) return [];

  return prisma.note.findMany({
    where: { user_id: user.id, is_favorite: true },
    orderBy: { updated_at: "desc" }
  });
}

export async function updateNoteTitleAction(noteId: string, title: string) {
  const user = await getUser();
  if (!user) return { error: "Unauthorized" };

  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note || note.user_id !== user.id) return { error: "Unauthorized" };

  await prisma.note.update({
    where: { id: noteId },
    data: { title }
  });
  
  revalidatePath(`/dashboard/${noteId}`);
  revalidatePath("/dashboard");
  return { success: true };
}
