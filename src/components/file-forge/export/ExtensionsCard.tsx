import { useState } from 'react';
import { Search, Plus, X, CheckSquare, Square, FileCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { CollapsibleCard } from '@/components/ui/collapsible-card';
import { cn } from '@/lib/utils';

const EXTENSION_CATEGORIES_KEYS = {
  'forge.ext.catText': ['.txt', '.log', '.md', '.rst'],
  'forge.ext.catMarkup': ['.xml', '.html', '.svg', '.json', '.yaml', '.yml', '.csv'],
  'forge.ext.catCode': ['.py', '.js', '.ts', '.jsx', '.tsx', '.java', '.c', '.cpp', '.cs', '.go', '.rs', '.php', '.rb', '.sql'],
  'forge.ext.catScripts': ['.sh', '.bat', '.ps1'],
  'forge.ext.catConfig': ['.ini', '.cfg', '.toml', '.properties', '.env'],
} as const;

const ALL_EXTENSIONS = Object.values(EXTENSION_CATEGORIES_KEYS).flat();

export function ExtensionsCard() {
  const { config, updateConfig } = useConfig();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [customExt, setCustomExt] = useState('');

  const toggleExtension = (ext: string) => {
    const newExtensions = config.allowedExtensions.includes(ext)
      ? config.allowedExtensions.filter(e => e !== ext)
      : [...config.allowedExtensions, ext];
    updateConfig('allowedExtensions', newExtensions);
  };

  const selectAll = () => {
    const allExts = [...new Set([...ALL_EXTENSIONS, ...config.allowedExtensions])];
    updateConfig('allowedExtensions', allExts);
  };

  const deselectAll = () => {
    updateConfig('allowedExtensions', []);
  };

  const addCustomExtension = () => {
    const ext = customExt.startsWith('.') ? customExt : `.${customExt}`;
    if (ext.length > 1 && !config.allowedExtensions.includes(ext)) {
      updateConfig('allowedExtensions', [...config.allowedExtensions, ext]);
      setCustomExt('');
    }
  };

  const customExtensions = config.allowedExtensions.filter(
    ext => !(ALL_EXTENSIONS as readonly string[]).includes(ext)
  );

  const filteredCategories = Object.entries(EXTENSION_CATEGORIES_KEYS).map(([catKey, exts]) => ({
    category: t(catKey as any),
    extensions: (exts as readonly string[]).filter(ext => ext.toLowerCase().includes(search.toLowerCase()))
  })).filter(c => c.extensions.length > 0);

  return (
    <CollapsibleCard
      title={t('forge.ext.title')}
      description={t('forge.ext.desc')}
      icon={<FileCode className="h-5 w-5" />}
      badge={<Badge variant="secondary">{config.allowedExtensions.length}</Badge>}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('forge.ext.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" onClick={selectAll}>
            <CheckSquare className="mr-1 h-4 w-4" />
            {t('forge.ext.selectAll')}
          </Button>
          <Button variant="outline" size="sm" onClick={deselectAll}>
            <Square className="mr-1 h-4 w-4" />
            {t('forge.ext.selectNone')}
          </Button>
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {filteredCategories.map(({ category, extensions }) => (
            <div key={category}>
              <h4 className="font-medium text-sm mb-2 text-muted-foreground">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {extensions.map(ext => (
                  <label
                    key={ext}
                    className={cn(
                      'flex items-center gap-1.5 px-2 py-1 rounded-md border cursor-pointer transition-colors',
                      config.allowedExtensions.includes(ext)
                        ? 'bg-primary/10 border-primary'
                        : 'bg-muted/50 border-transparent hover:border-muted-foreground/30'
                    )}
                  >
                    <Checkbox
                      checked={config.allowedExtensions.includes(ext)}
                      onCheckedChange={() => toggleExtension(ext)}
                      className="h-3.5 w-3.5"
                    />
                    <span className="text-sm font-mono">{ext}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {customExtensions.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 text-muted-foreground">{t('forge.ext.custom')}</h4>
            <div className="flex flex-wrap gap-2">
              {customExtensions.map(ext => (
                <Badge key={ext} variant="outline" className="gap-1">
                  {ext}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => toggleExtension(ext)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t">
          <Input
            placeholder={t('forge.ext.addPlaceholder')}
            value={customExt}
            onChange={(e) => setCustomExt(e.target.value)}
            className="w-32 font-mono"
            onKeyDown={(e) => e.key === 'Enter' && addCustomExtension()}
          />
          <Button variant="outline" size="sm" onClick={addCustomExtension}>
            <Plus className="mr-1 h-4 w-4" />
            {t('forge.ext.add')}
          </Button>
        </div>
      </div>
    </CollapsibleCard>
  );
}
