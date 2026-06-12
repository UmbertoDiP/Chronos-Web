import { useState } from 'react';
import { Bug, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';
import { toast } from 'sonner';
import { sanitizeCVText, checkRateLimit } from '@/lib/inputSanitizer';

interface BugReportButtonProps {
  className?: string;
}

export const BugReportButton = ({ className }: BugReportButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    category: 'bug',
    description: '',
  });

  const handleSubmit = async () => {
    // Rate limiting
    if (!checkRateLimit('bug_report', 3, 300000)) { // 3 reports per 5 minutes
      toast.error('Troppi report inviati. Riprova tra qualche minuto.');
      return;
    }

    // Validate inputs
    if (!formData.description.trim()) {
      toast.error('Inserisci una descrizione del problema');
      return;
    }

    if (formData.description.length < 10) {
      toast.error('La descrizione deve essere più dettagliata');
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize all inputs
      const sanitizedReport = {
        email: sanitizeCVText(formData.email, 255),
        category: formData.category,
        description: sanitizeCVText(formData.description, 5000),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
      };

      // For now, store in localStorage (could be sent to a backend later)
      const existingReports = JSON.parse(localStorage.getItem('bug_reports') || '[]');
      existingReports.push(sanitizedReport);
      localStorage.setItem('bug_reports', JSON.stringify(existingReports.slice(-50))); // Keep last 50

      // Log for development
      console.log('Bug Report:', sanitizedReport);

      toast.success('Grazie! Il tuo report è stato inviato.');
      setOpen(false);
      setFormData({ email: '', category: 'bug', description: '' });
    } catch (error) {
      console.error('Error submitting bug report:', error);
      toast.error('Errore nell\'invio del report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg bg-background border-2 border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/10 ${className}`}
        onClick={() => setOpen(true)}
        title="Segnala un problema"
      >
        <Bug className="w-6 h-6 text-orange-500" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-orange-500" />
              Segnala un problema
            </DialogTitle>
            <DialogDescription>
              Hai trovato un bug o vuoi suggerire un miglioramento? Faccelo sapere!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <FormField label="Email (opzionale)" hint="Per ricevere aggiornamenti sulla segnalazione">
              <Input
                type="email"
                placeholder="tua@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                maxLength={255}
              />
            </FormField>

            <FormField label="Tipo di segnalazione">
              <div className="flex gap-2">
                {[
                  { value: 'bug', label: '🐛 Bug' },
                  { value: 'feature', label: '✨ Idea' },
                  { value: 'ui', label: '🎨 UI/UX' },
                ].map(option => (
                  <Button
                    key={option.value}
                    variant={formData.category === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, category: option.value }))}
                    className="flex-1"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </FormField>

            <FormField 
              label="Descrizione" 
              required
              hint="Descrivi il problema nel dettaglio. Cosa stavi facendo? Cosa ti aspettavi?"
            >
              <Textarea
                placeholder="Descrivi il problema o il suggerimento..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={5}
                maxLength={5000}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.description.length}/5000 caratteri
              </p>
            </FormField>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Annulla
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Invio...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Invia
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
