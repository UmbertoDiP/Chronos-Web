/**
 * AI Provider Router - Automatically switches between Mistral and Lovable
 *
 * Usage:
 * - Set VITE_USE_MISTRAL="true" to use Mistral 7B (free, commercial OK)
 * - Set VITE_USE_MISTRAL="false" to use Lovable AI (default)
 *
 * This file acts as proxy - NO modifications to existing code needed
 */

import * as lovableAI from './aiService';
import * as mistralAI from './mistralService';
import { getMistralConfig, isMistralAvailable } from './mistral.config';
import type { AIResponse, TechnologySuggestion } from './aiService';

/**
 * Determine which provider to use
 */
async function shouldUseMistral(): Promise<boolean> {
  const config = getMistralConfig();
  if (!config.enabled) return false;

  return await isMistralAvailable(config);
}

// ============================================
// Exported functions - Auto-routing
// ============================================

export async function improveDescription(text: string): Promise<AIResponse<string>> {
  if (await shouldUseMistral()) {
    console.log('[AI Provider] Using Mistral for improve description');
    return mistralAI.improveDescription(text);
  }

  console.log('[AI Provider] Using Lovable for improve description');
  return lovableAI.improveDescription(text);
}

export async function improveSummary(text: string): Promise<AIResponse<string>> {
  if (await shouldUseMistral()) {
    console.log('[AI Provider] Using Mistral for improve summary');
    return mistralAI.improveSummary(text);
  }

  console.log('[AI Provider] Using Lovable for improve summary');
  return lovableAI.improveSummary(text);
}

export async function improveEducation(text: string): Promise<AIResponse<string>> {
  if (await shouldUseMistral()) {
    console.log('[AI Provider] Using Mistral for improve education');
    return mistralAI.improveEducation(text);
  }

  console.log('[AI Provider] Using Lovable for improve education');
  return lovableAI.improveEducation(text);
}

export async function improveProject(text: string): Promise<AIResponse<string>> {
  if (await shouldUseMistral()) {
    console.log('[AI Provider] Using Mistral for improve project');
    return mistralAI.improveProject(text);
  }

  console.log('[AI Provider] Using Lovable for improve project');
  return lovableAI.improveProject(text);
}

export async function suggestTechnologies(
  jobTitle: string,
  existingTechnologies: string[] = [],
  description?: string
): Promise<AIResponse<TechnologySuggestion>> {
  if (await shouldUseMistral()) {
    console.log('[AI Provider] Using Mistral for suggest technologies');
    return mistralAI.suggestTechnologies(jobTitle, existingTechnologies);
  }

  console.log('[AI Provider] Using Lovable for suggest technologies');
  return lovableAI.suggestTechnologies(jobTitle, existingTechnologies, description);
}

// ============================================
// Pass-through for functions not yet in Mistral
// ============================================

export const parseFullCV = lovableAI.parseFullCV;
export const parseSection = lovableAI.parseSection;
export const getFieldSuggestion = lovableAI.getFieldSuggestion;

// Re-export types
export type { AIResponse, TechnologySuggestion } from './aiService';
