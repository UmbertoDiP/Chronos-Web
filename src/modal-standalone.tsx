import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PricingModal } from "@/components/PricingModal";
import "@/index.css";

console.log("[ModalStandalone] Starting initialization...");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get("language") || "en";
const trialRemaining = parseInt(urlParams.get("trial") || "3", 10);

console.log("[ModalStandalone] Config:", { language, trialRemaining });

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("[ModalStandalone] Error boundary caught:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("[ModalStandalone] Error details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "20px",
          background: "#fee",
          color: "#c00",
          fontFamily: "monospace"
        }}>
          <h2>Error loading modal</h2>
          <pre>{this.state.error?.message}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const ModalApp = () => {
  console.log("[ModalStandalone] ModalApp rendering...");

  const handleClose = () => {
    console.log("[Modal] Close requested");
    // Emit event for PyQt6 bridge
    window.dispatchEvent(new CustomEvent('lovable:close-requested', {}));
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider initialLanguage={language as "en" | "it"}>
            <PricingModal
              isOpen={true}
              onClose={handleClose}
              trialRemaining={trialRemaining}
            />
          </LanguageProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const rootElement = document.getElementById("modal-root");
console.log("[ModalStandalone] Root element:", rootElement);

if (!rootElement) {
  console.error("[ModalStandalone] ERROR: modal-root element not found!");
  document.body.innerHTML = '<div style="padding:20px;color:red;">ERROR: modal-root not found</div>';
} else {
  console.log("[ModalStandalone] Creating React root...");
  const root = ReactDOM.createRoot(rootElement);
  console.log("[ModalStandalone] Rendering app...");
  root.render(
    <React.StrictMode>
      <ModalApp />
    </React.StrictMode>
  );
  console.log("[ModalStandalone] Render complete");
}
