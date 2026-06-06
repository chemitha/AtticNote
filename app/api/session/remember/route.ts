import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

function decodeToken(token: string) {
  return jwt.decode(token) as { exp?: number; id?: string } | null;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ remember: false, expiresAt: null, expiresInSeconds: 0 });
  }

  const decoded = decodeToken(token);
  const expires = decoded?.exp;

  if (!expires) {
    return NextResponse.json({ remember: false, expiresAt: null, expiresInSeconds: 0 });
  }

  const expiresInSeconds = Math.max(0, Math.floor(expires * 1000 - Date.now()) / 1000);
  
  // Changed condition: If it has more than 15 minutes remaining, it's considered "Remembered" (7 days lifespan)
  const remember = expiresInSeconds > 15 * 60;

  return NextResponse.json({
    remember,
    expiresAt: new Date(expires * 1000).toISOString(),
    expiresInSeconds,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const remember = Boolean(body.remember);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No active session" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Changed standard cutoff: remember = 7 days, fallback = 15 minutes
    const expiresIn = remember ? "7d" : "15m";
    const newToken = signToken({ id: decoded.id }, expiresIn);
    
    // Explicitly setting maxAge so browser deletes the cookie right at the 15-minute mark
    const maxAge = remember ? 7 * 24 * 60 * 60 : 15 * 60;

    cookieStore.set("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge, // Clears local storage/cookies exactly on the expiration marker
    });

    return NextResponse.json({
      remember,
      expiresAt: new Date(Date.now() + (remember ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000)).toISOString(),
      expiresInSeconds: remember ? 7 * 24 * 60 * 60 : 15 * 60,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unable to refresh session" }, { status: 401 });
  }
}