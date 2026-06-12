/**
 * Analytics utility for tracking user actions.
 * Designed to be lightweight and privacy-friendly.
 */

export type AnalyticsEvent = 
  | 'cv_created'
  | 'cv_saved'
  | 'cv_exported'
  | 'cv_published'
  | 'cv_duplicated'
  | 'cv_deleted'
  | 'cv_loaded'
  | 'template_changed'
  | 'section_added'
  | 'section_removed'
  | 'section_opened'
  | 'ai_import_started'
  | 'ai_import_completed'
  | 'ai_improve_used'
  | 'ai_suggestion_shown'
  | 'ai_suggestion_applied'
  | 'photo_uploaded'
  | 'photo_cropped'
  | 'undo_action'
  | 'redo_action'
  | 'keyboard_shortcut_used'
  | 'preview_opened'
  | 'export_format_selected'
  | 'layout_customized'
  | 'login'
  | 'signup'
  | 'logout'
  | 'premium_upgrade_started'
  | 'premium_upgrade_completed'
  | 'onboarding_started'
  | 'onboarding_completed'
  | 'onboarding_skipped'
  | 'error_occurred'
  // Conversion funnel events
  | 'funnel_landing_view'
  | 'funnel_signup_started'
  | 'funnel_signup_completed'
  | 'funnel_first_cv_created'
  | 'funnel_first_export'
  | 'funnel_premium_view'
  | 'funnel_premium_started'
  | 'funnel_premium_completed'
  | 'funnel_referral_shared'
  | 'funnel_referral_converted'
  // GDPR events
  | 'gdpr_data_export_requested'
  | 'gdpr_data_export_completed'
  | 'gdpr_consent_given'
  | 'gdpr_consent_withdrawn';

interface AnalyticsPayload {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
}

// In-memory buffer for batching events
const eventBuffer: AnalyticsPayload[] = [];
const BUFFER_SIZE = 10;
const FLUSH_INTERVAL = 30000; // 30 seconds

let flushTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Track an analytics event
 */
export function track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>): void {
  const payload: AnalyticsPayload = {
    event,
    properties: {
      ...properties,
      // Add common properties
      url: typeof window !== 'undefined' ? window.location.pathname : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 100) : '',
    },
    timestamp: Date.now(),
  };

  // Log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', payload);
  }

  eventBuffer.push(payload);

  // Flush if buffer is full
  if (eventBuffer.length >= BUFFER_SIZE) {
    flush();
  }

  // Start flush timer if not running
  if (!flushTimer) {
    flushTimer = setTimeout(flush, FLUSH_INTERVAL);
  }
}

/**
 * Flush buffered events to storage/server
 */
export function flush(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }

  if (eventBuffer.length === 0) return;

  // Get events to flush
  const events = [...eventBuffer];
  eventBuffer.length = 0;

  // Store locally for now (could be sent to server)
  try {
    const stored = localStorage.getItem('clearcv_analytics') || '[]';
    const existing = JSON.parse(stored);
    const combined = [...existing, ...events].slice(-100); // Keep last 100
    localStorage.setItem('clearcv_analytics', JSON.stringify(combined));
  } catch (e) {
    console.error('[Analytics] Failed to store events:', e);
  }
}

/**
 * Get stored analytics events
 */
export function getStoredEvents(): AnalyticsPayload[] {
  try {
    const stored = localStorage.getItem('clearcv_analytics');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Clear stored analytics
 */
export function clearStoredEvents(): void {
  localStorage.removeItem('clearcv_analytics');
}

/**
 * Track page view
 */
export function trackPageView(page: string): void {
  track('cv_created', { page, type: 'page_view' });
}

// Flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', flush);
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flush();
    }
  });
}

export default { track, flush, getStoredEvents, clearStoredEvents };
