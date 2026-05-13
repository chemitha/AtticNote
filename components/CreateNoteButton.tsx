"use client"

import { Plus } from "lucide-react";
import { useTransition } from "react";
import { createNoteAction } from "@/app/actions/notes";
import { useRouter } from "next/navigation";

export default function CreateNoteButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {
    startTransition(async () => {
      const result = await createNoteAction();
      if (result.success) {
        router.push(`/dashboard/notes/${result.note.id}`);
      }
    });
  };

  return (
    <button
      onClick={handleCreate}
      disabled={isPending}
      className="flex items-center gap-2 bg-[#7C5CFF] hover:bg-[#6D4AFF] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
    >
      <Plus className="w-4 h-4" />
      <span>New Note</span>
    </button>
  );
}
