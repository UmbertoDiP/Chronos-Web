import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings2, FolderOpen } from "lucide-react";
import { PricingModal } from "./PricingModal";
import { FileForgeModal } from "./file-forge/FileForgeModal";

const COOKIE_CONSENT_KEY = "chronos_cookie_consent";

/**
 * Floating button visible ONLY in development mode.
 * Used by the founder to preview and iterate on the pricing modal.
 * This component will NOT render in production builds.
 */
export const FounderFloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isForgeModalOpen, setIsForgeModalOpen] = useState(false);
  const [bottomPx, setBottomPx] = useState<number>(80);

  // Show while working inside Lovable preview, hide on published/exported builds.
  // In-editor preview typically runs on *.lovableproject.com with a __lovable_token param.
  const isLovablePreview = (() => {
    if (typeof window === "undefined") return false;
    const host = window.location.hostname;
    const hasLovableToken = new URLSearchParams(window.location.search).has("__lovable_token");

    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith("lovableproject.com") ||
      (host.endsWith("lovable.app") && hasLovableToken)
    );
  })();

  // Keep the button visible even when other fixed bottom UI shows up
  // (cookie banner, mobile sticky CTA). This avoids the "sometimes I see it" effect.
  useEffect(() => {
    const computeBottom = () => {
      const hasConsent = typeof localStorage !== "undefined" && !!localStorage.getItem(COOKIE_CONSENT_KEY);
      const cookieBannerLikelyVisible = !hasConsent; // banner appears ~2s after load when consent missing

      const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;
      const mobileStickyCtaLikelyVisible = isMobile && window.scrollY > 500;

      // Base: roughly Tailwind bottom-20 (5rem = 80px)
      // Raise when overlays may cover it.
      const base = 80;
      const cookieOffset = cookieBannerLikelyVisible ? 176 : 0; // keep above the cookie banner height
      const ctaOffset = mobileStickyCtaLikelyVisible ? 96 : 0; // keep above sticky CTA

      setBottomPx(Math.max(base, base + cookieOffset, base + ctaOffset));
    };

    computeBottom();

    const onScroll = () => computeBottom();
    const onResize = () => computeBottom();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("cookieConsentChanged", computeBottom as EventListener);

    // Cookie banner appears with a delay; re-check after it would mount.
    const timer = window.setTimeout(computeBottom, 2200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("cookieConsentChanged", computeBottom as EventListener);
      window.clearTimeout(timer);
    };
  }, []);

  if (!isLovablePreview) { return null; }

  return (
    <>
      {/* Floating Buttons - Hidden when any modal is open */}
      {!isModalOpen && !isForgeModalOpen && (
        <>
          {/* Pricing Button - Left */}
          <motion.button
            initial={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed left-6 z-[1000] w-14 h-14 rounded-full bg-gradient-to-br from-accent to-primary text-primary-foreground shadow-lg flex items-center justify-center"
            style={{
              bottom: `calc(${bottomPx}px + env(safe-area-inset-bottom))`,
              boxShadow: "0 0 20px hsl(312 80% 45% / 0.4), 0 0 40px hsl(186 100% 38% / 0.3)",
            }}
            title="Open Pricing Modal (Dev Only)"
          >
            <Settings2 className="w-6 h-6" />
          </motion.button>

          {/* Chronos Studio Button - Right */}
          <motion.button
            initial={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsForgeModalOpen(true)}
            className="fixed right-6 z-[1000] w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg flex items-center justify-center"
            style={{
              bottom: `calc(${bottomPx}px + env(safe-area-inset-bottom))`,
              boxShadow: "0 0 20px hsl(186 100% 38% / 0.4), 0 0 40px hsl(312 80% 45% / 0.3)",
            }}
            title="Open Chronos Studio (Dev Only)"
          >
            <FolderOpen className="w-6 h-6" />
          </motion.button>

          {/* Dev Mode Badge */}
          <div
            className="fixed left-24 z-[1000] px-3 py-1.5 rounded-full bg-accent/10 border border-accent text-accent text-xs font-bold"
            style={{ bottom: `calc(${bottomPx}px + env(safe-area-inset-bottom))` }}
          >
            DEV MODE
          </div>
        </>
      )}

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trialRemaining={2}
      />

      {/* Chronos Studio Modal */}
      <FileForgeModal
        isOpen={isForgeModalOpen}
        onClose={() => setIsForgeModalOpen(false)}
      />
    </>
  );
};

export default FounderFloatingButton;
