import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useLanguage();

  const getText = (en: string, it: string) => language === 'it' ? it : en;

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
    );
  }, [faqs, searchQuery]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={getText('Search FAQs...', 'Cerca nelle FAQ...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-3 sm:space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <h3
                      className="font-semibold text-sm sm:text-base"
                      data-faq-question
                    >
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                    </motion.div>
                  </div>
                  {/* Answer is always rendered for SEO/Speakable; visually collapsed when closed */}
                  <AnimatePresence initial={false}>
                    {expandedFaq === index ? (
                      <motion.p
                        key="open"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed overflow-hidden"
                        data-faq-answer
                      >
                        {faq.answer}
                      </motion.p>
                    ) : (
                      // Always-rendered, visually hidden copy so crawlers/voice assistants
                      // and the speakable cssSelector can find the answer text.
                      <p
                        className="sr-only"
                        data-faq-answer
                        aria-hidden="true"
                      >
                        {faq.answer}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredFaqs.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-8"
          >
            {getText('No matching questions found.', 'Nessuna domanda corrispondente trovata.')}
          </motion.p>
        )}
      </div>
    </div>
  );
}
