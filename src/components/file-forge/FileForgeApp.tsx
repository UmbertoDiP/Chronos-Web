import { useState } from 'react';
import { ConfigProvider } from '@/contexts/file-forge/ConfigContext';
import { ProfilesProvider } from '@/contexts/file-forge/ProfilesContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { DragDropOverlay } from './DragDropOverlay';
import { StatsBar } from './StatsBar';
import { OnboardingTour } from './OnboardingTour';
import { useKeyboardShortcuts } from '@/hooks/file-forge/useKeyboardShortcuts';
import { ExportSettingsTab } from './export/ExportSettingsTab';
import { AboutTab } from './about/AboutTab';

function AppContent() {
  useKeyboardShortcuts();
  const [activeTab, setActiveTab] = useState('export');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-6 pb-24">
        {activeTab === 'export' && (
          <>
            <StatsBar activeTab={activeTab} />
            <ExportSettingsTab />
          </>
        )}
        {activeTab === 'about' && <AboutTab />}
      </main>

      <Footer />

      <DragDropOverlay />
      <OnboardingTour />
    </div>
  );
}

export const FileForgeApp = () => {
  return (
    <ConfigProvider>
      <ProfilesProvider>
        <AppContent />
      </ProfilesProvider>
    </ConfigProvider>
  );
};
