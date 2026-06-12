import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CustomPreset {
  id: string;
  name: string;
  extensions: string[];
}

export interface SplitFileConfig {
  enabled: boolean;
  mode: 'size' | 'files';
  maxSizeMB: number;
  maxFiles: number;
}

export interface ConfigState {
  // Export Settings
  allowedExtensions: string[];
  excludedDirs: string[];
  maxFileSizeMB: number;
  textThreshold: number;
  outputNaming: {
    mode: 'auto' | 'custom' | 'prompt';
    customPrefix: string;
  };
  splitFile: SplitFileConfig;
  // Language
  language: 'en' | 'it';
  // Custom Presets
  customPresets: CustomPreset[];
}

const defaultConfig: ConfigState = {
  allowedExtensions: ['.txt', '.log', '.md', '.rst', '.xml', '.html', '.svg', '.json', '.yaml', '.csv', '.py', '.js', '.ts', '.java', '.c', '.cpp', '.cs', '.go', '.rs', '.php', '.rb', '.sql', '.sh', '.bat', '.ps1', '.ini', '.cfg', '.toml', '.properties'],
  excludedDirs: ['.git', 'node_modules', '__pycache__', '.venv', 'dist', 'build'],
  maxFileSizeMB: 1000,
  textThreshold: 0,
  outputNaming: {
    mode: 'auto',
    customPrefix: ''
  },
  splitFile: {
    enabled: false,
    mode: 'size',
    maxSizeMB: 5,
    maxFiles: 10
  },
  language: 'en',
  customPresets: []
};

interface ConfigContextType {
  config: ConfigState;
  updateConfig: <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => void;
  resetConfig: () => void;
  importConfig: (json: string) => boolean;
  exportConfig: () => string;
  saveCustomPreset: (name: string) => void;
  deleteCustomPreset: (id: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'folderTextMerger_config';

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ConfigState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultConfig, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load config from localStorage:', e);
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  const importConfig = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      setConfig({ ...defaultConfig, ...parsed });
      return true;
    } catch {
      return false;
    }
  };

  const exportConfig = (): string => {
    return JSON.stringify(config, null, 2);
  };

  const saveCustomPreset = (name: string) => {
    const newPreset: CustomPreset = {
      id: Date.now().toString(),
      name: name.trim(),
      extensions: [...config.allowedExtensions]
    };
    setConfig(prev => ({
      ...prev,
      customPresets: [...prev.customPresets, newPreset]
    }));
  };

  const deleteCustomPreset = (id: string) => {
    setConfig(prev => ({
      ...prev,
      customPresets: prev.customPresets.filter(p => p.id !== id)
    }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig, importConfig, exportConfig, saveCustomPreset, deleteCustomPreset }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
