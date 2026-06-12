import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, X, FileText, Folder } from 'lucide-react';

const sampleFiles = [
  { path: 'src/main.py', name: 'main.py' },
  { path: 'src/utils.ts', name: 'utils.ts' },
  { path: 'README.md', name: 'README.md' },
  { path: 'config.json', name: 'config.json' },
  { path: 'package.json', name: 'package.json' },
  { path: 'styles.css', name: 'styles.css' },
  { path: 'index.html', name: 'index.html' },
  { path: 'image.png', name: 'image.png' },
  { path: 'video.mp4', name: 'video.mp4' },
  { path: 'data.xlsx', name: 'data.xlsx' },
  { path: 'script.sh', name: 'script.sh' },
  { path: 'Dockerfile', name: 'Dockerfile' },
  { path: 'app.exe', name: 'app.exe' },
  { path: 'node_modules/lodash/index.js', name: 'node_modules/lodash/index.js' },
  { path: '.git/config', name: '.git/config' },
  { path: '__pycache__/main.pyc', name: '__pycache__/main.pyc' },
  { path: 'dist/bundle.js', name: 'dist/bundle.js' },
  { path: '.venv/lib/python.py', name: '.venv/lib/python.py' },
  { path: 'build/output.js', name: 'build/output.js' },
  { path: 'docs/guide.rst', name: 'docs/guide.rst' },
];

function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1 || lastDot === 0) return '';
  return filename.substring(lastDot);
}

function isInExcludedDir(path: string, excludedDirs: string[]): string | null {
  for (const dir of excludedDirs) {
    if (path.includes(`${dir}/`) || path.startsWith(`${dir}/`)) {
      return dir;
    }
  }
  return null;
}

export function FilePreviewCard() {
  const { config } = useConfig();
  const { t } = useLanguage();
  const { allowedExtensions, excludedDirs } = config;

  const analyzedFiles = sampleFiles.map(file => {
    const ext = getFileExtension(file.name);
    const excludedDir = isInExcludedDir(file.path, excludedDirs);
    
    let included = false;
    let reason = '';

    if (excludedDir) {
      reason = t('forge.preview.excludedDir').replace('{dir}', excludedDir);
    } else if (!ext) {
      reason = t('forge.preview.noExt');
    } else if (allowedExtensions.includes(ext)) {
      included = true;
      reason = t('forge.preview.allowedExt').replace('{ext}', ext);
    } else {
      reason = t('forge.preview.notIncluded').replace('{ext}', ext);
    }

    return { ...file, included, reason, excludedDir };
  });

  const includedFiles = analyzedFiles.filter(f => f.included);
  const excludedFiles = analyzedFiles.filter(f => !f.included);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('forge.preview.title')}
        </CardTitle>
        <CardDescription>
          {t('forge.preview.desc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="font-medium text-sm">
                {t('forge.preview.included')} ({includedFiles.length})
              </span>
            </div>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
              {includedFiles.map((file, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2 rounded-md bg-green-500/10 border border-green-500/20"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-sm truncate" title={file.path}>
                      {file.path}
                    </span>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs border-green-500/30 text-green-600 dark:text-green-400">
                    {getFileExtension(file.name)}
                  </Badge>
                </div>
              ))}
              {includedFiles.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  {t('forge.preview.noFiles')}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <span className="font-medium text-sm">
                {t('forge.preview.excluded')} ({excludedFiles.length})
              </span>
            </div>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
              {excludedFiles.map((file, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2 rounded-md bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {file.excludedDir ? (
                      <Folder className="h-4 w-4 text-red-500 shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 text-red-500 shrink-0" />
                    )}
                    <span className="text-sm truncate" title={file.path}>
                      {file.path}
                    </span>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs border-red-500/30 text-red-600 dark:text-red-400">
                    {file.excludedDir || getFileExtension(file.name) || 'no ext'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
