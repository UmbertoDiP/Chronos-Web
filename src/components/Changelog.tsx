import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bug, Zap, Shield, Rocket } from 'lucide-react';

interface ChangelogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  isLatest?: boolean;
  changes: {
    type: 'feature' | 'fix' | 'improvement' | 'security';
    text: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '1.2.0',
    date: '2026-01-30',
    title: 'Cookie Compliance & UX Polish',
    isLatest: true,
    changes: [
      { type: 'feature', text: 'GDPR-compliant cookie consent management' },
      { type: 'feature', text: 'Granular cookie preferences (Analytics, Marketing, Functional)' },
      { type: 'improvement', text: 'Cookie settings now open in-page without reload' },
      { type: 'fix', text: 'Fixed white flash when reopening cookie preferences' },
      { type: 'improvement', text: 'Redesigned Pricing Modal with improved tier comparison layout' },
      { type: 'improvement', text: 'Enhanced typography and spacing across all modals' },
      { type: 'security', text: 'Full GDPR compliance for EU users' },
    ],
  },
  {
    version: '1.1.0',
    date: '2025-12-20',
    title: 'Pro Features Launch',
    changes: [
      { type: 'feature', text: 'Pro Monthly (€6.99/mo) and Annual (€3.99/mo) subscription tiers' },
      { type: 'feature', text: 'Unlimited file extraction for Pro users' },
      { type: 'feature', text: 'Advanced template system (React, Python, DevOps)' },
      { type: 'feature', text: 'Configurable split file output for large token limits' },
      { type: 'improvement', text: 'Multi-thread processing for 4x faster exports' },
      { type: 'improvement', text: 'Enhanced pricing comparison table with feature matrix' },
    ],
  },
  {
    version: '1.0.2',
    date: '2025-12-05',
    title: 'Bug Fixes & Stability',
    changes: [
      { type: 'fix', text: 'Fixed crash when displaying large FAQ sections on mobile' },
      { type: 'fix', text: 'Resolved encoding issues with non-ASCII characters' },
      { type: 'improvement', text: 'Improved page load time by 30% through asset optimization' },
      { type: 'fix', text: 'Fixed testimonial carousel navigation on touch devices' },
      { type: 'improvement', text: 'Enhanced keyboard navigation and WCAG 2.1 AA compliance' },
    ],
  },
  {
    version: '1.0.1',
    date: '2025-11-25',
    title: 'Performance & Polish',
    changes: [
      { type: 'improvement', text: 'Reduced initial page load time by 40%' },
      { type: 'improvement', text: 'Optimized font loading with preconnect' },
      { type: 'improvement', text: 'Added lazy loading for below-the-fold images' },
      { type: 'fix', text: 'Fixed mobile menu z-index issue' },
      { type: 'improvement', text: 'Improved SEO meta tags and structured data' },
      { type: 'feature', text: 'Added sitemap.xml and robots.txt' },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-11-10',
    title: 'Initial Production Release',
    changes: [
      { type: 'feature', text: 'Professional landing page for Chronos Windows app' },
      { type: 'feature', text: 'Microsoft Store integration and download links' },
      { type: 'feature', text: 'Interactive hero section with demo command' },
      { type: 'feature', text: 'Responsive design (mobile, tablet, desktop)' },
      { type: 'feature', text: 'Dark/Light mode toggle' },
      { type: 'feature', text: 'JSON-LD structured data and Open Graph meta tags' },
      { type: 'security', text: '100% local processing – no cloud uploads' },
    ],
  },
];

const typeConfig = {
  feature: { icon: Sparkles, label: 'New', color: 'bg-primary/10 text-primary' },
  fix: { icon: Bug, label: 'Fix', color: 'bg-destructive/10 text-destructive' },
  improvement: { icon: Zap, label: 'Improved', color: 'bg-warning/10 text-warning' },
  security: { icon: Shield, label: 'Security', color: 'bg-success/10 text-success' },
};

export const Changelog = ({ open, onOpenChange }: ChangelogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            Chronos Changelog
          </DialogTitle>
          <DialogDescription>
            Complete version history and release notes
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 max-h-[60vh]">
          <div className="space-y-8">
            {changelog.map((entry) => (
              <div key={entry.version} className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge 
                    variant={entry.isLatest ? "default" : "outline"} 
                    className="font-mono"
                  >
                    v{entry.version}
                  </Badge>
                  {entry.isLatest && (
                    <Badge variant="secondary" className="text-xs">
                      Latest
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg">{entry.title}</h3>
                
                <ul className="space-y-2">
                  {entry.changes.map((change, idx) => {
                    const config = typeConfig[change.type];
                    const Icon = config.icon;
                    return (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${config.color}`}>
                          <Icon className="w-3 h-3" />
                        </span>
                        <span>{change.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Changelog;
