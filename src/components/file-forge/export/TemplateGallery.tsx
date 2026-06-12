import { useState } from 'react';
import { 
  Code2, FileJson, Database, Smartphone, 
  Globe, Cpu, Beaker, FileText, Palette,
  Server, Blocks, Sparkles, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  nameKey: string;
  descKey: string;
  icon: React.ElementType;
  color: string;
  extensions: string[];
  excludedDirs: string[];
  tags: string[];
}

const allExtensions = [...new Set([
  '.html', '.css', '.scss', '.less', '.sass', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte',
  '.py', '.ipynb', '.go', '.rs', '.java', '.c', '.cpp', '.cs', '.rb', '.php', '.swift', '.kt', '.dart',
  '.json', '.yaml', '.yml', '.toml', '.xml', '.csv', '.sql',
  '.md', '.mdx', '.txt', '.rst', '.adoc', '.tex',
  '.sh', '.bash', '.bat', '.ps1', '.dockerfile',
  '.tf', '.hcl', '.env.example', '.svg', '.ini', '.cfg', '.properties', '.log'
])];

const allExcludedDirs = [...new Set([
  'node_modules', 'dist', 'build', '.next', '.nuxt', 'coverage',
  '__pycache__', '.venv', 'venv', '.ipynb_checkpoints', 'data', 'models',
  'vendor', 'target', 'logs', 'ios/Pods', 'android/.gradle', '.dart_tool',
  '.terraform', '.git'
])];

const templates: Template[] = [
  {
    id: 'all-inclusive', nameKey: 'forge.templates.allInclusive', descKey: 'forge.templates.allInclusiveDesc',
    icon: Sparkles, color: 'from-primary to-accent',
    extensions: allExtensions, excludedDirs: allExcludedDirs, tags: ['Completo', 'Universale']
  },
  {
    id: 'web-frontend', nameKey: 'forge.templates.webFrontend', descKey: 'forge.templates.webFrontendDesc',
    icon: Globe, color: 'from-blue-500 to-cyan-500',
    extensions: ['.html', '.css', '.scss', '.less', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.json', '.md'],
    excludedDirs: ['node_modules', 'dist', 'build', '.next', '.nuxt', 'coverage'], tags: ['React', 'Vue', 'CSS']
  },
  {
    id: 'python-ds', nameKey: 'forge.templates.pythonDS', descKey: 'forge.templates.pythonDSDesc',
    icon: Beaker, color: 'from-yellow-500 to-orange-500',
    extensions: ['.py', '.ipynb', '.csv', '.json', '.yaml', '.yml', '.md', '.txt', '.sql'],
    excludedDirs: ['__pycache__', '.venv', 'venv', '.ipynb_checkpoints', 'data', 'models'], tags: ['Python', 'ML', 'Jupyter']
  },
  {
    id: 'backend-api', nameKey: 'forge.templates.backendAPI', descKey: 'forge.templates.backendAPIDesc',
    icon: Server, color: 'from-green-500 to-emerald-500',
    extensions: ['.js', '.ts', '.py', '.go', '.rs', '.java', '.json', '.yaml', '.yml', '.sql', '.md', '.env.example'],
    excludedDirs: ['node_modules', '__pycache__', '.venv', 'vendor', 'target', 'logs'], tags: ['Node.js', 'API', 'Database']
  },
  {
    id: 'mobile-dev', nameKey: 'forge.templates.mobileDev', descKey: 'forge.templates.mobileDevDesc',
    icon: Smartphone, color: 'from-purple-500 to-pink-500',
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.dart', '.swift', '.kt', '.json', '.yaml', '.md'],
    excludedDirs: ['node_modules', 'ios/Pods', 'android/.gradle', 'build', '.dart_tool'], tags: ['React Native', 'Flutter']
  },
  {
    id: 'fullstack', nameKey: 'forge.templates.fullStack', descKey: 'forge.templates.fullStackDesc',
    icon: Cpu, color: 'from-indigo-500 to-violet-500',
    extensions: ['.html', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.py', '.go', '.java', '.sql', '.json', '.yaml', '.md', '.env.example'],
    excludedDirs: ['node_modules', '__pycache__', '.venv', 'dist', 'build', 'vendor', 'target'], tags: ['Frontend', 'Backend', 'DB']
  },
  {
    id: 'documentation', nameKey: 'forge.templates.docsOnly', descKey: 'forge.templates.docsOnlyDesc',
    icon: FileText, color: 'from-amber-500 to-yellow-500',
    extensions: ['.md', '.mdx', '.txt', '.rst', '.adoc', '.tex', '.pdf'],
    excludedDirs: ['.git', 'node_modules', '__pycache__'], tags: ['Markdown', 'Docs']
  },
  {
    id: 'devops', nameKey: 'forge.templates.devops', descKey: 'forge.templates.devopsDesc',
    icon: Blocks, color: 'from-slate-500 to-zinc-500',
    extensions: ['.sh', '.bash', '.bat', '.ps1', '.dockerfile', '.tf', '.hcl', '.yaml', '.yml', '.json', '.toml', '.ini', '.cfg', '.env.example'],
    excludedDirs: ['.terraform', '.git', 'logs', 'node_modules'], tags: ['Docker', 'CI/CD']
  }
];

export function TemplateGallery() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateConfig } = useConfig();
  const { t } = useLanguage();

  const getName = (tmpl: Template) => t(tmpl.nameKey as any);
  const getDesc = (tmpl: Template) => t(tmpl.descKey as any);

  const handleApplyTemplate = (template: Template) => {
    updateConfig('allowedExtensions', template.extensions);
    updateConfig('excludedDirs', template.excludedDirs);
    toast.success(t('forge.templates.applied').replace('{name}', getName(template)), {
      description: `${template.extensions.length} ${t('forge.templates.extsIncluded').toLowerCase()}, ${template.excludedDirs.length} ${t('forge.templates.dirsExcluded').toLowerCase()}`
    });
    setDialogOpen(false);
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <CardTitle className="text-lg">{t('forge.templates.title')}</CardTitle>
            <CardDescription>{t('forge.templates.desc')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => handlePreview(template)}
                className="group relative p-4 rounded-lg border bg-card hover:bg-secondary hover:border-primary/20 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className={cn(
                  "inline-flex p-2 rounded-lg bg-gradient-to-br mb-3 shadow-sm",
                  template.color
                )}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-sm">{getName(template)}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {getDesc(template)}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            {selectedTemplate && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "inline-flex p-3 rounded-lg bg-gradient-to-br",
                      selectedTemplate.color
                    )}>
                      <selectedTemplate.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <DialogTitle>{getName(selectedTemplate)}</DialogTitle>
                      <DialogDescription>{getDesc(selectedTemplate)}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">{t('forge.templates.extsIncluded')} ({selectedTemplate.extensions.length})</h4>
                    <ScrollArea className="h-24">
                      <div className="flex flex-wrap gap-1">
                        {selectedTemplate.extensions.map(ext => (
                          <Badge key={ext} variant="outline" className="text-xs">
                            {ext}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">{t('forge.templates.dirsExcluded')} ({selectedTemplate.excludedDirs.length})</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTemplate.excludedDirs.map(dir => (
                        <Badge key={dir} variant="secondary" className="text-xs">
                          {dir}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    {t('forge.templates.cancel')}
                  </Button>
                  <Button onClick={() => handleApplyTemplate(selectedTemplate)}>
                    {t('forge.templates.apply')}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
