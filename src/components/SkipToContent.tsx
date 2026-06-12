import { useEffect } from 'react';

/**
 * Skip to content link for accessibility
 * Renders a visually hidden link that becomes visible on focus
 */
export const SkipToContent = ({ targetId = 'main-content' }: { targetId?: string }) => {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (target && !target.getAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
  }, [targetId]);

  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999]
                 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md
                 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Salta al contenuto principale
    </a>
  );
};

export default SkipToContent;
