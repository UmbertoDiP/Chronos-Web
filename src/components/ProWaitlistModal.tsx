import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Bell, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const translations = {
  en: {
    title: "Get Notified When Pro is Available",
    subtitle: "Pro subscriptions are coming soon! Leave your email and we'll notify you as soon as they're available.",
    emailPlaceholder: "your@email.com",
    consent: "I agree to receive email notifications about Pro availability and updates",
    submit: "Notify Me",
    submitting: "Submitting...",
    success: "You're on the list!",
    successMessage: "We'll notify you as soon as Pro subscriptions are available.",
    close: "Close",
    error: "Something went wrong. Please try again.",
    invalidEmail: "Please enter a valid email address",
    consentRequired: "Please accept the consent to continue",
    planMonthly: "PRO MONTHLY",
    planAnnual: "PRO ANNUAL",
  },
  it: {
    title: "Ricevi una notifica quando Pro è disponibile",
    subtitle: "Gli abbonamenti Pro arriveranno presto! Lascia la tua email e ti avviseremo appena disponibili.",
    emailPlaceholder: "tua@email.com",
    consent: "Accetto di ricevere notifiche email sulla disponibilità e aggiornamenti di Pro",
    submit: "Avvisami",
    submitting: "Invio in corso...",
    success: "Sei nella lista!",
    successMessage: "Ti avviseremo appena gli abbonamenti Pro saranno disponibili.",
    close: "Chiudi",
    error: "Qualcosa è andato storto. Riprova.",
    invalidEmail: "Inserisci un indirizzo email valido",
    consentRequired: "Accetta il consenso per continuare",
    planMonthly: "PRO MENSILE",
    planAnnual: "PRO ANNUALE",
  },
};

interface ProWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: "monthly" | "annual";
}

export const ProWaitlistModal = ({ isOpen, onClose, planType }: ProWaitlistModalProps) => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError(t.invalidEmail);
      return;
    }

    if (!consent) {
      setError(t.consentRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("pro-waitlist-notify", {
        body: {
          email: email.toLowerCase().trim(),
          plan_type: planType,
          language: language,
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setIsSuccess(true);
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setConsent(false);
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-border">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-primary">
                    {planType === "monthly" ? t.planMonthly : t.planAnnual}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-muted hover:bg-destructive/10 text-foreground hover:text-destructive transition-colors border border-border"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isSuccess ? (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold mb-2">{t.title}</h2>
                      <p className="text-sm text-muted-foreground">{t.subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder={t.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={consent}
                          onCheckedChange={(checked) => setConsent(checked === true)}
                          disabled={isSubmitting}
                        />
                        <label
                          htmlFor="consent"
                          className="text-xs text-muted-foreground cursor-pointer leading-relaxed"
                        >
                          {t.consent}
                        </label>
                      </div>

                      {error && (
                        <p className="text-sm text-destructive text-center">{error}</p>
                      )}

                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {t.submitting}
                          </>
                        ) : (
                          <>
                            <Bell className="w-4 h-4" />
                            {t.submit}
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </motion.div>
                    <h2 className="text-xl font-bold mb-2">{t.success}</h2>
                    <p className="text-sm text-muted-foreground mb-6">{t.successMessage}</p>
                    <Button onClick={handleClose} variant="outline" className="w-full">
                      {t.close}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProWaitlistModal;
