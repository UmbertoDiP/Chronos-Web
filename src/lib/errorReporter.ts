/**
 * Centralized error reporting utility.
 * In production, this can be configured to send errors to Sentry or similar services.
 * Currently stores errors locally and logs them.
 */

import { logger } from './logger';

interface ErrorReport {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  timestamp: number;
  url: string;
  userAgent: string;
}

const MAX_STORED_ERRORS = 50;
const STORAGE_KEY = 'clearcv_errors';

/**
 * Report an error for tracking
 */
export function reportError(
  error: Error | string,
  context?: Record<string, unknown>
): void {
  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;

  const report: ErrorReport = {
    message: errorMessage,
    stack: errorStack,
    context,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 150) : '',
  };

  // Log in development
  logger.error('[ErrorReporter]', errorMessage, context);

  // Store locally
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const errors: ErrorReport[] = stored ? JSON.parse(stored) : [];
    errors.push(report);
    
    // Keep only last N errors
    const trimmed = errors.slice(-MAX_STORED_ERRORS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    logger.error('[ErrorReporter] Failed to store error:', e);
  }

  // In production, this is where you'd send to Sentry/external service
  // if (import.meta.env.PROD && window.Sentry) {
  //   window.Sentry.captureException(error, { extra: context });
  // }
}

/**
 * Get stored error reports
 */
export function getStoredErrors(): ErrorReport[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Clear stored errors
 */
export function clearStoredErrors(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Setup global error handlers
 */
export function setupGlobalErrorHandlers(): void {
  if (typeof window === 'undefined') return;

  // Unhandled errors
  window.addEventListener('error', (event) => {
    reportError(event.error || event.message, {
      type: 'unhandled_error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    reportError(error, {
      type: 'unhandled_rejection',
    });
  });
}

export default { reportError, getStoredErrors, clearStoredErrors, setupGlobalErrorHandlers };
