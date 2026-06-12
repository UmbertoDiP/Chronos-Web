import { Download, Upload, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRef } from 'react';

export function Footer() {
  const { exportConfig, importConfig, resetConfig } = useConfig();
  const { toast } = useToast();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: t('forge.footer.downloadToast.title'),
      description: t('forge.footer.downloadToast.desc'),
    });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importConfig(content);
      
      if (success) {
        toast({
          title: t('forge.footer.importToast.title'),
          description: t('forge.footer.importToast.desc'),
        });
      } else {
        toast({
          title: t('forge.footer.importError.title'),
          description: t('forge.footer.importError.desc'),
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    resetConfig();
    toast({
      title: t('forge.footer.resetToast.title'),
      description: t('forge.footer.resetToast.desc'),
    });
  };

  return (
    <footer className="sticky bottom-0 z-40 border-t bg-background/95 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="import-config"
          />
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            {t('forge.footer.import')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {t('forge.footer.reset')}
          </Button>
        </div>

        <Button onClick={handleDownload} size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
          <Download className="mr-2 h-5 w-5" />
          {t('forge.footer.download')}
        </Button>
      </div>
    </footer>
  );
}
