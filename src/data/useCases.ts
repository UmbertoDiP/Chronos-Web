// Use Case landing page content.
// Hero/intro/CTA are localized via i18n keys (36 langs).
// Body content (features, how-to steps, FAQ) is in English — these are
// universal technical terms aligned with universalKeywords in seo/config.ts.

import type { TranslationKey } from '@/lib/i18n/types';

export type UseCaseSlug = 'file-merge' | 'log-analysis' | 'data-processing';

export interface UseCaseFeature {
  title: string;
  description: string;
}

export interface UseCaseStep {
  name: string;
  text: string;
}

export interface UseCaseFAQ {
  question: string;
  answer: string;
}

export interface UseCase {
  slug: UseCaseSlug;
  // i18n keys (registered in TranslationKeys)
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  ctaKey: TranslationKey;
  // English body (universal)
  heading: string;
  intro: string;
  keywords: string[];
  features: UseCaseFeature[];
  steps: UseCaseStep[];
  faq: UseCaseFAQ[];
  metaTitle: string;
  metaDescription: string;
}

export const USE_CASES: Record<UseCaseSlug, UseCase> = {
  'file-merge': {
    slug: 'file-merge',
    titleKey: 'useCases.fileMerge.title',
    subtitleKey: 'useCases.fileMerge.subtitle',
    ctaKey: 'useCases.fileMerge.cta',
    heading: 'Merge Files Into One',
    intro:
      'Combine entire folders of source code, logs, notes, or text files into a single consolidated document — ready for ChatGPT, Claude, Gemini and other LLMs.',
    keywords: [
      'file merge', 'merge files into one', 'merge text files', 'combine multiple files',
      'consolidate text files', 'concatenate project files', 'combine code files into one',
      'codebase to single file', 'merge codebase into one file', 'aggregate folder contents',
    ],
    features: [
      { title: 'One-click consolidation', description: 'Select a folder and merge every text file into a single output, preserving structure and order.' },
      { title: 'Smart filtering', description: 'Exclude binaries, build artifacts, node_modules and any pattern you define before merging.' },
      { title: 'LLM-ready format', description: 'Headers, file paths and separators are formatted so AI models understand the boundaries between files.' },
      { title: '100% local', description: 'Files never leave your machine. Merging happens entirely on your Windows device.' },
    ],
    steps: [
      { name: 'Open Chronos', text: 'Launch the app from the Microsoft Store on Windows 10 or 11.' },
      { name: 'Pick a folder', text: 'Drag and drop or browse to the folder you want to consolidate.' },
      { name: 'Apply filters', text: 'Use ignore patterns to exclude irrelevant files (e.g. .git, dist, *.lock).' },
      { name: 'Export single file', text: 'Click Export to produce one clean .txt file containing the full merged content.' },
    ],
    faq: [
      { question: 'Can I merge thousands of files into one document?', answer: 'Yes. Chronos uses multi-threaded processing to merge large folders in seconds, producing a single output file.' },
      { question: 'Does merging preserve file paths?', answer: 'Yes. Each file in the merged output is preceded by its relative path and a delimiter, so the structure is fully recoverable.' },
      { question: 'Which file types are merged?', answer: 'All readable text formats: source code, configs, markdown, logs, plain text. Binaries are skipped automatically.' },
    ],
    metaTitle: 'Merge Files Into One – File Consolidation Tool for Windows | Chronos',
    metaDescription: 'Free Windows tool to merge files into one document. Combine source code, logs and text files into a single LLM-ready output. 100% offline, multi-threaded, private.',
  },
  'log-analysis': {
    slug: 'log-analysis',
    titleKey: 'useCases.logAnalysis.title',
    subtitleKey: 'useCases.logAnalysis.subtitle',
    ctaKey: 'useCases.logAnalysis.cta',
    heading: 'Log Analysis Tool for AI',
    intro:
      'Aggregate fragmented log files from servers, apps, CI pipelines and crash dumps into one searchable document — then feed it to ChatGPT, Claude or Gemini for instant root-cause analysis.',
    keywords: [
      'log analysis', 'log file analysis tool', 'log aggregation tool', 'bulk text processing',
      'batch file processing', 'log analysis with chatgpt', 'log analysis with claude',
      'aggregate folder contents', 'merge text files', 'combine multiple files',
    ],
    features: [
      { title: 'Aggregate any log format', description: 'Merge .log, .txt, .json, .ndjson and rotated logs from any folder into one consolidated stream.' },
      { title: 'AI root-cause analysis', description: 'Paste the consolidated log into ChatGPT, Claude or Gemini to surface anomalies, errors and patterns instantly.' },
      { title: 'Skip noise automatically', description: 'Filter out heartbeat lines, debug spam and binary blobs with ignore patterns and extension filters.' },
      { title: 'Offline & confidential', description: 'Process sensitive production logs locally. Nothing is uploaded — your logs stay on your machine.' },
    ],
    steps: [
      { name: 'Collect logs', text: 'Place the log files (or whole log folders) you want to analyze in a single directory.' },
      { name: 'Open in Chronos', text: 'Point Chronos at the log folder. Apply extension filters (e.g. *.log, *.txt).' },
      { name: 'Export aggregated log', text: 'Generate a single text file containing every relevant log, with file paths as headers.' },
      { name: 'Ask the AI', text: 'Paste the file into ChatGPT, Claude, Gemini or NotebookLM and ask for the error, latency spike or trace.' },
    ],
    faq: [
      { question: 'Is this a real-time log monitoring tool?', answer: 'No. Chronos is for offline aggregation and AI-assisted analysis. It consolidates static log files into one document for review.' },
      { question: 'Can it handle multi-gigabyte log folders?', answer: 'Yes. Multi-threaded scanning handles large folders. For very large outputs, use ignore patterns to keep the AI context window manageable.' },
      { question: 'Are my logs uploaded anywhere?', answer: 'Never. All processing happens locally on your Windows machine. The output file is yours alone.' },
    ],
    metaTitle: 'Log Analysis Tool – Aggregate Logs for ChatGPT & Claude | Chronos',
    metaDescription: 'Aggregate log files from any folder into one document for AI-powered root-cause analysis. Free Windows tool. Multi-threaded, 100% offline, private by design.',
  },
  'data-processing': {
    slug: 'data-processing',
    titleKey: 'useCases.dataProcessing.title',
    subtitleKey: 'useCases.dataProcessing.subtitle',
    ctaKey: 'useCases.dataProcessing.cta',
    heading: 'Bulk Data & Text Processing',
    intro:
      'Batch-process folders of text data, CSVs, configs and documents into one normalized file ready for analysis, RAG ingestion, or LLM-driven transformations.',
    keywords: [
      'data processing', 'bulk text processing', 'batch file processing', 'developer productivity tool',
      'rag codebase preparation', 'prepare code for llm', 'aggregate folder contents',
      'consolidate text files', 'codebase to single file', 'developer tools',
    ],
    features: [
      { title: 'Batch the whole folder', description: 'Process every text file in a directory tree in a single pass — no scripting required.' },
      { title: 'Pattern-based filtering', description: 'Include or exclude by extension, glob pattern, size or path to keep only the data you need.' },
      { title: 'RAG & LLM ready output', description: 'Single consolidated file with clear file boundaries — perfect input for embeddings, RAG pipelines or one-shot prompts.' },
      { title: 'Reproducible & local', description: 'Save filter presets, rerun on updated data, and keep everything on your own machine.' },
    ],
    steps: [
      { name: 'Organize the data folder', text: 'Group your CSVs, configs, documents and text files into a single working directory.' },
      { name: 'Configure filters', text: 'Pick extensions and ignore patterns to scope exactly what gets processed.' },
      { name: 'Run the export', text: 'Chronos scans, filters and consolidates everything into one normalized text file.' },
      { name: 'Send to your pipeline', text: 'Use the output as input for embeddings, RAG, LLM prompts, audits or further scripting.' },
    ],
    faq: [
      { question: 'Can I use this for RAG pipelines?', answer: 'Yes. The single-file output with clear file boundaries is ideal for chunking and embedding into vector stores.' },
      { question: 'Does it transform the data or just aggregate it?', answer: 'Chronos aggregates and normalizes formatting. Transformations are done by the LLM or your pipeline downstream.' },
      { question: 'Can I save a configuration to reuse?', answer: 'Yes. Pro users can save filter presets and rerun the same processing recipe across multiple folders.' },
    ],
    metaTitle: 'Bulk Data Processing & Text Aggregation Tool | Chronos',
    metaDescription: 'Batch-process folders of text data into one LLM-ready file for RAG, embeddings and AI pipelines. Free Windows tool. Pattern filters, presets, 100% local.',
  },
};

export const USE_CASE_SLUGS = Object.keys(USE_CASES) as UseCaseSlug[];
