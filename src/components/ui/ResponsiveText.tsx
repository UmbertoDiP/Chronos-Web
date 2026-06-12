import React, { useRef, useEffect, useState, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  /** Minimum font size in rem */
  minSize?: number;
  /** Maximum font size in rem */
  maxSize?: number;
  /** Preferred font size in rem (used as base for fluid calc) */
  preferredSize?: number;
  /** Enable anti-orphan protection (prevents single words on last line) */
  preventOrphans?: boolean;
  /** Max width for optimal reading (in ch units) */
  maxWidth?: number;
  /** Custom inline styles */
  style?: CSSProperties;
}

/**
 * ResponsiveText - A smart text component that:
 * - Uses fluid typography with clamp()
 * - Prevents orphans (single words on last line)
 * - Applies text-wrap: balance/pretty based on element type
 * - Ensures proper word breaking without overflow
 */
export function ResponsiveText({
  children,
  as: Component = 'p',
  className,
  minSize,
  maxSize,
  preferredSize,
  preventOrphans = true,
  maxWidth,
  style,
}: ResponsiveTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const [adjustedStyle, setAdjustedStyle] = useState<CSSProperties>({});

  // Determine default sizes based on element type
  const getDefaultSizes = () => {
    switch (Component) {
      case 'h1':
        return { min: 1.75, preferred: 2.25, max: 3 };
      case 'h2':
        return { min: 1.5, preferred: 1.875, max: 2.25 };
      case 'h3':
        return { min: 1.25, preferred: 1.5, max: 1.75 };
      case 'h4':
      case 'h5':
      case 'h6':
        return { min: 1, preferred: 1.125, max: 1.25 };
      default:
        return { min: 0.875, preferred: 0.9375, max: 1 };
    }
  };

  const defaults = getDefaultSizes();
  const min = minSize ?? defaults.min;
  const preferred = preferredSize ?? defaults.preferred;
  const max = maxSize ?? defaults.max;

  // Check for orphans and apply micro-adjustments
  useEffect(() => {
    if (!preventOrphans || !textRef.current) return;

    const checkOrphans = () => {
      const element = textRef.current;
      if (!element) return;

      // Get computed styles
      const computedStyle = window.getComputedStyle(element);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 24;
      const elementHeight = element.offsetHeight;
      const lines = Math.round(elementHeight / lineHeight);

      // Only check if there are multiple lines
      if (lines < 2) return;

      // Get text content and check last line
      const text = element.textContent || '';
      const words = text.trim().split(/\s+/);
      
      if (words.length < 3) return;

      // Use Range API to check last line width
      const range = document.createRange();
      const textNode = element.firstChild;
      
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        try {
          range.selectNodeContents(element);
          const rects = range.getClientRects();
          
          if (rects.length > 1) {
            const lastRect = rects[rects.length - 1];
            const containerWidth = element.offsetWidth;
            const lastLineRatio = lastRect.width / containerWidth;

            // If last line is less than 25% of container width, add non-breaking space
            // before the last word to pull it up to previous line
            if (lastLineRatio < 0.25 && words.length > 2) {
              // Apply a slight letter-spacing adjustment to reflow text
              setAdjustedStyle(prev => ({
                ...prev,
                letterSpacing: '-0.01em',
              }));
            }
          }
        } catch (e) {
          // Silently fail - orphan detection is an enhancement, not critical
        }
      }
    };

    // Run after render and on resize
    const timeoutId = setTimeout(checkOrphans, 100);
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(checkOrphans);
    });

    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [preventOrphans, children]);

  // Determine text-wrap strategy based on element type
  const getTextWrapClass = () => {
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(Component)) {
      return 'text-wrap-balance';
    }
    return 'text-wrap-pretty';
  };

  // Build fluid font-size with clamp
  const fluidFontSize = `clamp(${min}rem, ${preferred}rem + 0.5vw, ${max}rem)`;

  const combinedStyle: CSSProperties = {
    fontSize: fluidFontSize,
    maxWidth: maxWidth ? `${maxWidth}ch` : undefined,
    ...adjustedStyle,
    ...style,
  };

  return React.createElement(
    Component,
    {
      ref: textRef,
      className: cn(
        getTextWrapClass(),
        'break-words-safe',
        preventOrphans && 'no-orphans',
        className
      ),
      style: combinedStyle,
    },
    children
  );
}

export default ResponsiveText;
