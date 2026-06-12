import { Moon, Sun, HelpCircle, Info, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import { KeyboardShortcutsHint } from './KeyboardShortcutsHint';
import { resetTour } from './OnboardingTour';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();

  const handleRestartTour = () => {
    resetTour();
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0 group cursor-pointer transition-all duration-300 hover:neon-glow rounded-lg px-2 py-1 -ml-2">
          <Wrench className="w-6 h-6 sm:w-7 sm:h-7 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" />
          <span className="text-lg sm:text-xl font-bold text-gradient transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(var(--neon-magenta)/0.5)]">{t('forge.title')}</span>
          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-accent text-accent-foreground rounded transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_10px_hsl(var(--accent)/0.5)]">{t('forge.badge')}</span>
        </div>

        <div className="flex items-center gap-1">
          <KeyboardShortcutsHint />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTab === 'about' ? 'default' : 'ghost'} 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => onTabChange?.(activeTab === 'about' ? 'export' : 'about')}
                >
                  <Info className="h-4 w-4" />
                  <span className="sr-only">{t('forge.info')}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t('forge.info')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRestartTour}>
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">{t('forge.restartTour')}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t('forge.restartTour')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <Switch 
                    checked={resolvedTheme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {resolvedTheme === 'dark' ? t('forge.darkMode') : t('forge.lightMode')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
