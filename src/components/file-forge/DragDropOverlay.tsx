import { useState, useEffect, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function DragDropOverlay() {
  const [isDragging, setIsDragging] = useState(false);
  const { importConfig } = useConfig();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.types.includes('Files')) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === document.body || (e.target as Element)?.classList?.contains('drag-overlay')) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.endsWith('.json')) {
      toast({
        title: t('forge.drag.invalidFile'),
        description: t('forge.drag.invalidFileDesc'),
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importConfig(content);
      if (success) {
        toast({
          title: t('forge.drag.imported'),
          description: `File "${file.name}" loaded`
        });
      } else {
        toast({
          title: t('forge.drag.importError'),
          description: t('forge.drag.importErrorDesc'),
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  }, [importConfig, toast, t]);

  useEffect(() => {
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  if (!isDragging) return null;

  return (
    <div 
      className="drag-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm border-4 border-dashed border-primary"
    >
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <div className="rounded-full bg-primary/10 p-6">
          <Upload className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{t('forge.drag.title')}</h3>
          <p className="text-muted-foreground mt-1">
            {t('forge.drag.desc')}
          </p>
        </div>
      </div>
    </div>
  );
}
