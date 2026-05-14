'use client';

import React, { Suspense } from 'react';
import GlobalLoader from './GlobalLoader';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalLoader />
      {children}
    </>
  );
}
