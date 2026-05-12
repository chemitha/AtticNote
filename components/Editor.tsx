"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { SuggestionMenuController, getDefaultReactSlashMenuItems } from "@blocknote/react";
import { filterSuggestionItems } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState, useRef } from "react";
import { Plus, Activity } from "lucide-react";

const getAllCustomItems = (editor: any) => [
  {
    title: "Table",
    onItemClick: () => editor.insertBlocks([{ type: "table", content: [] }], editor.getTextCursorPosition().block, "after"),
    aliases: ["table", "grid"],
    group: "Database & Organization",
    icon: "📊",
    subtext: "Create a simple table.",
  },
  {
    title: "Callout",
    onItemClick: () => editor.insertBlocks([{ type: "paragraph", content: "💡 Callout: " }], editor.getTextCursorPosition().block, "after"),
    aliases: ["callout", "info"],
    group: "Basic",
    icon: "💡",
    subtext: "Highlight important content.",
  },
  {
    title: "Ask AI",
    onItemClick: () => {
      editor.insertBlocks(
        [
          {
            type: "paragraph",
            content: "🤖 AI is thinking...",
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["ai", "magic", "generate", "ask"],
    group: "AI Features",
    icon: "✨",
    subtext: "Generate content with AI.",
  },
  {
    title: "GitHub Sync",
    onItemClick: () => alert("Syncing to GitHub..."),
    aliases: ["github", "export", "push"],
    group: "Export & Integrations",
    icon: "🐙",
    subtext: "Sync this page to GitHub.",
  },
  {
    title: "Google Drive",
    onItemClick: () => alert("Uploading to Google Drive..."),
    aliases: ["drive", "google", "cloud"],
    group: "Export & Integrations",
    icon: "📁",
    subtext: "Upload to Google Drive.",
  },
  {
    title: "Notion Sync",
    onItemClick: () => alert("Syncing to Notion..."),
    aliases: ["notion", "sync"],
    group: "Export & Integrations",
    icon: "📓",
    subtext: "Export to Notion.",
  },
  {
    title: "Board View",
    onItemClick: () => alert("Board view coming soon!"),
    aliases: ["board", "kanban"],
    group: "Database & Organization",
    icon: "📋",
    subtext: "Create a kanban board.",
  },
  {
    title: "YouTube Embed",
    onItemClick: () => {
      editor.insertBlocks(
        [
          {
            type: "paragraph",
            content: "🎥 https://youtube.com/watch?v=",
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["youtube", "video", "embed"],
    group: "Media",
    icon: "📺",
    subtext: "Embed a YouTube Video.",
  },
  {
    title: "ToDo List",
    onItemClick: () => editor.insertBlocks([{ type: "checkListItem", content: "New Task" }], editor.getTextCursorPosition().block, "after"),
    aliases: ["todo", "task", "check"],
    group: "Lists",
    icon: "✅",
    subtext: "Create a checkbox task.",
  },
  {
    title: "Code Block",
    onItemClick: () => editor.insertBlocks([{ type: "codeBlock", content: "" }], editor.getTextCursorPosition().block, "after"),
    aliases: ["code", "script"],
    group: "Code & Technical",
    icon: "💻",
    subtext: "Insert a code snippet.",
  }
];

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
    }, 1000); // Save every 1s of inactivity
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Note Banner */}
      <div className="h-64 w-full relative group/banner overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1D2B] to-[#0F1115]"></div>
        <div className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover/banner:scale-110" style={{ backgroundImage: "radial-gradient(#7C5CFF 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
        
        <div className="absolute top-6 right-10 flex items-center gap-2 opacity-0 group-hover/banner:opacity-100 transition-opacity translate-y-2 group-hover/banner:translate-y-0 duration-300">
           <button className="px-3 py-1.5 bg-[#181A20]/80 backdrop-blur-md border border-[#2A2E37] rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#2A2E37] transition-all flex items-center gap-2">
             Change Cover
           </button>
           <button className="px-3 py-1.5 bg-[#181A20]/80 backdrop-blur-md border border-[#2A2E37] rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#2A2E37] transition-all flex items-center gap-2">
             Reposition
           </button>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-8 relative -mt-12 mb-20">
        <div className="w-20 h-20 bg-[#181A20] rounded-3xl border-4 border-[#0F1115] flex items-center justify-center text-4xl mb-6 shadow-2xl relative group/icon cursor-pointer hover:scale-105 transition-transform">
          📝
          <button className="absolute -top-1 -right-1 p-1 bg-[#2A2E37] rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity">
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled"
          className="w-full bg-transparent text-5xl font-bold border-none outline-none mb-8 placeholder-gray-800 focus:ring-0 text-[#F5F7FA] tracking-tight"
        />
        
        <div className="flex items-center gap-4 mb-10 text-[#4B5563]">
            <button className="flex items-center gap-2 p-1.5 hover:bg-[#181A20] rounded-md transition-colors group">
                <Plus className="w-4 h-4 group-hover:text-white" />
                <span className="text-xs group-hover:text-white">Add Comment</span>
            </button>
            <div className="h-4 w-px bg-[#2A2E37]"></div>
            <button className="flex items-center gap-2 p-1.5 hover:bg-[#181A20] rounded-md transition-colors group">
                <Activity className="w-4 h-4 group-hover:text-white" />
                <span className="text-xs group-hover:text-white">Activity</span>
            </button>
        </div>

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
                  ...getAllCustomItems(editor),
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
           /* BlockNote uses mantine underneath it for standard styles like background */
           --bn-colors-editor-background: transparent !important;
        }
        .editor-wrapper .bn-editor {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
