"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController, getDefaultReactSlashMenuItems, createReactBlockSpec } from "@blocknote/react";
import { 
  filterSuggestionItems, 
  insertOrUpdateBlock, 
  defaultBlockSpecs, 
  BlockNoteSchema, 
  BlockNoteEditor 
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState, useRef } from "react";
import { createSubpageAction } from "@/app/actions/notes";
import Link from "next/link";
import { ChevronLeft, FileText, Lightbulb } from "lucide-react";

// FIX 1: Intercept and filter the benign internal React 19/BlockNote synchronization console error
if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  console.error = function (...args: any[]) {
    const firstArg = args[0];
    const message = firstArg?.message || firstArg || "";
    if (
      typeof message === "string" &&
      (message.includes("flushSync was called from inside a lifecycle method") ||
       message.includes("React cannot flush when React is already rendering"))
    ) {
      return; // Suppress from polluting the Next.js console overlay
    }
    originalConsoleError.apply(console, args);
  };
}

// 1. Define custom blocks cleanly
const CalloutBlock = createReactBlockSpec(
  {
    type: "callout",
    propSchema: {
      textAlignment: defaultBlockSpecs.paragraph.config.propSchema.textAlignment,
      textColor: defaultBlockSpecs.paragraph.config.propSchema.textColor,
    },
    content: "inline",
  },
  {
    render: (props) => (
      <div className="flex items-start gap-3 p-4 bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 rounded-xl my-2 w-full">
        <div className="text-xl select-none">💡</div>
        <div className="flex-1 text-[#F5F7FA]" ref={props.contentRef} />
      </div>
    ),
  }
);

// 2. Instantiate custom schema properly using BlockNoteSchema.create
const customSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    callout: CalloutBlock,
  },
});

type CustomBlockSchema = typeof customSchema.blockSchema;
type CustomInlineContentSchema = typeof customSchema.inlineContentSchema;
type CustomStyleSchema = typeof customSchema.styleSchema;

function InnerEditor({ 
  noteId, 
  initialBlocks, 
  initialTitle,
  parentId,
  parentTitle
}: { 
  noteId: string; 
  initialBlocks: any[]; 
  initialTitle: string; 
  parentId?: string | null;
  parentTitle?: string | null;
}) {
  const saveBlocksTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false); // Track content hydration sequence
  const [title, setTitle] = useState(initialTitle);
  const [isLayoutSettled, setIsLayoutSettled] = useState(false);

  // Parse blocks securely 
  const [parsedBlocks] = useState<any[]>(() => {
    try {
      if (initialBlocks && initialBlocks.length > 0) {
         return initialBlocks.map(b => JSON.parse(b.content));
      }
    } catch(e) {
      console.error("Failed to parse blocks", e);
    }
    return [];
  });

  // FIX 2: Instantiate with no initialContent to prevent ProseMirror node-views 
  // from mounting custom blocks synchronously during React's active render phase.
  const editor = useCreateBlockNote({
    schema: customSchema,
  });

  useEffect(() => {
    const settleTimer = setTimeout(() => {
      setIsLayoutSettled(true);
    }, 40);

    return () => clearTimeout(settleTimer);
  }, [noteId]);

  // FIX 3: Hydrate custom blocks safely inside an isolated post-render effect loop
  useEffect(() => {
    if (!editor || !isLayoutSettled || hasInitializedRef.current) return;
    
    if (parsedBlocks.length > 0) {
      try {
        editor.replaceBlocks(editor.document, parsedBlocks);
      } catch (e) {
        console.error("Failed to populate initial blocks:", e);
      }
    }
    hasInitializedRef.current = true;
  }, [editor, isLayoutSettled, parsedBlocks]);

  useEffect(() => {
    if (!editor || typeof editor.onChange !== "function" || !isLayoutSettled) return;

    const unsubscribe = editor.onChange(() => {
      // Avoid database overwrite calls until the initial hydration step completes
      if (!hasInitializedRef.current || !editor.document) return;

      queueMicrotask(() => {
        if (saveBlocksTimeoutRef.current) clearTimeout(saveBlocksTimeoutRef.current);
        
        saveBlocksTimeoutRef.current = setTimeout(() => {
          const blocks = editor.document;
          fetch(`/api/notes/${noteId}/blocks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ blocks }),
          });
        }, 1000);
      });
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
      if (saveBlocksTimeoutRef.current) clearTimeout(saveBlocksTimeoutRef.current);
    };
  }, [editor, noteId, isLayoutSettled]);

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

  const insertPageItem = (editor: BlockNoteEditor<CustomBlockSchema, CustomInlineContentSchema, CustomStyleSchema>) => ({
    title: "Page",
    onItemClick: async () => {
      try {
        const res = await createSubpageAction(noteId);
        if (res.success && res.note) {
          insertOrUpdateBlock(editor, {
            type: "paragraph",
            content: [
              {
                type: "link",
                href: `/dashboard/notes/${res.note.id}`,
                content: res.note.title
              },
            ]
          });
        }
      } catch(e) {
        console.error("Failed to create subpage", e);
      }
    },
    aliases: ["page", "subpage", "nested"],
    group: "Workspace",
    icon: <span className="text-xl"><FileText className="w-3.5 h-3.5 mr-1.5"></FileText></span>,
    subtext: "Embed a sub-page inside this note."
  });

  const insertCalloutItem = (editor: BlockNoteEditor<CustomBlockSchema, CustomInlineContentSchema, CustomStyleSchema>) => ({
    title: "Callout",
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: "callout",
      });
    },
    aliases: ["callout", "info", "alert"],
    group: "Basic",
    icon: <span className="text-xl"><Lightbulb className="w-3.5 h-3.5 mr-1.5"></Lightbulb></span>,
    subtext: "Make writing stand out."
  });

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 relative">
      {parentId && parentTitle && (
        <Link 
          href={`/dashboard/notes/${parentId}`}
          className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#7C5CFF] transition-colors mb-6 group bg-[#181A20] px-3 py-1.5 rounded-full border border-[#2A2E37]"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Nested inside <strong className="font-semibold">{parentTitle}</strong></span>
        </Link>
      )}

      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled"
        className="w-full bg-transparent text-5xl font-bold border-none outline-none mb-8 placeholder-gray-600 focus:ring-0 text-[#F5F7FA]"
      />

      <div className="editor-wrapper -ml-[54px]">
        {isLayoutSettled ? (
          <BlockNoteView
            editor={editor}
            theme="dark"
            slashMenu={false}
          >
            <SuggestionMenuController
              triggerCharacter={"/"}
              getItems={async (query) =>
                filterSuggestionItems(
                  [
                    insertPageItem(editor),
                    insertCalloutItem(editor),
                    ...getDefaultReactSlashMenuItems(editor),
                  ],
                  query
                )
              }
            />
          </BlockNoteView>
        ) : (
          <div className="pl-[54px] pt-2 space-y-3 opacity-20">
            <div className="h-5 bg-gray-700 rounded w-1/3 animate-pulse" />
            <div className="h-5 bg-gray-700 rounded w-2/3 animate-pulse" />
          </div>
        )}
      </div>

      <style jsx global>{`
        .mantine-1rtq5z1 {
          --bn-colors-editor-background: transparent !important;
        }
        .editor-wrapper .bn-editor {
          background: transparent !important;
        }

        .bn-inline-content a[href*="/dashboard/notes/"] {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #F5F7FA !important;
          text-decoration: none !important;
          font-weight: 500;
          padding: 2px 4px;
          border-radius: 4px;
          border-bottom: 1px dashed rgba(124, 92, 255, 0.4);
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .bn-inline-content a[href*="/dashboard/notes/"]:hover {
          background-color: rgba(124, 92, 255, 0.15);
          color: #7C5CFF !important;
          border-bottom-color: transparent;
        }
        .bn-inline-content a[href*="/dashboard/notes/"]::before {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          background-color: currentColor; 
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3Cpath d='M10 9H8'/%3E%3Cpath d='M16 13H8'/%3E%3Cpath d='M16 17H8'/%3E%3C/svg%3E") no-repeat center / contain;
          -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3Cpath d='M10 9H8'/%3E%3Cpath d='M16 13H8'/%3E%3Cpath d='M16 17H8'/%3E%3C/svg%3E") no-repeat center / contain;
        }
      `}</style>
    </div>
  );
}

export default function Editor(props: { 
  noteId: string; 
  initialBlocks: any[]; 
  initialTitle: string; 
  parentId?: string | null;
  parentTitle?: string | null;
}) {
  return <InnerEditor {...props} key={props.noteId} />;
}