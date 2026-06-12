import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface ChangelogBadgeProps {
  lastUpdateDate: Date;
  onClick: () => void;
}

export function ChangelogBadge({ lastUpdateDate, onClick }: ChangelogBadgeProps) {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    // Check if the last update was within the last 48 hours
    const now = new Date();
    const hoursDiff = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60);
    setIsNew(hoursDiff <= 48);
  }, [lastUpdateDate]);

  if (!isNew) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="absolute -top-1 -right-1"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Badge 
            variant="default" 
            className="px-1.5 py-0.5 text-[9px] cursor-pointer gradient-primary border-0"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Sparkles className="w-2.5 h-2.5 mr-0.5" />
            NEW
          </Badge>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
