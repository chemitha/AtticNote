"use server";

import { prisma } from "@/lib/prisma";
import { ACTIVE_WORKSPACE_COOKIE, getActiveWorkspace, getUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface WorkspaceSummary {
  id: string;
  name: string;
  color: string;
  is_default: boolean;
  _count: {
    notes: number;
  };
}

export async function getWorkspacesAction(): Promise<{
  workspaces: WorkspaceSummary[];
  activeWorkspaceId: string | null;
}> {
  const user = await getUser();
  if (!user) return { workspaces: [], activeWorkspaceId: null };

  const active = await getActiveWorkspace(user.id);
  const workspaces = await prisma.workspace.findMany({
    where: { user_id: user.id },
    orderBy: [{ is_default: "desc" }, { created_at: "asc" }],
    select: {
      id: true,
      name: true,
      color: true,
      is_default: true,
      _count: { select: { notes: true } },
    },
  });

  return { workspaces, activeWorkspaceId: active.id };
}

export async function createWorkspaceAction(input: {
  name: string;
  color?: string;
}) {
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    const name = input.name?.trim();
    const color = input.color?.trim() || "#7C5CFF";

    if (!name || name.length < 1) {
      return { error: "Workspace name is required" };
    }
    if (name.length > 50) {
      return { error: "Workspace name must be 50 characters or fewer" };
    }

    const workspace = await prisma.workspace.create({
      data: {
        name,
        color,
        is_default: false,
        user_id: user.id,
      },
      select: {
        id: true,
        name: true,
        color: true,
        is_default: true,
        _count: { select: { notes: true } },
      },
    });

    const cookieStore = await cookies();
    cookieStore.set(ACTIVE_WORKSPACE_COOKIE, workspace.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60,
    });

    revalidatePath("/dashboard", "layout");
    return { success: true, workspace };
  } catch (error: any) {
    console.error("Create workspace error:", error);
    return { error: error?.message || "Failed to create workspace" };
  }
}

export async function switchWorkspaceAction(workspaceId: string) {
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
    });

    if (!workspace || workspace.user_id !== user.id) {
      return { error: "Workspace not found or unauthorized" };
    }

    const cookieStore = await cookies();
    cookieStore.set(ACTIVE_WORKSPACE_COOKIE, workspace.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60,
    });

    revalidatePath("/dashboard", "layout");
    return { success: true, workspace };
  } catch (error: any) {
    console.error("Switch workspace error:", error);
    return { error: error?.message || "Failed to switch workspace" };
  }
}

export async function renameWorkspaceAction(input: {
  workspaceId: string;
  name: string;
  color?: string;
}) {
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    const name = input.name?.trim();
    if (!name || name.length < 1) {
      return { error: "Workspace name is required" };
    }
    if (name.length > 50) {
      return { error: "Workspace name must be 50 characters or fewer" };
    }

    const existing = await prisma.workspace.findUnique({
      where: { id: input.workspaceId },
    });
    if (!existing || existing.user_id !== user.id) {
      return { error: "Workspace not found or unauthorized" };
    }

    const workspace = await prisma.workspace.update({
      where: { id: input.workspaceId },
      data: {
        name,
        ...(input.color ? { color: input.color } : {}),
      },
      select: {
        id: true,
        name: true,
        color: true,
        is_default: true,
        _count: { select: { notes: true } },
      },
    });

    revalidatePath("/dashboard", "layout");
    return { success: true, workspace };
  } catch (error: any) {
    console.error("Rename workspace error:", error);
    return { error: error?.message || "Failed to rename workspace" };
  }
}

export async function deleteWorkspaceAction(workspaceId: string) {
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    const workspaces = await prisma.workspace.findMany({
      where: { user_id: user.id },
      orderBy: [{ is_default: "desc" }, { created_at: "asc" }],
    });

    if (workspaces.length <= 1) {
      return { error: "You cannot delete your only remaining workspace" };
    }

    const target = workspaces.find((w) => w.id === workspaceId);
    if (!target) {
      return { error: "Workspace not found or unauthorized" };
    }

    await prisma.workspace.delete({
      where: { id: workspaceId },
    });

    const cookieStore = await cookies();
    const currentActiveId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value;
    let nextActiveId = currentActiveId;

    if (currentActiveId === workspaceId || !workspaces.some((w) => w.id === currentActiveId && w.id !== workspaceId)) {
      const remaining = workspaces.filter((w) => w.id !== workspaceId);
      const nextWorkspace = remaining.find((w) => w.is_default) || remaining[0];
      nextActiveId = nextWorkspace.id;
      cookieStore.set(ACTIVE_WORKSPACE_COOKIE, nextWorkspace.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60,
      });
    }

    revalidatePath("/dashboard", "layout");
    return { success: true, nextActiveId };
  } catch (error: any) {
    console.error("Delete workspace error:", error);
    return { error: error?.message || "Failed to delete workspace" };
  }
}
