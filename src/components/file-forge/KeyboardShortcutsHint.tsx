import { Keyboard } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function KeyboardShortcutsHint() {
  const { t } = useLanguage();

  const shortcuts = [
    { keys: 'Ctrl + E', action: t('forge.shortcuts.export') },
    { keys: 'Ctrl + R', action: t('forge.shortcuts.reset') },
  ];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Keyboard className="h-4 w-4" />
            <span className="sr-only">{t('forge.shortcuts.title')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-3">
          <p className="font-medium text-sm mb-2">{t('forge.shortcuts.title')}</p>
          <div className="space-y-1">
            {shortcuts.map((s) => (
              <div key={s.keys} className="flex justify-between gap-4 text-xs">
                <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">
                  {s.keys}
                </kbd>
                <span className="text-muted-foreground">{s.action}</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
