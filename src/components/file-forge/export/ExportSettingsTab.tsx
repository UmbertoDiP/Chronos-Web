import { ExtensionsCard } from './ExtensionsCard';
import { ExcludedDirsCard } from './ExcludedDirsCard';
import { FileSizeCard, TextThresholdCard, OutputNamingCard } from './SettingsCards';
import { PresetsCard } from './PresetsCard';
import { FilePreviewCard } from './FilePreviewCard';
import { SplitFileCard } from './SplitFileCard';
import { TemplateGallery } from './TemplateGallery';

export function ExportSettingsTab() {
  return (
    <div className="space-y-6">
      <PresetsCard />
      <div id="extensions-section">
        <ExtensionsCard />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div id="excluded-dirs-section">
          <ExcludedDirsCard />
        </div>
        <div id="settings-section" className="space-y-6">
          <FileSizeCard />
          <TextThresholdCard />
        </div>
      </div>
      
      <OutputNamingCard />
      <SplitFileCard />
      <FilePreviewCard />
      <TemplateGallery />
    </div>
  );
}
