/**
 * Mistral AI Configuration - Free & Commercial Use
 *
 * Apache 2.0 License - Full commercial use permitted
 * Model: mistral-7b-instruct (optimized for professional text)
 *
 * Deployment options:
 * 1. Ollama (local) - recommended for development
 * 2. LM Studio (local) - GUI alternative
 * 3. HuggingFace Inference API (cloud free tier)
 */

export type MistralProvider = 'ollama' | 'lmstudio' | 'huggingface';

export interface MistralConfig {
  provider: MistralProvider;
  model: string;
  endpoint: string;
  apiKey?: string;
  maxTokens: number;
  temperature: number;
  enabled: boolean;
}

// Default configuration - Ollama local deployment
export const MISTRAL_CONFIG: MistralConfig = {
  provider: 'ollama',
  model: 'mistral:7b-instruct',
  endpoint: 'http://localhost:11434/api/generate',
  maxTokens: 2048,
  temperature: 0.7,
  enabled: import.meta.env.VITE_USE_MISTRAL === 'true',
};

// Alternative providers configuration
export const MISTRAL_PROVIDERS: Record<MistralProvider, Partial<MistralConfig>> = {
  ollama: {
    model: 'mistral:7b-instruct',
    endpoint: 'http://localhost:11434/api/generate',
  },
  lmstudio: {
    model: 'mistral-7b-instruct-v0.2',
    endpoint: 'http://localhost:1234/v1/chat/completions',
  },
  huggingface: {
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    apiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY,
  },
};

/**
 * Get active Mistral configuration
 * Falls back to Lovable AI if Mistral disabled
 */
export function getMistralConfig(): MistralConfig {
  const providerEnv = import.meta.env.VITE_MISTRAL_PROVIDER as MistralProvider;
  const provider = providerEnv && MISTRAL_PROVIDERS[providerEnv] ? providerEnv : 'ollama';

  return {
    ...MISTRAL_CONFIG,
    ...MISTRAL_PROVIDERS[provider],
    provider,
  };
}

/**
 * Check if Mistral is available (health check)
 */
export async function isMistralAvailable(config: MistralConfig = getMistralConfig()): Promise<boolean> {
  if (!config.enabled) return false;

  try {
    // Ollama health check
    if (config.provider === 'ollama') {
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        signal: AbortSignal.timeout(3000),
      });
      return response.ok;
    }

    // LM Studio health check
    if (config.provider === 'lmstudio') {
      const response = await fetch('http://localhost:1234/v1/models', {
        method: 'GET',
        signal: AbortSignal.timeout(3000),
      });
      return response.ok;
    }

    // HuggingFace - always available if API key exists
    if (config.provider === 'huggingface') {
      return !!config.apiKey;
    }

    return false;
  } catch {
    return false;
  }
}
