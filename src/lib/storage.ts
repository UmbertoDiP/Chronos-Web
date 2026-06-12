const SETTINGS_KEY = 'chronos_settings';

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
}

const defaultSettings: AppSettings = {
  theme: 'system',
};

// Settings Storage
export const getSettings = (): AppSettings => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = (settings: Partial<AppSettings>): void => {
  const current = getSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
};
