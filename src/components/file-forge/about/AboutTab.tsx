import { useState } from 'react';
import { BookOpen, Bug, Shield, FileText, Cookie, Scale, MessageSquare, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

type ModalType = 'docs' | 'bug' | 'privacy' | 'terms' | 'cookies' | 'licenses' | null;

export function AboutTab() {
  const { t } = useLanguage();
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [bugForm, setBugForm] = useState({ email: '', subject: '', description: '' });

  const handleBugSubmit = () => {
    if (!bugForm.subject || !bugForm.description) {
      toast.error(t('forge.about.bug.fillRequired'));
      return;
    }
    toast.success(t('forge.about.bug.sent'), {
      description: t('forge.about.bug.sentDesc')
    });
    setBugForm({ email: '', subject: '', description: '' });
    setOpenModal(null);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-2 group">
              <Wrench className="w-10 h-10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-3xl font-bold text-gradient transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(var(--neon-magenta)/0.5)]">{t('forge.title')}</span>
              <span className="px-2 py-1 text-xs font-bold bg-accent text-accent-foreground rounded transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_10px_hsl(var(--accent)/0.5)]">{t('forge.badge')}</span>
            </div>
            <p className="text-muted-foreground">{t('forge.about.subtitle')}</p>
            <div className="text-sm text-muted-foreground">
              <p>{t('forge.about.version')}</p>
              <p className="mt-1">{t('forge.about.copyright')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('forge.about.support')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenModal('docs')}>
            <BookOpen className="mr-2 h-4 w-4" />
            {t('forge.about.docs')}
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenModal('bug')}>
            <Bug className="mr-2 h-4 w-4" />
            {t('forge.about.bugReport')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('forge.about.legal')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenModal('privacy')}>
            <Shield className="mr-2 h-4 w-4" />
            {t('forge.about.privacy')}
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenModal('terms')}>
            <FileText className="mr-2 h-4 w-4" />
            {t('forge.about.terms')}
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenModal('cookies')}>
            <Cookie className="mr-2 h-4 w-4" />
            {t('forge.about.cookies')}
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenModal('licenses')}>
            <Scale className="mr-2 h-4 w-4" />
            {t('forge.about.licenses')}
          </Button>
        </CardContent>
      </Card>

      {/* Documentation Modal */}
      <Dialog open={openModal === 'docs'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t('forge.about.docs')}
            </DialogTitle>
            <DialogDescription>{t('forge.about.docs.guideTitle')}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="font-semibold text-base mb-2">{t('forge.about.docs.introTitle')}</h3>
                <p className="text-muted-foreground">{t('forge.about.docs.introText')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-base mb-2">{t('forge.about.docs.extTitle')}</h3>
                <p className="text-muted-foreground">{t('forge.about.docs.extText')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-base mb-2">{t('forge.about.docs.dirsTitle')}</h3>
                <p className="text-muted-foreground">{t('forge.about.docs.dirsText')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-base mb-2">{t('forge.about.docs.advTitle')}</h3>
                <p className="text-muted-foreground">{t('forge.about.docs.advText')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-base mb-2">{t('forge.about.docs.profilesTitle')}</h3>
                <p className="text-muted-foreground">{t('forge.about.docs.profilesText')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-base mb-2">{t('forge.about.docs.exportTitle')}</h3>
                <p className="text-muted-foreground">{t('forge.about.docs.exportText')}</p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Bug Report Modal */}
      <Dialog open={openModal === 'bug'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              {t('forge.about.bugReport')}
            </DialogTitle>
            <DialogDescription>{t('forge.about.bug.helpImprove')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bug-email">{t('forge.about.bug.emailLabel')}</Label>
              <Input
                id="bug-email"
                type="email"
                placeholder={t('forge.about.bug.emailPlaceholder')}
                value={bugForm.email}
                onChange={(e) => setBugForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bug-subject">{t('forge.about.bug.subjectLabel')}</Label>
              <Input
                id="bug-subject"
                placeholder={t('forge.about.bug.subjectPlaceholder')}
                value={bugForm.subject}
                onChange={(e) => setBugForm(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bug-description">{t('forge.about.bug.descLabel')}</Label>
              <Textarea
                id="bug-description"
                placeholder={t('forge.about.bug.descPlaceholder')}
                rows={5}
                value={bugForm.description}
                onChange={(e) => setBugForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModal(null)}>{t('forge.about.bug.cancel')}</Button>
            <Button onClick={handleBugSubmit}>
              <MessageSquare className="mr-2 h-4 w-4" />
              {t('forge.about.bug.submit')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}
      <Dialog open={openModal === 'privacy'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('forge.about.privacy')}
            </DialogTitle>
            <DialogDescription>{t('forge.about.privacy.lastUpdate')}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm text-muted-foreground">
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.privacy.s1title')}</h3>
                <p>{t('forge.about.privacy.s1text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.privacy.s2title')}</h3>
                <p>{t('forge.about.privacy.s2text')}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>{t('forge.about.privacy.s2li1')}</li>
                  <li>{t('forge.about.privacy.s2li2')}</li>
                  <li>{t('forge.about.privacy.s2li3')}</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.privacy.s3title')}</h3>
                <p>{t('forge.about.privacy.s3text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.privacy.s4title')}</h3>
                <p>{t('forge.about.privacy.s4text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.privacy.s5title')}</h3>
                <p>{t('forge.about.privacy.s5text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.privacy.s6title')}</h3>
                <p>{t('forge.about.privacy.s6text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.privacy.s7title')}</h3>
                <p>{t('forge.about.privacy.s7text')}</p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={openModal === 'terms'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('forge.about.terms')}
            </DialogTitle>
            <DialogDescription>{t('forge.about.terms.lastUpdate')}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm text-muted-foreground">
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s1title')}</h3>
                <p>{t('forge.about.terms.s1text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s2title')}</h3>
                <p>{t('forge.about.terms.s2text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s3title')}</h3>
                <p>{t('forge.about.terms.s3text')}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>{t('forge.about.terms.s3li1')}</li>
                  <li>{t('forge.about.terms.s3li2')}</li>
                  <li>{t('forge.about.terms.s3li3')}</li>
                  <li>{t('forge.about.terms.s3li4')}</li>
                  <li>{t('forge.about.terms.s3li5')}</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s4title')}</h3>
                <p>{t('forge.about.terms.s4text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s5title')}</h3>
                <p>{t('forge.about.terms.s5text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s6title')}</h3>
                <p>{t('forge.about.terms.s6text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s7title')}</h3>
                <p>{t('forge.about.terms.s7text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.terms.s8title')}</h3>
                <p>{t('forge.about.terms.s8text')}</p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Cookie Policy Modal */}
      <Dialog open={openModal === 'cookies'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              {t('forge.about.cookies')}
            </DialogTitle>
            <DialogDescription>{t('forge.about.cookie.lastUpdate')}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm text-muted-foreground">
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.cookie.s1title')}</h3>
                <p>{t('forge.about.cookie.s1text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.cookie.s2title')}</h3>
                <p>{t('forge.about.cookie.s2text')}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>{t('forge.about.cookie.s2li1')}</strong></li>
                  <li><strong>{t('forge.about.cookie.s2li2')}</strong></li>
                  <li><strong>{t('forge.about.cookie.s2li3')}</strong></li>
                  <li><strong>{t('forge.about.cookie.s2li4')}</strong></li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.cookie.s3title')}</h3>
                <p>{t('forge.about.cookie.s3text')}</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.cookie.s4title')}</h3>
                <p>{t('forge.about.cookie.s4text')}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>{t('forge.about.cookie.s4li1')}</li>
                  <li>{t('forge.about.cookie.s4li2')}</li>
                  <li>{t('forge.about.cookie.s4li3')}</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground mb-2">{t('forge.about.cookie.s5title')}</h3>
                <p>{t('forge.about.cookie.s5text')}</p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Third-Party Licenses Modal */}
      <Dialog open={openModal === 'licenses'} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              {t('forge.about.licenses')}
            </DialogTitle>
            <DialogDescription>{t('forge.about.licenses.desc')}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="text-foreground">{t('forge.about.licenses.intro')}</p>
              
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">React</h3>
                <p className="text-xs mt-1">MIT License - Facebook Inc.</p>
                <p className="mt-2">{t('forge.about.licenses.reactDesc')}</p>
              </section>
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">Tailwind CSS</h3>
                <p className="text-xs mt-1">MIT License - Tailwind Labs Inc.</p>
                <p className="mt-2">{t('forge.about.licenses.tailwindDesc')}</p>
              </section>
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">Radix UI</h3>
                <p className="text-xs mt-1">MIT License - WorkOS</p>
                <p className="mt-2">{t('forge.about.licenses.radixDesc')}</p>
              </section>
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">Lucide React</h3>
                <p className="text-xs mt-1">ISC License - Lucide Contributors</p>
                <p className="mt-2">{t('forge.about.licenses.lucideDesc')}</p>
              </section>
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">shadcn/ui</h3>
                <p className="text-xs mt-1">MIT License - shadcn</p>
                <p className="mt-2">{t('forge.about.licenses.shadcnDesc')}</p>
              </section>
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">Sonner</h3>
                <p className="text-xs mt-1">MIT License - Emil Kowalski</p>
                <p className="mt-2">{t('forge.about.licenses.sonnerDesc')}</p>
              </section>
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">React Router</h3>
                <p className="text-xs mt-1">MIT License - Remix Software Inc.</p>
                <p className="mt-2">{t('forge.about.licenses.routerDesc')}</p>
              </section>
              <section className="border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">Vite</h3>
                <p className="text-xs mt-1">MIT License - Evan You</p>
                <p className="mt-2">{t('forge.about.licenses.viteDesc')}</p>
              </section>
              
              <div className="pt-4 border-t">
                <p className="text-xs">{t('forge.about.licenses.disclaimer')}</p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
