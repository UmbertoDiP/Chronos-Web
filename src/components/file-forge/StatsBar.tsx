import { FileText, FolderX, HardDrive, BarChart3, User, Plus, Trash2, Check, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { useConfig } from '@/contexts/file-forge/ConfigContext';
import { useProfiles } from '@/contexts/file-forge/ProfilesContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StatsBarProps {
  activeTab: string;
}

export function StatsBar({ activeTab }: StatsBarProps) {
  const { config, importConfig } = useConfig();
  const { profiles, activeProfileId, saveProfile, loadProfile, deleteProfile, setActiveProfile } = useProfiles();
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profileName, setProfileName] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stats = [
    {
      icon: FileText,
      label: t('forge.stats.extensions'),
      value: config.allowedExtensions.length,
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      sectionId: 'extensions-section'
    },
    {
      icon: FolderX,
      label: t('forge.stats.excludedDirs'),
      value: config.excludedDirs.length,
      bgColor: 'bg-destructive/10',
      iconColor: 'text-destructive',
      sectionId: 'excluded-dirs-section'
    },
    {
      icon: HardDrive,
      label: t('forge.stats.maxSize'),
      value: `${config.maxFileSizeMB}MB`,
      bgColor: 'bg-[hsl(var(--success))]/10',
      iconColor: 'text-[hsl(var(--success))]',
      sectionId: 'settings-section'
    },
    {
      icon: BarChart3,
      label: t('forge.stats.textThreshold'),
      value: `${Math.round(config.textThreshold * 100)}%`,
      bgColor: 'bg-[hsl(var(--info))]/10',
      iconColor: 'text-[hsl(var(--info))]',
      sectionId: 'settings-section'
    }
  ];

  const handleSaveProfile = () => {
    const name = profileName.trim();
    if (!name) {
      toast.error(t('forge.stats.enterName'));
      return;
    }
    saveProfile(name, config);
    toast.success(t('forge.stats.profileSaved').replace('{name}', name));
    setProfileName('');
    setDialogOpen(false);
  };

  const handleLoadProfile = (id: string, name: string) => {
    const profileConfig = loadProfile(id);
    if (profileConfig) {
      importConfig(JSON.stringify(profileConfig));
      setActiveProfile(id);
      toast.success(t('forge.stats.profileLoaded').replace('{name}', name));
    }
  };

  const handleDeleteProfile = (id: string, name: string) => {
    deleteProfile(id);
    toast.success(t('forge.stats.profileDeleted').replace('{name}', name));
  };

  const activeProfile = profiles.find(p => p.id === activeProfileId);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border shadow-sm">
      <div className={`flex items-center gap-2 flex-1 ${activeTab === 'about' ? 'hidden md:flex' : ''}`}>
        {stats.map((stat) => (
          <TooltipProvider key={stat.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => scrollToSection(stat.sectionId)}
                >
                  <div className={`p-1 rounded-md ${stat.bgColor}`}>
                    <stat.icon className={`h-3 w-3 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm font-semibold">{stat.value}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {stat.label} - {t('forge.stats.clickToGo')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="h-8 w-px bg-border hidden md:block" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5 h-8">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline font-medium text-sm">
              {activeProfile ? activeProfile.name : t('forge.stats.profiles')}
            </span>
            {activeProfile && (
              <Badge variant="secondary" className="ml-0.5 h-4 px-1 text-[10px]">
                ✓
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{t('forge.stats.savedConfigs')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {profiles.length === 0 ? (
            <div className="px-2 py-3 text-center text-sm text-muted-foreground">
              {t('forge.stats.noProfiles')}
            </div>
          ) : (
            profiles.map((profile) => (
              <DropdownMenuItem
                key={profile.id}
                className="flex items-center justify-between group"
                onSelect={(e) => e.preventDefault()}
              >
                <button
                  className="flex items-center gap-2 flex-1 text-left"
                  onClick={() => handleLoadProfile(profile.id, profile.name)}
                >
                  <FolderOpen className="h-4 w-4" />
                  <span className="truncate">{profile.name}</span>
                  {profile.id === activeProfileId && (
                    <Check className="h-4 w-4 text-primary ml-auto" />
                  )}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProfile(profile.id, profile.name);
                  }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </DropdownMenuItem>
            ))
          )}
          
          <DropdownMenuSeparator />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Plus className="h-4 w-4 mr-2" />
                {t('forge.stats.saveProfile')}
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('forge.stats.saveProfileTitle')}</DialogTitle>
                <DialogDescription>
                  {t('forge.stats.saveProfileDesc')}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder={t('forge.stats.profileName')}
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('forge.stats.cancel')}
                </Button>
                <Button onClick={handleSaveProfile}>{t('forge.stats.save')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
