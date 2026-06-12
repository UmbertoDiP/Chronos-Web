import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, X } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/lib/i18n/types';

interface ComparisonFeature {
  nameKey: TranslationKey;
  standard: boolean | TranslationKey;
  pro: boolean | TranslationKey;
}

export function ComparisonTable() {
  const { t } = useLanguage();

  const features: ComparisonFeature[] = [
    { nameKey: 'comparison.f1', standard: true, pro: true },
    { nameKey: 'comparison.f2', standard: 'comparison.f2.standard', pro: 'comparison.f2.pro' },
    { nameKey: 'comparison.f3', standard: true, pro: true },
    { nameKey: 'comparison.f4', standard: true, pro: true },
    { nameKey: 'comparison.f5', standard: true, pro: true },
    { nameKey: 'comparison.f6', standard: true, pro: true },
    { nameKey: 'comparison.f7', standard: false, pro: true },
    { nameKey: 'comparison.f8', standard: false, pro: true },
    { nameKey: 'comparison.f9', standard: false, pro: true },
    { nameKey: 'comparison.f10', standard: false, pro: true },
  ];

  const renderValue = (value: boolean | TranslationKey) => {
    if (typeof value === 'string') {
      return <span className="text-sm font-medium">{t(value)}</span>;
    }
    return value ? (
      <CheckCircle2 className="w-5 h-5 text-primary" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/50" />
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              {t('comparison.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              {t('comparison.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Card className="max-w-3xl mx-auto overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold text-sm sm:text-base">
                      {t('comparison.feature')}
                    </th>
                    <th className="text-center p-4 font-semibold text-sm sm:text-base min-w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        Standard
                        <Badge variant="secondary" className="text-[10px]">€14,99</Badge>
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold text-sm sm:text-base min-w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        Pro
                        <Badge className="text-[10px] gradient-primary text-white">{t('comparison.from')} €3,99/mo</Badge>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr 
                      key={index} 
                      className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                    >
                      <td className="p-3 sm:p-4 text-xs sm:text-sm">{t(feature.nameKey)}</td>
                      <td className="p-3 sm:p-4 text-center">
                        <div className="flex justify-center">{renderValue(feature.standard)}</div>
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        <div className="flex justify-center">{renderValue(feature.pro)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
