'use client';

import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/use-loading";
import React from "react";

interface LoadingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
}

export default function LoadingLink({ children, href, ...props }: LoadingLinkProps) {
  const { startLoading } = useLoading();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only trigger for standard left clicks without modifiers
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      // Check if it's an internal link
      const isInternal = href.startsWith('/');
      const isHash = href.startsWith('#');
      
      if (isInternal && !isHash) {
        e.preventDefault();
        startLoading();
        
        // Use a small timeout to ensure the loading state is rendered before navigation
        setTimeout(() => {
          router.push(href);
        }, 10);
      }
    }
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
