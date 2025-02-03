"use client";

import { motion } from "motion/react";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-slate-500 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-accent-gradient rounded-md"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}
