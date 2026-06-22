import { useState, useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ExportProgressProps {
  isExporting: boolean;
  onComplete?: () => void;
}

export function ExportProgress({ isExporting, onComplete }: ExportProgressProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'exporting' | 'complete'>('idle');

  useEffect(() => {
    if (isExporting && status === 'idle') {
      setStatus('exporting');
      setProgress(0);
      
      const steps = [
        { progress: 20, delay: 100 },
        { progress: 45, delay: 200 },
        { progress: 70, delay: 150 },
        { progress: 90, delay: 100 },
        { progress: 100, delay: 150 },
      ];

      let totalDelay = 0;
      steps.forEach(({ progress: p, delay }) => {
        totalDelay += delay;
        setTimeout(() => setProgress(p), totalDelay);
      });

      setTimeout(() => {
        setStatus('complete');
        onComplete?.();
        setTimeout(() => {
          setStatus('idle');
          setProgress(0);
        }, 1500);
      }, totalDelay + 200);
    }
  }, [isExporting, status, onComplete]);

  if (status === 'idle') return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-card border rounded-lg shadow-xl p-4 min-w-[300px] animate-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3">
        {status === 'complete' ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium">
            {status === 'complete' ? 'Esportazione completata!' : 'Generazione config.json...'}
          </p>
          <Progress 
            value={progress} 
            className={cn(
              "h-2 mt-2 transition-all",
              status === 'complete' && "[&>div]:bg-green-500"
            )} 
          />
        </div>
      </div>
    </div>
  );
}
