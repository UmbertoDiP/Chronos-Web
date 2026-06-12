/**
 * PWA Install Prompt Manager
 * Shows install suggestion after prolonged app usage
 */

import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const STORAGE_KEY = 'clearcv_pwa_install';
const MIN_USAGE_TIME_MS = 3 * 60 * 1000; // 3 minutes of usage
const MIN_SESSIONS = 2; // Show after 2nd session
const DISMISS_COOLDOWN_DAYS = 7; // Don't show again for 7 days after dismiss

interface InstallState {
  sessionCount: number;
  totalUsageMs: number;
  lastDismissed: string | null;
  installed: boolean;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let sessionStartTime = Date.now();

const getState = (): InstallState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return { sessionCount: 0, totalUsageMs: 0, lastDismissed: null, installed: false };
};

const saveState = (state: InstallState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const canShowPrompt = (): boolean => {
  const state = getState();
  
  // Already installed
  if (state.installed) return false;
  
  // Check if dismissed recently
  if (state.lastDismissed) {
    const dismissedDate = new Date(state.lastDismissed);
    const daysSinceDismiss = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceDismiss < DISMISS_COOLDOWN_DAYS) return false;
  }
  
  // Check usage requirements
  const currentSessionTime = Date.now() - sessionStartTime;
  const totalUsage = state.totalUsageMs + currentSessionTime;
  
  return state.sessionCount >= MIN_SESSIONS && totalUsage >= MIN_USAGE_TIME_MS;
};

const showInstallToast = (): void => {
  if (!deferredPrompt) return;
  
  toast('📱 Installa Chronos', {
    description: 'Aggiungi l\'app alla schermata Home per un accesso rapido!',
    duration: 10000,
    action: {
      label: 'Installa',
      onClick: async () => {
        if (!deferredPrompt) return;
        
        try {
          await deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          
          if (outcome === 'accepted') {
            const state = getState();
            saveState({ ...state, installed: true });
            toast.success('App installata! 🎉');
          } else {
            const state = getState();
            saveState({ ...state, lastDismissed: new Date().toISOString() });
          }
        } catch (error) {
          console.error('[PWA] Install prompt failed:', error);
        }
        
        deferredPrompt = null;
      },
    },
    cancel: {
      label: 'Non ora',
      onClick: () => {
        const state = getState();
        saveState({ ...state, lastDismissed: new Date().toISOString() });
      },
    },
  });
};

export const initPWAInstallPrompt = (): void => {
  // Capture the install prompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    
    // Check if we should show the prompt
    if (canShowPrompt()) {
      // Delay a bit more for better UX
      setTimeout(showInstallToast, 5000);
    }
  });
  
  // Track when app is installed
  window.addEventListener('appinstalled', () => {
    const state = getState();
    saveState({ ...state, installed: true });
    deferredPrompt = null;
  });
  
  // Update session count on init
  const state = getState();
  saveState({ ...state, sessionCount: state.sessionCount + 1 });
  sessionStartTime = Date.now();
  
  // Save usage time when leaving
  const saveUsageTime = () => {
    const currentState = getState();
    const sessionTime = Date.now() - sessionStartTime;
    saveState({ ...currentState, totalUsageMs: currentState.totalUsageMs + sessionTime });
  };
  
  window.addEventListener('beforeunload', saveUsageTime);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      saveUsageTime();
      sessionStartTime = Date.now(); // Reset for next visible period
    }
  });
  
  // Check periodically if conditions are met
  const checkInterval = setInterval(() => {
    if (deferredPrompt && canShowPrompt()) {
      showInstallToast();
      clearInterval(checkInterval);
    }
  }, 60000); // Check every minute
};

// Manual trigger for testing or explicit install button
export const triggerInstallPrompt = async (): Promise<boolean> => {
  if (!deferredPrompt) return false;
  
  try {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      const state = getState();
      saveState({ ...state, installed: true });
      return true;
    }
  } catch (error) {
    console.error('[PWA] Install prompt failed:', error);
  }
  
  return false;
};

export const isPWAInstalled = (): boolean => {
  // Check display mode
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  // Check iOS standalone
  if ((navigator as any).standalone === true) return true;
  // Check stored state
  return getState().installed;
};
