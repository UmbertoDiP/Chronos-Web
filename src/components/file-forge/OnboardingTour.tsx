import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const STORAGE_KEY = 'fileforge_tour_completed';
const TOUR_RESTART_EVENT = 'fileforge_restart_tour';

export function OnboardingTour() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const TOUR_STEPS = [
    { title: t('forge.tour.welcome'), description: t('forge.tour.welcomeDesc') },
    { title: t('forge.tour.templates'), description: t('forge.tour.templatesDesc') },
    { title: t('forge.tour.presets'), description: t('forge.tour.presetsDesc') },
    { title: t('forge.tour.profiles'), description: t('forge.tour.profilesDesc') },
    { title: t('forge.tour.split'), description: t('forge.tour.splitDesc') },
    { title: t('forge.tour.actions'), description: t('forge.tour.actionsDesc') },
  ];

  useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleRestart = () => {
      setStep(0);
      setIsOpen(true);
    };
    window.addEventListener(TOUR_RESTART_EVENT, handleRestart);
    return () => window.removeEventListener(TOUR_RESTART_EVENT, handleRestart);
  }, []);

  const handleComplete = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  const nextStep = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const currentStep = TOUR_STEPS[step];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <DialogTitle>{currentStep.title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center gap-1.5 py-4">
          {TOUR_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === step
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        <DialogFooter className="flex-row justify-between sm:justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            {t('forge.tour.skip')}
          </Button>
          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t('forge.tour.back')}
              </Button>
            )}
            <Button size="sm" onClick={nextStep}>
              {step === TOUR_STEPS.length - 1 ? (
                t('forge.tour.start')
              ) : (
                <>
                  {t('forge.tour.next')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function resetTour() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(TOUR_RESTART_EVENT));
}
