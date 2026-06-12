import React, { useRef, ReactNode } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  estimateSize?: number;
  overscan?: number;
  className?: string;
  containerClassName?: string;
  /** Minimum items before virtualizing (below this, render all normally) */
  virtualizeThreshold?: number;
}

/**
 * Virtual list component for rendering large lists efficiently.
 * Only renders items visible in the viewport + overscan buffer.
 */
export function VirtualList<T>({
  items,
  renderItem,
  estimateSize = 80,
  overscan = 3,
  className = '',
  containerClassName = '',
  virtualizeThreshold = 10,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  // For small lists, render normally without virtualization overhead
  if (items.length < virtualizeThreshold) {
    return (
      <div className={className}>
        {items.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${containerClassName}`}
      style={{ maxHeight: '60vh' }}
    >
      <div
        className={className}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VirtualList;
