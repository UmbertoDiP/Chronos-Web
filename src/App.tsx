import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CookieConsent } from "@/components/CookieConsent";
import { SkipToContent } from "@/components/SkipToContent";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import { FounderFloatingButton } from "@/components/FounderFloatingButton";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AdminWaitlist = lazy(() => import("./pages/AdminWaitlist"));
const SeoTest = lazy(() => import("./pages/SeoTest"));
const UseCasePage = lazy(() => import("./pages/UseCasePage"));

// Optimized QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

// Global error fallback
const GlobalErrorFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
    <div className="text-6xl mb-4">😵</div>
    <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
    <p className="text-muted-foreground mb-4 max-w-md">
      An unexpected error occurred. Please reload the page to continue.
    </p>
    <button 
      onClick={() => window.location.reload()}
      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
    >
      Reload page
    </button>
  </div>
);

// Language route wrapper
const LanguageRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/admin/waitlist" element={<AdminWaitlist />} />
      <Route path="/seo-test" element={<SeoTest />} />
      <Route path="/use-cases/:slug" element={<UseCasePage />} />

      {/* Localized routes */}
      <Route path="/:lang" element={<Index />} />
      <Route path="/:lang/privacy" element={<PrivacyPolicy />} />
      <Route path="/:lang/terms" element={<TermsOfService />} />
      <Route path="/:lang/use-cases/:slug" element={<UseCasePage />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const App = () => (
  <ErrorBoundary fallback={<GlobalErrorFallback />} section="App">
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <main id="main-content">
                <LanguageRoutes />
              </main>
              <FounderFloatingButton />
              {/* <CookieConsent /> TEST: temporarily disabled to debug ">" bug */}
            </TooltipProvider>
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
