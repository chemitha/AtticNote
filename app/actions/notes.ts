"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getAllNotes() {
    const user = await getUser();
    if (!user) return [];
    return prisma.note.findMany({
        where: { user_id: user.id },
        orderBy: { updated_at: 'desc' }
    });
}

export async function getRecentNotes() {
    const user = await getUser();
    if (!user) return [];
    return prisma.note.findMany({
        where: { user_id: user.id },
        orderBy: { updated_at: 'desc' },
        take: 3
    });
}

export async function createNoteAction() {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const note = await prisma.note.create({
        data: {
            title: "Untitled",
            user_id: user.id,
        }
    });

    revalidatePath("/dashboard");
    return { success: true, note };
}

export async function toggleFavoriteAction(noteId: string, isFavorite: boolean) {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");
    
    await prisma.note.update({
        where: { id: noteId, user_id: user.id },
        data: { is_favorite: isFavorite }
    });
    
    revalidatePath("/dashboard");
}

export async function deleteNoteAction(noteId: string) {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    await prisma.note.delete({
        where: { id: noteId, user_id: user.id }
    });

    revalidatePath("/dashboard");
}

export async function duplicateNoteAction(noteId: string) {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const note = await prisma.note.findUnique({
        where: { id: noteId, user_id: user.id },
        include: { blocks: true }
    });

    if (!note) throw new Error("Note not found");

    const newNote = await prisma.note.create({
        data: {
            title: `${note.title} (Copy)`,
            user_id: user.id,
            is_favorite: note.is_favorite,
            blocks: {
                create: note.blocks.map(block => ({
                    type: block.type,
                    content: block.content,
                    position: block.position,
                    parent_block_id: block.parent_block_id
                }))
            }
        }
    });

    revalidatePath("/dashboard");
    return newNote;
}

export async function renameNoteAction(noteId: string, newTitle: string) {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    await prisma.note.update({
        where: { id: noteId, user_id: user.id },
        data: { title: newTitle }
    });

    revalidatePath("/dashboard");
}
