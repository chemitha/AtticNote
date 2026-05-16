"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController, getDefaultReactSlashMenuItems } from "@blocknote/react";
import { filterSuggestionItems } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState, useRef } from "react";

export default function Editor({ 
  noteId, 
  initialBlocks, 
  initialTitle 
}: { 
  noteId: string; 
  initialBlocks: any[]; 
  initialTitle: string; 
}) {
  const [title, setTitle] = useState(initialTitle);
  const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Parse blocks
  const [parsedBlocks, setParsedBlocks] = useState<any[]>(() => {
    try {
      if (initialBlocks && initialBlocks.length > 0) {
         // The block objects themselves were JSON.stringified in `content`
         return initialBlocks.map(b => JSON.parse(b.content));
      }
    } catch(e) {
      console.error("Failed to parse blocks", e);
    }
    return [];
  });

  const editor = useCreateBlockNote({
    initialContent: parsedBlocks.length > 0 ? parsedBlocks : undefined,
  });

  const saveBlocksTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
      if (saveBlocksTimeoutRef.current) clearTimeout(saveBlocksTimeoutRef.current);
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
    titleTimeoutRef.current = setTimeout(async () => {
      fetch(`/api/notes/${noteId}/title`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
    }, 500);
  };

  const handleEditorChange = () => {
    if (saveBlocksTimeoutRef.current) clearTimeout(saveBlocksTimeoutRef.current);
    saveBlocksTimeoutRef.current = setTimeout(async () => {
      const blocks = editor.document;
      await fetch(`/api/notes/${noteId}/blocks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks }),
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled"
        className="w-full bg-transparent text-5xl font-bold border-none outline-none mb-8 placeholder-gray-600 focus:ring-0 text-[#F5F7FA]"
      />

      <div className="editor-wrapper -ml-[54px]">
        <BlockNoteView
          editor={editor}
          theme="dark"
          onChange={handleEditorChange}
          slashMenu={false}
        >
          <SuggestionMenuController
            triggerCharacter={"/"}
            getItems={async (query) =>
              filterSuggestionItems(
                [
                  ...getDefaultReactSlashMenuItems(editor),
                ],
                query
              )
            }
          />
        </BlockNoteView>
      </div>

      <style jsx global>{`
        .mantine-1rtq5z1 {
           --bn-colors-editor-background: transparent !important;
        }
        .editor-wrapper .bn-editor {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}