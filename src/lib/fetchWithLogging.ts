/**
 * Fetch wrapper with automatic network error logging
 */
import { logNetworkError } from './errorLogger';

interface FetchOptions extends RequestInit {
  /** Skip error logging for this request */
  skipLogging?: boolean;
}

/**
 * Enhanced fetch that automatically logs network errors
 */
export const fetchWithLogging = async (
  input: RequestInfo | URL,
  init?: FetchOptions
): Promise<Response> => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  const { skipLogging, ...fetchInit } = init || {};

  try {
    const response = await fetch(input, fetchInit);

    // Log non-OK responses (4xx, 5xx)
    if (!response.ok && !skipLogging) {
      logNetworkError(url, response.status, `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    // Log network failures (no connection, CORS, etc.)
    if (!skipLogging) {
      const message = error instanceof Error ? error.message : 'Network request failed';
      logNetworkError(url, 0, message);
    }
    throw error;
  }
};

/**
 * Monkey-patch global fetch to add logging (call once at app init)
 */
export const enableGlobalFetchLogging = (): void => {
  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : (input as Request).url;

    try {
      const response = await originalFetch(input, init);

      // Log server errors (5xx) automatically
      if (response.status >= 500) {
        logNetworkError(url, response.status, `HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      // Log network failures
      const message = error instanceof Error ? error.message : 'Network request failed';
      logNetworkError(url, 0, message);
      throw error;
    }
  };
};
