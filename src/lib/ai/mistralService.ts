/**
 * Mistral AI Service - Adapter for Mistral 7B Free Model
 *
 * Implements same interface as aiService.ts for drop-in replacement
 * Apache 2.0 License - Commercial use allowed
 */

import { getMistralConfig, isMistralAvailable, type MistralConfig } from './mistral.config';
import type { AIResponse } from './aiService';

interface MistralRequest {
  model: string;
  prompt: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    max_tokens?: number;
  };
}

interface MistralResponse {
  response: string;
  done: boolean;
  context?: number[];
}

/**
 * Call Mistral AI via Ollama/LMStudio/HuggingFace
 */
async function callMistral(prompt: string, config: MistralConfig = getMistralConfig()): Promise<AIResponse<string>> {
  try {
    // Ollama format
    if (config.provider === 'ollama') {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.model,
          prompt,
          stream: false,
          options: {
            temperature: config.temperature,
            num_predict: config.maxTokens,
          },
        } as MistralRequest),
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
      }

      const data = (await response.json()) as MistralResponse;
      return { success: true, data: data.response.trim() };
    }

    // LM Studio format (OpenAI-compatible)
    if (config.provider === 'lmstudio') {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: config.temperature,
          max_tokens: config.maxTokens,
        }),
      });

      if (!response.ok) {
        throw new Error(`LM Studio error: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data: data.choices[0].message.content.trim() };
    }

    // HuggingFace Inference API
    if (config.provider === 'huggingface') {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            temperature: config.temperature,
            max_new_tokens: config.maxTokens,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HuggingFace error: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data: data[0].generated_text.trim() };
    }

    return { success: false, error: 'Provider non supportato' };
  } catch (err) {
    console.error('Mistral service error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Errore Mistral AI' };
  }
}

// ============================================
// CV-specific prompts (optimized for Mistral)
// ============================================

const MISTRAL_PROMPTS = {
  improveDescription: (text: string) => `
Sei un esperto di recruiting e CV professionali. Migliora questa descrizione di esperienza lavorativa rendendola più impattante e orientata ai risultati.

Regole:
- Usa verbi d'azione forti (gestito, sviluppato, implementato)
- Quantifica i risultati quando possibile
- Mantieni tono professionale
- Max 3-4 righe
- Formato bullet points se necessario

Testo originale:
${text}

Testo migliorato:`,

  improveSummary: (text: string) => `
Riscrivi questo sommario professionale rendendolo più coinvolgente e specifico. Evidenzia competenze chiave e valore aggiunto.

Regole:
- Max 4-5 righe
- Usa prima persona o terza persona in base al contesto
- Focus su competenze differenzianti
- Linguaggio chiaro e diretto

Testo originale:
${text}

Testo migliorato:`,

  suggestTechnologies: (jobTitle: string, existing: string[]) => `
Suggerisci 5-7 tecnologie/competenze rilevanti per il ruolo di "${jobTitle}".

Tecnologie già presenti: ${existing.join(', ') || 'nessuna'}

Regole:
- Suggerisci solo tecnologie NON già presenti
- Tecnologie attuali e richieste dal mercato
- Mix di hard skills e soft skills
- Rispondi SOLO con lista separata da virgole

Tecnologie suggerite:`,

  improveEducation: (text: string) => `
Migliora questa descrizione formativa rendendola più chiara e professionale.

Regole:
- Mantieni informazioni essenziali (titolo, istituto, anno)
- Aggiungi focus su competenze acquisite se pertinente
- Max 2-3 righe
- Tono formale

Testo originale:
${text}

Testo migliorato:`,

  improveProject: (text: string) => `
Migliora questa descrizione di progetto evidenziando tecnologie usate e risultati raggiunti.

Regole:
- Enfatizza stack tecnologico
- Quantifica risultati (utenti, performance, etc.)
- Max 3-4 righe
- Usa bullet points se necessario

Testo originale:
${text}

Testo migliorato:`,
};

// ============================================
// Exported functions (same interface as aiService.ts)
// ============================================

export async function improveDescription(text: string): Promise<AIResponse<string>> {
  const config = getMistralConfig();
  if (!config.enabled || !(await isMistralAvailable(config))) {
    return { success: false, error: 'Mistral non disponibile' };
  }

  return callMistral(MISTRAL_PROMPTS.improveDescription(text), config);
}

export async function improveSummary(text: string): Promise<AIResponse<string>> {
  const config = getMistralConfig();
  if (!config.enabled || !(await isMistralAvailable(config))) {
    return { success: false, error: 'Mistral non disponibile' };
  }

  return callMistral(MISTRAL_PROMPTS.improveSummary(text), config);
}

export async function improveEducation(text: string): Promise<AIResponse<string>> {
  const config = getMistralConfig();
  if (!config.enabled || !(await isMistralAvailable(config))) {
    return { success: false, error: 'Mistral non disponibile' };
  }

  return callMistral(MISTRAL_PROMPTS.improveEducation(text), config);
}

export async function improveProject(text: string): Promise<AIResponse<string>> {
  const config = getMistralConfig();
  if (!config.enabled || !(await isMistralAvailable(config))) {
    return { success: false, error: 'Mistral non disponibile' };
  }

  return callMistral(MISTRAL_PROMPTS.improveProject(text), config);
}

export async function suggestTechnologies(
  jobTitle: string,
  existingTechnologies: string[] = []
): Promise<AIResponse<{ technologies: string[] }>> {
  const config = getMistralConfig();
  if (!config.enabled || !(await isMistralAvailable(config))) {
    return { success: false, error: 'Mistral non disponibile' };
  }

  const result = await callMistral(MISTRAL_PROMPTS.suggestTechnologies(jobTitle, existingTechnologies), config);

  if (result.success && result.data) {
    // Parse comma-separated list
    const technologies = result.data
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && !existingTechnologies.includes(t));

    return { success: true, data: { technologies } };
  }

  return { success: false, error: result.error };
}
