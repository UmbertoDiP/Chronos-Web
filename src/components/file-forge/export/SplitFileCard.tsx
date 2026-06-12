import { Scissors, ShieldCheck, HardDrive, FileStack } from 'lucide-react';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { CollapsibleCard } from '@/components/ui/collapsible-card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export function SplitFileCard() {
  const { config, updateConfig } = useConfig();
  const { t } = useLanguage();
  const { splitFile } = config;

  const handleToggle = (enabled: boolean) => {
    updateConfig('splitFile', { ...splitFile, enabled });
  };

  const handleModeChange = (mode: 'size' | 'files') => {
    updateConfig('splitFile', { ...splitFile, mode });
  };

  const handleSizeChange = (value: number[]) => {
    updateConfig('splitFile', { ...splitFile, maxSizeMB: value[0] });
  };

  const handleFilesChange = (value: number[]) => {
    updateConfig('splitFile', { ...splitFile, maxFiles: value[0] });
  };

  return (
    <CollapsibleCard
      title={t('forge.split.title')}
      icon={<Scissors className="h-5 w-5 text-primary" />}
      defaultOpen={true}
      className="split-file-card"
    >
      <div className="space-y-4">
        <Alert className="bg-primary/5 border-primary/20">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            {t('forge.split.hint')}
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="split-enabled" className="text-sm font-medium">
              {t('forge.split.enable')}
            </Label>
            <p className="text-xs text-muted-foreground">
              {t('forge.split.enableDesc')}
            </p>
          </div>
          <Switch
            id="split-enabled"
            checked={splitFile.enabled}
            onCheckedChange={handleToggle}
          />
        </div>

        <div className={cn(
          "space-y-4 transition-opacity",
          !splitFile.enabled && "opacity-50 pointer-events-none"
        )}>
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t('forge.split.mode')}</Label>
            <RadioGroup
              value={splitFile.mode}
              onValueChange={(v) => handleModeChange(v as 'size' | 'files')}
              className="grid grid-cols-2 gap-3"
            >
              <div className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                splitFile.mode === 'size' 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              )}>
                <RadioGroupItem value="size" id="split-size" />
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="split-size" className="cursor-pointer text-sm">
                    {t('forge.split.bySize')}
                  </Label>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                splitFile.mode === 'files' 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              )}>
                <RadioGroupItem value="files" id="split-files" />
                <div className="flex items-center gap-2">
                  <FileStack className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="split-files" className="cursor-pointer text-sm">
                    {t('forge.split.byFiles')}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {splitFile.mode === 'size' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{t('forge.split.maxSize')}</Label>
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={splitFile.maxSizeMB}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      updateConfig('splitFile', { ...splitFile, maxSizeMB: Math.max(1, val) });
                    }}
                    className="w-20 h-8 text-sm font-mono text-right"
                    min={1}
                  />
                  <span className="text-sm text-muted-foreground">MB</span>
                </div>
              </div>
              <Slider
                value={[Math.min(splitFile.maxSizeMB, 500)]}
                onValueChange={handleSizeChange}
                min={1}
                max={500}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {t('forge.split.maxSizeDesc').replace('{size}', String(splitFile.maxSizeMB))}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">{t('forge.split.maxFiles')}</Label>
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={splitFile.maxFiles}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 2;
                      updateConfig('splitFile', { ...splitFile, maxFiles: Math.max(2, val) });
                    }}
                    className="w-20 h-8 text-sm font-mono text-right"
                    min={2}
                  />
                  <span className="text-sm text-muted-foreground">file</span>
                </div>
              </div>
              <Slider
                value={[Math.min(splitFile.maxFiles, 1000)]}
                onValueChange={handleFilesChange}
                min={2}
                max={1000}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {t('forge.split.maxFilesDesc').replace('{count}', String(splitFile.maxFiles))}
              </p>
            </div>
          )}
        </div>
      </div>
    </CollapsibleCard>
  );
}
