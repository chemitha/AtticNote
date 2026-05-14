"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createNoteAction } from "@/app/actions/notes";
import { useLoading } from "@/hooks/use-loading";

export default function CreateNoteButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async () => {
    const { startLoading, stopLoading } = useLoading.getState();
    try {
      startLoading();
      setLoading(true);
      const res = await createNoteAction();
      if (res.success && res.note) {
        router.push(`/dashboard/notes/${res.note.id}`);
      }
    } catch (e) {
      console.error(e);
      stopLoading();
    } finally {
      setLoading(false);
    }
  };

  if (iconOnly) {
    return (
      <button 
        onClick={handleCreateNote}
        disabled={loading}
        className="w-14 h-14 bg-[#7C5CFF] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#7C5CFF66] hover:scale-105 transition-transform disabled:opacity-50" 
        aria-label="New Note"
      >
        <Plus className="w-8 h-8" />
      </button>
    );
  }

  return (
    <button 
      onClick={handleCreateNote}
      disabled={loading}
      className="bg-[#7C5CFF] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6042db] transition-colors disabled:opacity-50 inline-flex items-center gap-2"
    >
      <Plus className="w-5 h-5" />
      <span>{loading ? "Creating..." : "Create New Note"}</span>
    </button>
  );
}
