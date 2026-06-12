import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUPPORT_EMAIL = 'support@chronos.dev';

export function SupportModal({ open, onOpenChange }: SupportModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) return;

    const subject = encodeURIComponent(`[Chronos Support] from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );

    window.open(`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`, '_self');

    setSent(true);
    toast({
      title: t('support.toast.title'),
      description: t('support.toast.description'),
    });

    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setMessage('');
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t('support.title')}
          </DialogTitle>
          <DialogDescription>
            {t('support.description')}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle2 className="w-12 h-12 text-primary" />
            <p className="text-center font-medium">{t('support.sent')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="support-name">{t('support.name')}</Label>
              <Input
                id="support-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('support.namePlaceholder')}
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-email">{t('support.email')}</Label>
              <Input
                id="support-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('support.emailPlaceholder')}
                required
                maxLength={255}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-message">{t('support.message')}</Label>
              <Textarea
                id="support-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('support.messagePlaceholder')}
                required
                maxLength={2000}
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full gap-2">
              <Send className="w-4 h-4" />
              {t('support.send')}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SupportModal;
