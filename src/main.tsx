import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker } from "./lib/serviceWorker";
import { initErrorLogger } from "./lib/errorLogger";
import { enableGlobalFetchLogging } from "./lib/fetchWithLogging";
import { initPWAInstallPrompt } from "./lib/pwaInstall";
import { initWebVitals } from "./lib/webVitals";
import { setupGlobalErrorHandlers } from "./lib/errorReporter";

// Initialize error logger to capture unhandled errors
initErrorLogger();

// Setup centralized error reporting
setupGlobalErrorHandlers();

// Enable automatic network error logging for fetch calls
enableGlobalFetchLogging();

// Initialize PWA install prompt (shows after prolonged usage)
initPWAInstallPrompt();

// Track Web Vitals (LCP, FID, CLS)
initWebVitals();

// Register service worker for PWA offline support
if (import.meta.env.PROD) {
  registerServiceWorker();
}

createRoot(document.getElementById("root")!).render(<App />);
