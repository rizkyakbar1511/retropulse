import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  action: () => void;
  onCloseDialog: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  action,
  onCloseDialog,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={onCloseDialog}
            className="fixed inset-0 backdrop-blur-sm mb-0 bg-main/50 z-40"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="p-4 fixed top-1/2 space-y-7 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-main border border-slate-400 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display">{title}</h2>
              <button onClick={onCloseDialog} type="button">
                <XMarkIcon className="size-4" />
              </button>
            </div>
            <p>{description}</p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={onCloseDialog}
                type="button"
                className="w-full px-6 py-2 text-sm uppercase border border-yellow-400 rounded-md hover:opacity-80 bg-accent-gradient"
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full px-6 py-2 text-sm uppercase bg-red-500 border hover:opacity-80 border-red-600 rounded-md"
                onClick={action}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
