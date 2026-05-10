"use server";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { error: "All fields are required" };
    }

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

    const token = await signToken({ id: user.id });
    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    return { success: true };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error.message || "An unexpected error occurred during registration" };
  }
}

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "All fields are required" };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return { error: "Invalid credentials" };
    }

    const token = await signToken({ id: user.id });
    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

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
