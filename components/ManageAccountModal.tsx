"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, User, Shield, AlertTriangle, Check } from "lucide-react";
import UserAvatar, { AVATAR_GRADIENTS } from "./UserAvatar";
import {
  changePasswordAction,
  deleteAccountAction,
  updateProfileAction,
} from "@/app/actions/account";

interface ManageAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string | null;
    avatar_color?: string | null;
  };
}

type AccountTab = "profile" | "security" | "danger";

export default function ManageAccountModal({
  isOpen,
  onClose,
  user,
}: ManageAccountModalProps) {
  if (!isOpen) return null;
  return <ManageAccountModalContent onClose={onClose} user={user} />;
}

function ManageAccountModalContent({
  onClose,
  user,
}: Omit<ManageAccountModalProps, "isOpen">) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");

  // Profile state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarColor, setAvatarColor] = useState(user?.avatar_color || "violet");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Danger Zone state
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMessage(null);

    const res = await updateProfileAction({
      name,
      email,
      avatarColor,
      avatarUrl: avatarUrl.trim() || null,
    });

    setProfileSaving(false);
    if (res.error) {
      setProfileMessage({ type: "error", text: res.error });
    } else {
      setProfileMessage({ type: "success", text: "Profile updated successfully." });
      router.refresh();
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setPasswordSaving(true);
    const res = await changePasswordAction({
      currentPassword,
      newPassword,
    });
    setPasswordSaving(false);

    if (res.error) {
      setPasswordMessage({ type: "error", text: res.error });
    } else {
      setPasswordMessage({ type: "success", text: "Password updated successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError(null);

    if (deleteConfirmText !== "DELETE") {
      setDeleteError('Please type "DELETE" to confirm account deletion.');
      return;
    }

    setDeletingAccount(true);
    const res = await deleteAccountAction({ password: deletePassword });
    setDeletingAccount(false);

    if (res.error) {
      setDeleteError(res.error);
    } else {
      onClose();
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111318] border border-[#2A2E37] w-full max-w-lg rounded-2xl shadow-2xl text-left cursor-default overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E37]">
          <div>
            <h3 className="text-base font-semibold text-[#F5F7FA]">Manage Account</h3>
            <p className="text-xs text-[#9CA3AF]">Update your personal details and security settings</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#181A20] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 border-b border-[#2A2E37] bg-[#0F1115]/50">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-[#7C5CFF] text-[#F5F7FA]"
                : "border-transparent text-[#9CA3AF] hover:text-[#F5F7FA]"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === "security"
                ? "border-[#7C5CFF] text-[#F5F7FA]"
                : "border-transparent text-[#9CA3AF] hover:text-[#F5F7FA]"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Security
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("danger")}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === "danger"
                ? "border-red-500 text-red-400"
                : "border-transparent text-[#9CA3AF] hover:text-red-400"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Danger Zone
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar Preview & Gradient Picker */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#181A20] border border-[#2A2E37]">
                <UserAvatar
                  name={name}
                  avatarUrl={avatarUrl.trim() || null}
                  avatarColor={avatarColor}
                  sizeClass="w-14 h-14"
                  textClass="text-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#F5F7FA] mb-2">Avatar Accent</p>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_GRADIENTS.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setAvatarColor(g.id)}
                        title={g.label}
                        className={`w-6 h-6 rounded-full bg-gradient-to-tr ${g.className} flex items-center justify-center transition-transform ${
                          avatarColor === g.id
                            ? "ring-2 ring-white ring-offset-2 ring-offset-[#181A20] scale-110"
                            : "opacity-75 hover:opacity-100"
                        }`}
                      >
                        {avatarColor === g.id && <Check className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Avatar Image URL <span className="text-[#4B5563]">(optional)</span>
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
                  placeholder="https://example.com/avatar.png"
                />
              </div>

              {profileMessage && (
                <div
                  className={`p-3 rounded-lg text-xs ${
                    profileMessage.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {profileMessage.text}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium bg-[#181A20] border border-[#2A2E37] text-[#9CA3AF] hover:text-[#F5F7FA] rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-4 py-2 text-xs font-medium bg-[#7C5CFF] hover:bg-[#6A48E6] text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {profileSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
                />
              </div>

              {passwordMessage && (
                <div
                  className={`p-3 rounded-lg text-xs ${
                    passwordMessage.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {passwordMessage.text}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium bg-[#181A20] border border-[#2A2E37] text-[#9CA3AF] hover:text-[#F5F7FA] rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-4 py-2 text-xs font-medium bg-[#7C5CFF] hover:bg-[#6A48E6] text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {passwordSaving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "danger" && (
            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <div className="p-3 rounded-lg bg-red-500/10 text-xs text-red-400 leading-relaxed">
                Deleting your account permanently removes your profile, all workspaces, notes, blocks, and integrations. This action cannot be undone.
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-red-500"
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Type <span className="text-red-400 font-semibold">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#181A20] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-red-500"
                  placeholder="DELETE"
                />
              </div>

              {deleteError && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-xs">
                  {deleteError}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium bg-[#181A20] border border-[#2A2E37] text-[#9CA3AF] hover:text-[#F5F7FA] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deletingAccount}
                  className="px-4 py-2 text-xs font-medium bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {deletingAccount ? "Deleting..." : "Delete My Account"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
