"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./Editor"), { 
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto px-8 py-12 animate-pulse">
      <div className="h-12 bg-gray-800 rounded-lg w-3/4 mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-800 rounded w-full"></div>
        <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        <div className="h-4 bg-gray-800 rounded w-full"></div>
      </div>
    </div>
  )
});

export default function EditorLoader(props: any) {
  return <Editor {...props} />;
}
