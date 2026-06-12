import { useEffect, useCallback } from 'react';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useToast } from '@/hooks/use-toast';

export function useKeyboardShortcuts() {
  const { exportConfig, resetConfig } = useConfig();
  const { toast } = useToast();

  const downloadConfig = useCallback(() => {
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
      title: 'Configurazione esportata',
      description: 'File config.json scaricato (Ctrl+E)'
    });
  }, [exportConfig, toast]);

  const handleReset = useCallback(() => {
    resetConfig();
    toast({
      title: 'Configurazione resettata',
      description: 'Impostazioni ripristinate ai valori predefiniti (Ctrl+R)'
    });
  }, [resetConfig, toast]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se si sta digitando in un input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Ctrl+E - Esporta
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        downloadConfig();
      }

      // Ctrl+R - Reset (custom, non refresh)
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [downloadConfig, handleReset]);

  return { downloadConfig, handleReset };
}
