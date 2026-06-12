import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: once });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 }
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: offset.y,
        x: offset.x
      }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0,
        x: 0
      } : {
        opacity: 0,
        y: offset.y,
        x: offset.x
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// For staggered children animations
interface ScrollRevealGroupProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function ScrollRevealGroup({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up'
}: ScrollRevealGroupProps) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce: true });

  const directionOffset = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 }
  };

  const offset = directionOffset[direction];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            y: offset.y,
            x: offset.x
          }}
          animate={isVisible ? { 
            opacity: 1, 
            y: 0,
            x: 0
          } : {
            opacity: 0,
            y: offset.y,
            x: offset.x
          }}
          transition={{ 
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
