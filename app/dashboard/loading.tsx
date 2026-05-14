'use client';

import { motion } from "motion/react";

export default function DashboardLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-4">
        {/* Slightly smaller pulsing N block for content-area loading */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            ease: "easeInOut"
          }}
          className="w-10 h-10 bg-[#7C5CFF]/20 rounded-xl flex items-center justify-center font-bold text-[#7C5CFF] text-lg border border-[#7C5CFF]/30 shadow-sm shadow-[#7C5CFF11]"
        >
          N
        </motion.div>
      </div>
    </div>
  );
}
