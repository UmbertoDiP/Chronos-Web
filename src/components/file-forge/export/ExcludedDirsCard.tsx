import { useState } from 'react';
import { Plus, X, FolderX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { CollapsibleCard } from '@/components/ui/collapsible-card';
import { Folder } from 'lucide-react';

export function ExcludedDirsCard() {
  const { config, updateConfig } = useConfig();
  const { t } = useLanguage();
  const [newDir, setNewDir] = useState('');

  const removeDir = (dir: string) => {
    updateConfig('excludedDirs', config.excludedDirs.filter(d => d !== dir));
  };

  const addDir = () => {
    const trimmed = newDir.trim();
    if (trimmed && !config.excludedDirs.includes(trimmed)) {
      updateConfig('excludedDirs', [...config.excludedDirs, trimmed]);
      setNewDir('');
    }
  };

  return (
    <CollapsibleCard
      title={t('forge.dirs.title')}
      description={t('forge.dirs.desc')}
      icon={<FolderX className="h-5 w-5" />}
      badge={<Badge variant="secondary">{config.excludedDirs.length}</Badge>}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {config.excludedDirs.map(dir => (
            <Badge key={dir} variant="secondary" className="gap-1 py-1.5">
              <Folder className="h-3 w-3" />
              {dir}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive ml-1"
                onClick={() => removeDir(dir)}
              />
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder={t('forge.dirs.placeholder')}
            value={newDir}
            onChange={(e) => setNewDir(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addDir()}
          />
          <Button variant="outline" onClick={addDir}>
            <Plus className="mr-1 h-4 w-4" />
            {t('forge.dirs.add')}
          </Button>
        </div>
      </div>
    </CollapsibleCard>
  );
}
