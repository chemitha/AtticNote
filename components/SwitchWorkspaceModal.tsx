"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, Plus, Pencil, Trash2, Layers } from "lucide-react";
import {
  createWorkspaceAction,
  deleteWorkspaceAction,
  renameWorkspaceAction,
  switchWorkspaceAction,
  WorkspaceSummary,
} from "@/app/actions/workspaces";

const WORKSPACE_COLORS = [
  "#7C5CFF",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#EC4899",
];

interface SwitchWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaces: WorkspaceSummary[];
  activeWorkspaceId: string;
}

export default function SwitchWorkspaceModal({
  isOpen,
  onClose,
  workspaces,
  activeWorkspaceId,
}: SwitchWorkspaceModalProps) {
  if (!isOpen) return null;
  return (
    <SwitchWorkspaceModalContent
      onClose={onClose}
      workspaces={workspaces}
      activeWorkspaceId={activeWorkspaceId}
    />
  );
}

function SwitchWorkspaceModalContent({
  onClose,
  workspaces: initialWorkspaces,
  activeWorkspaceId: initialActiveId,
}: Omit<SwitchWorkspaceModalProps, "isOpen">) {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState<WorkspaceSummary[]>(initialWorkspaces);
  const [activeId, setActiveId] = useState<string>(initialActiveId);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create form
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(WORKSPACE_COLORS[0]);
  const [creatingLoading, setCreatingLoading] = useState(false);

  // Rename state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState(WORKSPACE_COLORS[0]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSwitch = async (workspaceId: string) => {
    if (workspaceId === activeId) {
      onClose();
      return;
    }
    setBusyId(workspaceId);
    setError(null);

    const res = await switchWorkspaceAction(workspaceId);
    setBusyId(null);

    if (res.error) {
      setError(res.error);
      return;
    }

    setActiveId(workspaceId);
    onClose();
    router.push("/dashboard");
    router.refresh();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreatingLoading(true);
    setError(null);

    const res = await createWorkspaceAction({ name: newName, color: newColor });
    setCreatingLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (res.workspace) {
      setWorkspaces((prev) => [...prev, res.workspace!]);
      setActiveId(res.workspace.id);
    }
    setNewName("");
    setIsCreating(false);
    onClose();
    router.push("/dashboard");
    router.refresh();
  };

  const startEditing = (ws: WorkspaceSummary) => {
    setEditingId(ws.id);
    setEditName(ws.name);
    setEditColor(ws.color || WORKSPACE_COLORS[0]);
    setError(null);
  };

  const handleRename = async (e: React.FormEvent, workspaceId: string) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setBusyId(workspaceId);
    setError(null);

    const res = await renameWorkspaceAction({
      workspaceId,
      name: editName,
      color: editColor,
    });
    setBusyId(null);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (res.workspace) {
      setWorkspaces((prev) =>
        prev.map((w) => (w.id === workspaceId ? res.workspace! : w))
      );
    }
    setEditingId(null);
    router.refresh();
  };

  const handleDelete = async (ws: WorkspaceSummary) => {
    if (workspaces.length <= 1) {
      setError("You cannot delete your only remaining workspace.");
      return;
    }
    const noteCount = ws._count?.notes ?? 0;
    const confirmed = window.confirm(
      noteCount > 0
        ? `Delete "${ws.name}" and its ${noteCount} note(s)? This cannot be undone.`
        : `Delete "${ws.name}"?`
    );
    if (!confirmed) return;

    setBusyId(ws.id);
    setError(null);
    const res = await deleteWorkspaceAction(ws.id);
    setBusyId(null);

    if (res.error) {
      setError(res.error);
      return;
    }

    setWorkspaces((prev) => prev.filter((w) => w.id !== ws.id));
    if (res.nextActiveId) {
      setActiveId(res.nextActiveId);
    }
    if (ws.id === activeId) {
      router.push("/dashboard");
    }
    router.refresh();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111318] border border-[#2A2E37] w-full max-w-md rounded-2xl shadow-2xl text-left cursor-default overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E37]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7C5CFF20] border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#F5F7FA]">Switch Workspace</h3>
              <p className="text-xs text-[#9CA3AF]">Organize notes into separate spaces</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#181A20] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-xs">
              {error}
            </div>
          )}

          <div className="space-y-2">
            {workspaces.map((ws) => {
              const isActive = ws.id === activeId;
              const isEditing = editingId === ws.id;
              const isBusy = busyId === ws.id;

              if (isEditing) {
                return (
                  <form
                    key={ws.id}
                    onSubmit={(e) => handleRename(e, ws.id)}
                    className="p-3 rounded-xl bg-[#181A20] border border-[#7C5CFF]/50 space-y-2.5"
                  >
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                      maxLength={50}
                      className="w-full px-3 py-1.5 bg-[#0F1115] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {WORKSPACE_COLORS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setEditColor(c)}
                            className={`w-5 h-5 rounded-full transition-transform ${
                              editColor === c
                                ? "ring-2 ring-white ring-offset-1 ring-offset-[#181A20] scale-110"
                                : "opacity-70 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 text-xs text-[#9CA3AF] hover:text-[#F5F7FA]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isBusy}
                          className="px-3 py-1 text-xs font-medium bg-[#7C5CFF] hover:bg-[#6A48E6] text-white rounded-md disabled:opacity-50"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }

              return (
                <div
                  key={ws.id}
                  onClick={() => !isBusy && handleSwitch(ws.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group ${
                    isActive
                      ? "bg-[#7C5CFF15] border-[#7C5CFF]/50"
                      : "bg-[#181A20] border-[#2A2E37] hover:border-[#7C5CFF]/30"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold shrink-0"
                      style={{ backgroundColor: ws.color || "#7C5CFF" }}
                    >
                      {ws.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#F5F7FA] truncate">
                          {ws.name}
                        </p>
                        {isActive && (
                          <span className="text-[10px] px-2 py-0.5 bg-[#7C5CFF25] text-[#A78BFA] font-semibold rounded-full border border-[#7C5CFF]/30 shrink-0">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#9CA3AF]">
                        {ws._count?.notes ?? 0} note{(ws._count?.notes ?? 0) !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-1 ml-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isActive && <Check className="w-4 h-4 text-[#7C5CFF] mr-1" />}
                    <button
                      type="button"
                      onClick={() => startEditing(ws)}
                      className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#0F1115] opacity-70 group-hover:opacity-100 transition-all"
                      title="Rename workspace"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {workspaces.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDelete(ws)}
                        disabled={isBusy}
                        className="p-1.5 rounded-md text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 opacity-70 group-hover:opacity-100 transition-all disabled:opacity-40"
                        title="Delete workspace"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isCreating ? (
            <form
              onSubmit={handleCreate}
              className="p-3.5 rounded-xl bg-[#181A20] border border-[#2A2E37] space-y-3"
            >
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Workspace name (e.g. Work, Study)"
                autoFocus
                required
                maxLength={50}
                className="w-full px-3 py-2 bg-[#0F1115] border border-[#2A2E37] rounded-lg text-sm text-[#F5F7FA] focus:outline-none focus:border-[#7C5CFF]"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {WORKSPACE_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewColor(c)}
                      className={`w-5 h-5 rounded-full transition-transform ${
                        newColor === c
                          ? "ring-2 ring-white ring-offset-1 ring-offset-[#181A20] scale-110"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setNewName("");
                    }}
                    className="px-3 py-1.5 text-xs text-[#9CA3AF] hover:text-[#F5F7FA]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingLoading}
                    className="px-3 py-1.5 text-xs font-medium bg-[#7C5CFF] hover:bg-[#6A48E6] text-white rounded-lg disabled:opacity-50"
                  >
                    {creatingLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-[#2A2E37] text-xs font-medium text-[#9CA3AF] hover:text-[#F5F7FA] hover:border-[#7C5CFF]/50 hover:bg-[#181A20] transition-all"
            >
              <Plus className="w-4 h-4" />
              New Workspace
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
