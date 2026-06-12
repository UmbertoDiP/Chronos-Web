import { HardDrive, FileText, FileOutput } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Info } from 'lucide-react';
import { CollapsibleCard } from '@/components/ui/collapsible-card';

export function FileSizeCard() {
  const { config, updateConfig } = useConfig();
  const { t } = useLanguage();

  return (
    <CollapsibleCard
      title={t('forge.fileSize.title')}
      description={t('forge.fileSize.desc')}
      icon={<HardDrive className="h-5 w-5" />}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">1 MB</span>
          <span className="text-2xl font-bold">{config.maxFileSizeMB} MB</span>
          <span className="text-sm text-muted-foreground">100 MB</span>
        </div>
        <Slider
          value={[config.maxFileSizeMB]}
          onValueChange={([value]) => updateConfig('maxFileSizeMB', value)}
          min={1}
          max={100}
          step={1}
        />
      </div>
    </CollapsibleCard>
  );
}

export function TextThresholdCard() {
  const { config, updateConfig } = useConfig();
  const { t } = useLanguage();

  return (
    <CollapsibleCard
      title={t('forge.textThreshold.title')}
      description={t('forge.textThreshold.desc')}
      icon={<FileText className="h-5 w-5" />}
      headerActions={
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{t('forge.textThreshold.tooltip')}</p>
          </TooltipContent>
        </Tooltip>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">50%</span>
          <span className="text-2xl font-bold">{Math.round(config.textThreshold * 100)}%</span>
          <span className="text-sm text-muted-foreground">100%</span>
        </div>
        <Slider
          value={[config.textThreshold * 100]}
          onValueChange={([value]) => updateConfig('textThreshold', value / 100)}
          min={50}
          max={100}
          step={1}
        />
      </div>
    </CollapsibleCard>
  );
}

export function OutputNamingCard() {
  const { config, updateConfig } = useConfig();
  const { t } = useLanguage();

  const handleModeChange = (mode: 'auto' | 'custom' | 'prompt') => {
    updateConfig('outputNaming', { ...config.outputNaming, mode });
  };

  const handlePrefixChange = (customPrefix: string) => {
    updateConfig('outputNaming', { ...config.outputNaming, customPrefix });
  };

  return (
    <CollapsibleCard
      title={t('forge.outputName.title')}
      description={t('forge.outputName.desc')}
      icon={<FileOutput className="h-5 w-5" />}
    >
      <RadioGroup
        value={config.outputNaming.mode}
        onValueChange={(v) => handleModeChange(v as 'auto' | 'custom' | 'prompt')}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="auto" id="auto" />
          <Label htmlFor="auto" className="cursor-pointer">
            {t('forge.outputName.auto')}
            <span className="block text-xs text-muted-foreground">{t('forge.outputName.autoDesc')}</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom" className="cursor-pointer">
            {t('forge.outputName.custom')}
            <span className="block text-xs text-muted-foreground">{t('forge.outputName.customDesc')}</span>
          </Label>
        </div>
        {config.outputNaming.mode === 'custom' && (
          <Input
            placeholder={t('forge.outputName.customPlaceholder')}
            value={config.outputNaming.customPrefix}
            onChange={(e) => handlePrefixChange(e.target.value)}
            className="ml-6 w-auto"
          />
        )}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="prompt" id="prompt" />
          <Label htmlFor="prompt" className="cursor-pointer">
            {t('forge.outputName.prompt')}
            <span className="block text-xs text-muted-foreground">{t('forge.outputName.promptDesc')}</span>
          </Label>
        </div>
      </RadioGroup>
    </CollapsibleCard>
  );
}
