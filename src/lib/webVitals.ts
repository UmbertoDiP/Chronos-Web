/**
 * Web Vitals Tracking - LCP, FID, CLS, FCP, TTFB
 */

interface WebVitalsMetric {
  name: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const thresholds = {
  LCP: [2500, 4000],
  FID: [100, 300],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
  INP: [200, 500],
};

function getRating(name: keyof typeof thresholds, value: number): 'good' | 'needs-improvement' | 'poor' {
  const [good, poor] = thresholds[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

const reportedMetrics = new Set<string>();

function reportMetric(metric: WebVitalsMetric) {
  if (reportedMetrics.has(metric.name)) return;
  reportedMetrics.add(metric.name);

  // Store locally
  try {
    const stored = JSON.parse(localStorage.getItem('clearcv_webvitals') || '{}');
    stored[metric.name] = { value: metric.value, rating: metric.rating, timestamp: Date.now() };
    localStorage.setItem('clearcv_webvitals', JSON.stringify(stored));
  } catch {}

  // Log in dev
  if (import.meta.env.DEV) {
    const color = metric.rating === 'good' ? '🟢' : metric.rating === 'needs-improvement' ? '🟡' : '🔴';
    console.log(`[WebVitals] ${color} ${metric.name}: ${metric.value.toFixed(2)}`);
  }
}

export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry) {
        reportMetric({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: getRating('LCP', lastEntry.startTime),
        });
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {}

  // First Input Delay
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as any;
      if (firstEntry) {
        const value = firstEntry.processingStart - firstEntry.startTime;
        reportMetric({
          name: 'FID',
          value,
          rating: getRating('FID', value),
        });
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch {}

  // Cumulative Layout Shift
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Report CLS on page hide
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportMetric({
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
        });
      }
    }, { once: true });
  } catch {}

  // First Contentful Paint & TTFB
  try {
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric({
            name: 'FCP',
            value: entry.startTime,
            rating: getRating('FCP', entry.startTime),
          });
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });
  } catch {}

  // Time to First Byte
  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      reportMetric({
        name: 'TTFB',
        value: ttfb,
        rating: getRating('TTFB', ttfb),
      });
    }
  } catch {}
}

export function getWebVitals(): Record<string, { value: number; rating: string }> {
  try {
    return JSON.parse(localStorage.getItem('clearcv_webvitals') || '{}');
  } catch {
    return {};
  }
}
