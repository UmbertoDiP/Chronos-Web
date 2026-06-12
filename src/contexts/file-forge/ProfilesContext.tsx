import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConfigState } from './ConfigContext';

export interface ConfigProfile {
  id: string;
  name: string;
  createdAt: Date;
  config: Partial<ConfigState>;
}

interface ProfilesContextType {
  profiles: ConfigProfile[];
  activeProfileId: string | null;
  saveProfile: (name: string, config: ConfigState) => void;
  loadProfile: (id: string) => ConfigState | null;
  deleteProfile: (id: string) => void;
  renameProfile: (id: string, newName: string) => void;
  setActiveProfile: (id: string | null) => void;
}

const ProfilesContext = createContext<ProfilesContextType | undefined>(undefined);

const PROFILES_STORAGE_KEY = 'chronos_profiles';
const ACTIVE_PROFILE_KEY = 'chronos_active_profile';

export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<ConfigProfile[]>(() => {
    try {
      const saved = localStorage.getItem(PROFILES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved).map((p: ConfigProfile) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        }));
      }
    } catch (e) {
      console.error('Failed to load profiles:', e);
    }
    return [];
  });

  const [activeProfileId, setActiveProfileId] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  });

  useEffect(() => {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (activeProfileId) {
      localStorage.setItem(ACTIVE_PROFILE_KEY, activeProfileId);
    } else {
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
    }
  }, [activeProfileId]);

  const saveProfile = (name: string, config: ConfigState) => {
    const newProfile: ConfigProfile = {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: new Date(),
      config
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const loadProfile = (id: string): ConfigState | null => {
    const profile = profiles.find(p => p.id === id);
    return profile ? profile.config as ConfigState : null;
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (activeProfileId === id) {
      setActiveProfileId(null);
    }
  };

  const renameProfile = (id: string, newName: string) => {
    setProfiles(prev => prev.map(p => 
      p.id === id ? { ...p, name: newName.trim() } : p
    ));
  };

  const setActiveProfile = (id: string | null) => {
    setActiveProfileId(id);
  };

  return (
    <ProfilesContext.Provider value={{
      profiles,
      activeProfileId,
      saveProfile,
      loadProfile,
      deleteProfile,
      renameProfile,
      setActiveProfile
    }}>
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfilesContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfilesProvider');
  }
  return context;
}