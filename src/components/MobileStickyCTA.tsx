import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Store } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileStickyCTAProps {
  storeUrl: string;
}

export function MobileStickyCTA({ storeUrl }: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately 500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getText = (en: string, it: string) => language === 'it' ? it : en;

  return (
    <>
      {/* Spacer that reserves space so content isn't hidden behind the CTA */}
      {isVisible && (
        <div className="h-16 sm:hidden" aria-hidden="true" />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t shadow-lg sm:hidden"
          >
            <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button size="lg" className="w-full gap-2 neon-glow">
                <Store className="w-5 h-5" />
                {getText('Download Now', 'Scarica Ora')}
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
