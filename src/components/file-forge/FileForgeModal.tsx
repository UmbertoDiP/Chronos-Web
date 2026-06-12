import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FileForgeApp } from "./FileForgeApp";

interface FileForgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FileForgeModal = ({ isOpen, onClose }: FileForgeModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />

          {/* Modal Full-Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.4 }}
            className="fixed inset-0 z-[9999] overflow-auto bg-background"
          >
            {/* Close Button - Top Right */}
            <div className="sticky top-0 right-0 p-4 flex justify-end z-10 bg-background/80 backdrop-blur-sm">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-card hover:bg-primary/10 border border-border flex items-center justify-center transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_12px_-3px_hsl(var(--primary)/0.3)]"
                aria-label="Close Chronos Studio"
                title="Close Chronos Studio (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* File Forge App Content */}
            <FileForgeApp />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
