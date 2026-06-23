"use server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const rawEmail = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !rawEmail || !password) {
      return { error: "All fields are required" };
    }

    const email = rawEmail.toLowerCase().trim()

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    // Session cookie (no maxAge) — expires when browser closes.
    const token = await signToken({ id: user.id }, "24h");
    const cookieStore = await cookies();
    cookieStore.set("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error.message || "An unexpected error occurred during registration" };
  }
}

export async function loginAction(formData: FormData) {
  try {
    const rawEmail = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") === "on";

    if (!rawEmail || !password) {
      return { error: "All fields are required" };
    }

    const email = rawEmail.toLowerCase().trim()

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "Incorrect email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return { error: "Incorrect email or password" };
    }

    const expiresIn = remember ? "7d" : "24h";
    const token = await signToken({ id: user.id }, expiresIn);
    const cookieStore = await cookies();
    
    cookieStore.set("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      ...(remember ? { maxAge: 7 * 24 * 60 * 60 } : {})
    });

    return { success: true };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: error.message || "An unexpected error occurred during login" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { success: true };
}
