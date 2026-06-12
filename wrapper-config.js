// Wrapper Bridge Configuration for Electron/PyQt6
// This file injects Supabase credentials into the global scope
// DO NOT commit sensitive credentials - this is a template

window.SUPABASE_CONFIG = {
  url: "https://qbgzanikdtuynsipwkkl.supabase.co",
  publishableKey: "sb_publishable_uqhaCrxPf9veqYffOMqMlw_k3ZjDGLI",
  // Override localStorage if needed (for Electron)
  storage: window.localStorage
};

// Polyfill import.meta.env for Vite environment variables
if (typeof import === 'undefined') {
  window.importMetaEnv = {
    VITE_SUPABASE_URL: window.SUPABASE_CONFIG.url,
    VITE_SUPABASE_PUBLISHABLE_KEY: window.SUPABASE_CONFIG.publishableKey,
    VITE_USE_MISTRAL: "false",
    VITE_MISTRAL_PROVIDER: "ollama"
  };
} else {
  // Patch import.meta.env if already exists
  if (!import.meta) {
    import.meta = {};
  }
  if (!import.meta.env) {
    import.meta.env = {};
  }
  Object.assign(import.meta.env, {
    VITE_SUPABASE_URL: window.SUPABASE_CONFIG.url,
    VITE_SUPABASE_PUBLISHABLE_KEY: window.SUPABASE_CONFIG.publishableKey,
    VITE_USE_MISTRAL: "false",
    VITE_MISTRAL_PROVIDER: "ollama"
  });
}

// Debug logging (disable in production)
console.log("[Wrapper Bridge] Supabase config injected:", {
  url: window.SUPABASE_CONFIG.url,
  keyPrefix: window.SUPABASE_CONFIG.publishableKey.substring(0, 20) + "..."
});
