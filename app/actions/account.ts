"use server";

import { prisma } from "@/lib/prisma";
import { ACTIVE_WORKSPACE_COOKIE, getUser } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(input: {
  name: string;
  email: string;
  avatarColor?: string | null;
  avatarUrl?: string | null;
}) {
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    const name = input.name?.trim();
    const email = input.email?.toLowerCase().trim();
    const avatarColor = input.avatarColor?.trim() || null;
    const avatarUrl = input.avatarUrl?.trim() || null;

    if (!name || name.length < 1) {
      return { error: "Display name is required" };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { error: "A valid email address is required" };
    }

    if (avatarUrl && !/^https?:\/\/.+/i.test(avatarUrl)) {
      return { error: "Avatar URL must start with http:// or https://" };
    }

    if (email !== user.email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== user.id) {
        return { error: "That email is already in use by another account" };
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email,
        avatar_color: avatarColor,
        avatar_url: avatarUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar_color: true,
        avatar_url: true,
      },
    });

    revalidatePath("/dashboard", "layout");
    return { success: true, user: updated };
  } catch (error: any) {
    console.error("Update profile error:", error);
    return { error: error?.message || "Failed to update profile" };
  }
}

export async function changePasswordAction(input: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    const { currentPassword, newPassword } = input;
    if (!currentPassword || !newPassword) {
      return { error: "All password fields are required" };
    }
    if (newPassword.length < 6) {
      return { error: "New password must be at least 6 characters" };
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, password_hash: true },
    });

    if (!dbUser) return { error: "User not found" };

    const isValid = await bcrypt.compare(currentPassword, dbUser.password_hash);
    if (!isValid) {
      return { error: "Current password is incorrect" };
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password_hash },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Change password error:", error);
    return { error: error?.message || "Failed to change password" };
  }
}

export async function deleteAccountAction(input: { password: string }) {
  try {
    const user = await getUser();
    if (!user) return { error: "Unauthorized" };

    if (!input.password) {
      return { error: "Password confirmation is required" };
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, password_hash: true },
    });

    if (!dbUser) return { error: "User not found" };

    const isValid = await bcrypt.compare(input.password, dbUser.password_hash);
    if (!isValid) {
      return { error: "Incorrect password" };
    }

    await prisma.user.delete({
      where: { id: user.id },
    });

    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete(ACTIVE_WORKSPACE_COOKIE);

    return { success: true };
  } catch (error: any) {
    console.error("Delete account error:", error);
    return { error: error?.message || "Failed to delete account" };
  }
}
