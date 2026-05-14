'use client';

import { useLoading } from "@/hooks/use-loading";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function GlobalLoaderContent({ force }: { force: boolean }) {
  const { isLoading, stopLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const show = force || isLoading;

  // Automatically stop loading when the URL changes (navigation complete)
  useEffect(() => {
    stopLoading();
  }, [pathname, searchParams, stopLoading]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060816]/55 backdrop-blur-md"
        >
          <div className="loader" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GlobalLoader({ force = false }: { force?: boolean }) {
  return (
    <Suspense fallback={null}>
      <GlobalLoaderContent force={force} />
    </Suspense>
  );
}
