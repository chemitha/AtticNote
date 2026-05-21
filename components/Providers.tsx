'use client';

import React, { useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import GlobalLoader from './GlobalLoader';

function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname && pathname.startsWith('/dashboard')) {
      const historyRaw = sessionStorage.getItem('internal_nav_history');
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      
      // Only push if the pathname is different from the last tracked path
      if (history[history.length - 1] !== pathname) {
        history.push(pathname);
        if (history.length > 50) {
          history.shift();
        }
        sessionStorage.setItem('internal_nav_history', JSON.stringify(history));
      }
    }
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalLoader />
      <Suspense fallback={null}>
        <NavigationTracker />
      </Suspense>
      {children}
    </>
  );
}
