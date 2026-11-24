import "server-only";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export const ACTIVE_WORKSPACE_COOKIE = "active_workspace_id";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  avatar_color: string | null;
}

export async function getUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar_url: true,
        avatar_color: true,
      },
    });

    if (!user) return null;

    return user;
  } catch {
    return null;
  }
}

export async function getActiveWorkspace(userId: string) {
  let workspaces = await prisma.workspace.findMany({
    where: { user_id: userId },
    orderBy: [{ is_default: "desc" }, { created_at: "asc" }],
  });

  if (workspaces.length === 0) {
    const defaultWorkspace = await prisma.workspace.create({
      data: {
        name: "Personal Workspace",
        color: "#7C5CFF",
        is_default: true,
        user_id: userId,
      },
    });
    workspaces = [defaultWorkspace];
  }

  const fallbackWorkspace = workspaces.find((w) => w.is_default) || workspaces[0];

  // Backfill any legacy notes created before workspaces existed
  await prisma.note.updateMany({
    where: { user_id: userId, workspace_id: null },
    data: { workspace_id: fallbackWorkspace.id },
  });

  const cookieStore = await cookies();
  const activeId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value;
  const active = activeId ? workspaces.find((w) => w.id === activeId) : undefined;

  return active || fallbackWorkspace;
}

export function signToken(payload: object, expiresIn: string | number = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
