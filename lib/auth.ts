import "server-only";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) return null;

    return { id: user.id, name: user.name, email: user.email };
  } catch {
    return null;
  }
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
