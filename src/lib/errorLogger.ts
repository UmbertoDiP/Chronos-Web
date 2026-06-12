/**
 * Internal Error Logger with automatic cleanup
 * Stores errors locally for debugging purposes
 */

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  type: 'error' | 'unhandledRejection' | 'componentError' | 'networkError' | 'customError';
  message: string;
  stack?: string;
  componentName?: string;
  url?: string;
  userAgent?: string;
  additionalInfo?: Record<string, unknown>;
}

interface ErrorLogStore {
  logs: ErrorLogEntry[];
  lastCleanup: string;
  cleanupIntervalDays: number;
}

const STORAGE_KEY = 'clearcv_error_logs';
const DEFAULT_CLEANUP_INTERVAL = 7; // days
const MAX_LOGS = 100; // prevent memory bloat

const getStore = (): ErrorLogStore => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Failed to read error log store:', e);
  }
  return {
    logs: [],
    lastCleanup: new Date().toISOString(),
    cleanupIntervalDays: DEFAULT_CLEANUP_INTERVAL,
  };
};

const saveStore = (store: ErrorLogStore): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.warn('Failed to save error log store:', e);
    // If storage is full, clear old logs and try again
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      const cleanedStore = { ...store, logs: store.logs.slice(-20) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedStore));
      } catch {
        // Give up if still failing
      }
    }
  }
};

const shouldCleanup = (store: ErrorLogStore): boolean => {
  const lastCleanup = new Date(store.lastCleanup);
  const now = new Date();
  const daysSinceCleanup = (now.getTime() - lastCleanup.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceCleanup >= store.cleanupIntervalDays;
};

const performCleanup = (store: ErrorLogStore): ErrorLogStore => {
  return {
    ...store,
    logs: [],
    lastCleanup: new Date().toISOString(),
  };
};

export const logError = (
  type: ErrorLogEntry['type'],
  message: string,
  options?: {
    stack?: string;
    componentName?: string;
    additionalInfo?: Record<string, unknown>;
  }
): void => {
  const store = getStore();
  
  // Auto-cleanup if interval passed
  const cleanedStore = shouldCleanup(store) ? performCleanup(store) : store;
  
  const entry: ErrorLogEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type,
    message,
    stack: options?.stack,
    componentName: options?.componentName,
    url: window.location.href,
    userAgent: navigator.userAgent,
    additionalInfo: options?.additionalInfo,
  };
  
  // Add new log, keeping max limit
  const logs = [...cleanedStore.logs, entry].slice(-MAX_LOGS);
  
  saveStore({ ...cleanedStore, logs });
};

export const getErrorLogs = (): ErrorLogEntry[] => {
  return getStore().logs;
};

export const clearErrorLogs = (): void => {
  saveStore({
    logs: [],
    lastCleanup: new Date().toISOString(),
    cleanupIntervalDays: DEFAULT_CLEANUP_INTERVAL,
  });
};

export const setCleanupInterval = (days: number): void => {
  const store = getStore();
  saveStore({ ...store, cleanupIntervalDays: Math.max(1, Math.min(30, days)) });
};

export const getLogStats = (): { count: number; oldestLog: string | null; lastCleanup: string } => {
  const store = getStore();
  return {
    count: store.logs.length,
    oldestLog: store.logs[0]?.timestamp || null,
    lastCleanup: store.lastCleanup,
  };
};

// Global error handlers - call this once at app initialization
export const initErrorLogger = (): void => {
  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    logError('error', event.message, {
      stack: event.error?.stack,
      additionalInfo: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    });
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || String(event.reason);
    logError('unhandledRejection', message, {
      stack: event.reason?.stack,
    });
  });
  
  // Check for cleanup on init
  const store = getStore();
  if (shouldCleanup(store)) {
    saveStore(performCleanup(store));
    console.info('[ErrorLogger] Auto-cleanup performed');
  }
};

// Helper for logging component errors (use in ErrorBoundary)
export const logComponentError = (error: Error, componentName: string): void => {
  logError('componentError', error.message, {
    stack: error.stack,
    componentName,
  });
};

// Helper for network errors
export const logNetworkError = (url: string, status: number, message: string): void => {
  logError('networkError', message, {
    additionalInfo: { url, status },
  });
};
