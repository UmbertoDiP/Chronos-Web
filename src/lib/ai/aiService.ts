/**
 * AI Service - Modular AI layer for easy provider swapping
 * 
 * Currently uses Lovable AI via cv-ai edge function.
 * To switch providers, update the callAI function and endpoint.
 */

import { supabase } from '@/integrations/supabase/client';

// AI Provider configuration - change this to swap providers
export const AI_CONFIG = {
  // Edge function endpoint (Lovable Cloud)
  endpoint: 'cv-ai',
  // Alternative: direct API endpoint (for external providers)
  // endpoint: 'https://api.openai.com/v1/chat/completions',
  // apiKey: 'YOUR_API_KEY', // Move to secrets in production
};

export interface AIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Generic AI call - abstracts the provider
 */
async function callAI<T>(
  action: string, 
  payload: Record<string, any>
): Promise<AIResponse<T>> {
  try {
    const { data, error } = await supabase.functions.invoke(AI_CONFIG.endpoint, {
      body: { action, ...payload }
    });

    if (error) {
      console.error('AI service error:', error);
      return { success: false, error: error.message || 'Errore nella richiesta AI' };
    }

    if (data?.error) {
      return { success: false, error: data.error };
    }

    return { success: true, data: data?.result };
  } catch (err) {
    console.error('AI service exception:', err);
    return { success: false, error: 'Errore di connessione al servizio AI' };
  }
}

// ============================================
// Contextual Suggestions
// ============================================

export interface TechnologySuggestion {
  technologies: string[];
}

/**
 * Get contextual technology suggestions based on job role
 */
export async function suggestTechnologies(
  jobTitle: string,
  existingTechnologies: string[] = [],
  description?: string
): Promise<AIResponse<TechnologySuggestion>> {
  if (!jobTitle?.trim()) {
    // Fallback for empty job title - generic suggestions
    return {
      success: true,
      data: { technologies: [] }
    };
  }

  return callAI<TechnologySuggestion>('suggest_technologies', {
    jobTitle,
    existingTechnologies,
    description
  });
}

// ============================================
// CV Parsing & Improvement (existing actions)
// ============================================

export async function parseFullCV(text: string): Promise<AIResponse<any>> {
  return callAI('parse_full_cv', { text });
}

export async function parseSection(section: string, text: string): Promise<AIResponse<any>> {
  return callAI('parse_section', { section, text });
}

export async function improveDescription(text: string): Promise<AIResponse<string>> {
  return callAI<string>('improve_description', { text });
}

export async function improveSummary(text: string): Promise<AIResponse<string>> {
  return callAI<string>('improve_summary', { text });
}

export async function improveEducation(text: string): Promise<AIResponse<string>> {
  return callAI<string>('improve_education', { text });
}

export async function improveProject(text: string): Promise<AIResponse<string>> {
  return callAI<string>('improve_project', { text });
}

export async function getFieldSuggestion(
  fieldName: string,
  text: string,
  cvContext?: { jobTitle?: string; industry?: string; experienceYears?: number }
): Promise<AIResponse<{ suggestions: string[] }>> {
  return callAI('field_suggestion', { fieldName, text, cvContext });
}
