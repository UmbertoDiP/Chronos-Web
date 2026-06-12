import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Code, FileText, Layers, Zap, Plus, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function PresetsCard() {
  const { config, updateConfig, saveCustomPreset, deleteCustomPreset } = useConfig();
  const { t } = useLanguage();
  const [newPresetName, setNewPresetName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const builtInPresets = {
    full: {
      name: t('forge.presets.full'),
      icon: Layers,
      description: t('forge.presets.fullDesc'),
      extensions: ['.txt', '.log', '.md', '.rst', '.xml', '.html', '.svg', '.json', '.yaml', '.csv', '.py', '.js', '.ts', '.jsx', '.tsx', '.java', '.c', '.cpp', '.cs', '.go', '.rs', '.php', '.rb', '.sql', '.sh', '.bat', '.ps1', '.ini', '.cfg', '.toml', '.properties', '.css', '.scss', '.less', '.yml']
    },
    code: {
      name: t('forge.presets.code'),
      icon: Code,
      description: t('forge.presets.codeDesc'),
      extensions: ['.py', '.js', '.ts', '.jsx', '.tsx', '.java', '.c', '.cpp', '.cs', '.go', '.rs', '.php', '.rb', '.sql', '.sh', '.bat', '.ps1']
    },
    docs: {
      name: t('forge.presets.docs'),
      icon: FileText,
      description: t('forge.presets.docsDesc'),
      extensions: ['.txt', '.log', '.md', '.rst', '.csv']
    },
    web: {
      name: t('forge.presets.web'),
      icon: Zap,
      description: t('forge.presets.webDesc'),
      extensions: ['.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.json', '.xml', '.svg', '.yaml', '.yml']
    }
  };

  const applyBuiltInPreset = (presetKey: keyof typeof builtInPresets) => {
    const preset = builtInPresets[presetKey];
    updateConfig('allowedExtensions', preset.extensions);
    toast.success(t('forge.presets.applied').replace('{name}', preset.name));
  };

  const applyCustomPreset = (extensions: string[], name: string) => {
    updateConfig('allowedExtensions', extensions);
    toast.success(t('forge.presets.applied').replace('{name}', name));
  };

  const handleSavePreset = () => {
    const trimmedName = newPresetName.trim();
    if (!trimmedName) {
      toast.error(t('forge.presets.enterName'));
      return;
    }
    if (trimmedName.length > 30) {
      toast.error(t('forge.presets.maxChars'));
      return;
    }
    saveCustomPreset(trimmedName);
    toast.success(t('forge.presets.saved').replace('{name}', trimmedName));
    setNewPresetName('');
    setDialogOpen(false);
  };

  const handleDeletePreset = (id: string, name: string) => {
    deleteCustomPreset(id);
    toast.success(t('forge.presets.deleted').replace('{name}', name));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{t('forge.presets.title')}</CardTitle>
            <CardDescription>{t('forge.presets.desc')}</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                {t('forge.presets.savePreset')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('forge.presets.saveTitle')}</DialogTitle>
                <DialogDescription>{t('forge.presets.saveDesc')}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder={t('forge.presets.namePlaceholder')}
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  maxLength={30}
                  onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {t('forge.presets.currentExts')}: {config.allowedExtensions.length}
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('forge.presets.cancel')}
                </Button>
                <Button onClick={handleSavePreset}>{t('forge.presets.save')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(builtInPresets).map(([key, preset]) => {
            const Icon = preset.icon;
            return (
              <Button
                key={key}
                variant="outline"
                className="h-auto flex-col gap-2 p-4 hover:border-primary/30 hover:bg-secondary transition-all duration-200"
                onClick={() => applyBuiltInPreset(key as keyof typeof builtInPresets)}
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-semibold">{preset.name}</span>
                <span className="text-xs text-muted-foreground text-center">{preset.description}</span>
              </Button>
            );
          })}
        </div>

        {config.customPresets.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{t('forge.presets.yourPresets')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {config.customPresets.map((preset) => (
                <div key={preset.id} className="relative group">
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-2 p-4 w-full"
                    onClick={() => applyCustomPreset(preset.extensions, preset.name)}
                  >
                    <Star className="h-5 w-5" />
                    <span className="font-medium truncate max-w-full">{preset.name}</span>
                    <span className="text-xs text-muted-foreground">{preset.extensions.length} {t('forge.presets.extensions')}</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePreset(preset.id, preset.name);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
