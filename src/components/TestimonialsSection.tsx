import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

interface Testimonial {
  name: string;
  role: string;
  contentKey: 'testimonials.1.content' | 'testimonials.2.content' | 'testimonials.3.content' | 'testimonials.4.content';
  rating: number;
}

export function TestimonialsSection() {
  const { t } = useLanguage();

  const baseTestimonials: Testimonial[] = [
    { name: 'Marco R.', role: 'Senior Developer', contentKey: 'testimonials.1.content', rating: 5 },
    { name: 'Sara L.', role: 'Tech Lead', contentKey: 'testimonials.2.content', rating: 5 },
    { name: 'Alessandro P.', role: 'Full-Stack Developer', contentKey: 'testimonials.3.content', rating: 5 },
  ];

  const fourthTestimonial: Testimonial = {
    name: 'Giulia M.', role: 'DevOps Engineer', contentKey: 'testimonials.4.content', rating: 5
  };

  const renderCard = (testimonial: Testimonial) => (
    <Card className="p-4 sm:p-6 h-full relative">
      <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20" />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-4 italic">
        "{t(testimonial.contentKey)}"
      </p>
      <div className="mt-auto">
        <p className="font-semibold text-sm">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
      </div>
    </Card>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {baseTestimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              {renderCard(testimonial)}
            </ScrollReveal>
          ))}
          <ScrollReveal delay={0.3} className="hidden sm:block lg:hidden">
            {renderCard(fourthTestimonial)}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
