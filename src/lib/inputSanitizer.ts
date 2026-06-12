import { z } from 'zod';

/**
 * Input Sanitizer and Validator
 * Provides robust security against XSS, SQL injection, and other attacks
 */

// Constants for validation
const MAX_TEXT_LENGTH = 10000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_URL_LENGTH = 2048;
const MAX_PHONE_LENGTH = 30;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['.txt', '.md', '.json', '.pdf', '.docx'];

// Dangerous patterns to detect and block
const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /data:\s*text\/html/gi,
  /<\s*iframe/gi,
  /<\s*object/gi,
  /<\s*embed/gi,
  /<\s*form/gi,
  /expression\s*\(/gi,
  /url\s*\(\s*["']?\s*data:/gi,
];

// SQL injection patterns
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|UNION|DECLARE)\b)/gi,
  /--/g,
  /;\s*$/g,
  /\/\*[\s\S]*?\*\//g,
  /'\s*OR\s+'1'\s*=\s*'1/gi,
  /'\s*OR\s+1\s*=\s*1/gi,
];

/**
 * Sanitize a string by removing dangerous content
 */
export const sanitizeString = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  let sanitized = input;
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Encode HTML entities
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
};

/**
 * Check if input contains dangerous patterns
 */
export const containsDangerousContent = (input: string): boolean => {
  if (!input || typeof input !== 'string') return false;
  
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(input)) {
      console.warn('Dangerous pattern detected:', pattern);
      return true;
    }
  }
  
  for (const pattern of SQL_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      console.warn('SQL injection pattern detected:', pattern);
      return true;
    }
  }
  
  return false;
};

/**
 * Validate and sanitize CV text input
 */
export const sanitizeCVText = (input: string, maxLength: number = MAX_TEXT_LENGTH): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Check for dangerous content
  if (containsDangerousContent(input)) {
    throw new Error('Input contiene contenuto non consentito');
  }
  
  // Trim and limit length
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  return sanitized;
};

// Zod schemas for validation
export const personalInfoSchema = z.object({
  firstName: z.string().trim().max(MAX_NAME_LENGTH, 'Nome troppo lungo').optional(),
  lastName: z.string().trim().max(MAX_NAME_LENGTH, 'Cognome troppo lungo').optional(),
  email: z.string().trim().email('Email non valida').max(MAX_EMAIL_LENGTH, 'Email troppo lunga').optional().or(z.literal('')),
  phone: z.string().trim().max(MAX_PHONE_LENGTH, 'Telefono troppo lungo').optional(),
  address: z.string().trim().max(MAX_TEXT_LENGTH, 'Indirizzo troppo lungo').optional(),
  city: z.string().trim().max(MAX_NAME_LENGTH, 'Città troppo lunga').optional(),
  country: z.string().trim().max(MAX_NAME_LENGTH, 'Paese troppo lungo').optional(),
  postalCode: z.string().trim().max(20, 'CAP troppo lungo').optional(),
  summary: z.string().trim().max(2000, 'Profilo troppo lungo').optional(),
  linkedIn: z.string().trim().max(MAX_URL_LENGTH, 'URL LinkedIn troppo lungo').optional(),
  website: z.string().trim().max(MAX_URL_LENGTH, 'URL sito troppo lungo').optional(),
});

export const experienceSchema = z.object({
  id: z.string().uuid(),
  jobTitle: z.string().trim().max(200, 'Ruolo troppo lungo'),
  company: z.string().trim().max(200, 'Azienda troppo lunga'),
  location: z.string().trim().max(200, 'Località troppo lunga').optional(),
  startDate: z.string().trim().max(20, 'Data non valida'),
  endDate: z.string().trim().max(20, 'Data non valida').optional(),
  currentlyWorking: z.boolean().optional(),
  description: z.string().trim().max(MAX_TEXT_LENGTH, 'Descrizione troppo lunga').optional(),
});

export const educationSchema = z.object({
  id: z.string().uuid(),
  degree: z.string().trim().max(200, 'Titolo troppo lungo'),
  school: z.string().trim().max(200, 'Istituto troppo lungo'),
  location: z.string().trim().max(200, 'Località troppo lunga').optional(),
  startDate: z.string().trim().max(20, 'Data non valida').optional(),
  endDate: z.string().trim().max(20, 'Data non valida').optional(),
  description: z.string().trim().max(MAX_TEXT_LENGTH, 'Descrizione troppo lunga').optional(),
});

export const skillSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().max(100, 'Competenza troppo lunga'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
});

export const languageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().max(100, 'Lingua troppo lunga'),
  level: z.enum(['basic', 'conversational', 'professional', 'fluent', 'native']).optional(),
});

/**
 * Validate file upload
 */
export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File troppo grande (max ${MAX_FILE_SIZE / 1024 / 1024}MB)` };
  }
  
  // Check file extension
  const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (!ALLOWED_FILE_TYPES.includes(extension)) {
    return { valid: false, error: `Tipo file non supportato. Usa: ${ALLOWED_FILE_TYPES.join(', ')}` };
  }
  
  // Check MIME type (additional security layer)
  const allowedMimes = [
    'text/plain',
    'text/markdown',
    'application/json',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  
  if (!allowedMimes.includes(file.type) && file.type !== '') {
    return { valid: false, error: 'Tipo MIME non consentito' };
  }
  
  return { valid: true };
};

/**
 * Sanitize imported CV data from AI or files
 */
export const sanitizeImportedCVData = (data: any): any => {
  if (!data || typeof data !== 'object') {
    throw new Error('Dati importati non validi');
  }
  
  const sanitized: any = {};
  
  // Sanitize personal info
  if (data.personalInfo) {
    const personalInfo: any = {};
    for (const [key, value] of Object.entries(data.personalInfo)) {
      if (typeof value === 'string') {
        personalInfo[key] = sanitizeCVText(value, MAX_NAME_LENGTH);
      }
    }
    sanitized.personalInfo = personalInfo;
  }
  
  // Sanitize experiences
  if (Array.isArray(data.experiences)) {
    sanitized.experiences = data.experiences.map((exp: any) => ({
      id: crypto.randomUUID(),
      jobTitle: sanitizeCVText(exp.jobTitle || '', 200),
      company: sanitizeCVText(exp.company || '', 200),
      location: sanitizeCVText(exp.location || '', 200),
      startDate: sanitizeCVText(exp.startDate || '', 20),
      endDate: sanitizeCVText(exp.endDate || '', 20),
      currentlyWorking: Boolean(exp.currentlyWorking),
      description: sanitizeCVText(exp.description || '', MAX_TEXT_LENGTH),
    }));
  }
  
  // Sanitize education
  if (Array.isArray(data.education)) {
    sanitized.education = data.education.map((edu: any) => ({
      id: crypto.randomUUID(),
      degree: sanitizeCVText(edu.degree || '', 200),
      school: sanitizeCVText(edu.school || '', 200),
      location: sanitizeCVText(edu.location || '', 200),
      startDate: sanitizeCVText(edu.startDate || '', 20),
      endDate: sanitizeCVText(edu.endDate || '', 20),
      description: sanitizeCVText(edu.description || '', MAX_TEXT_LENGTH),
    }));
  }
  
  // Sanitize skills
  if (Array.isArray(data.skills)) {
    sanitized.skills = data.skills.map((skill: any) => ({
      id: crypto.randomUUID(),
      name: sanitizeCVText(typeof skill === 'string' ? skill : skill.name || '', 100),
      level: 'intermediate',
    }));
  }
  
  // Sanitize languages
  if (Array.isArray(data.languages)) {
    sanitized.languages = data.languages.map((lang: any) => ({
      id: crypto.randomUUID(),
      name: sanitizeCVText(typeof lang === 'string' ? lang : lang.name || '', 100),
      level: 'conversational',
    }));
  }
  
  return sanitized;
};

/**
 * Rate limiting helper (client-side)
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (action: string, maxAttempts: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(action);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(action, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxAttempts) {
    return false;
  }
  
  record.count++;
  return true;
};

/**
 * Validate AI response before applying to CV
 */
export const validateAIResponse = (response: any): boolean => {
  if (!response || typeof response !== 'object') {
    return false;
  }
  
  // Check for unexpected nested depth (potential attack)
  const maxDepth = 5;
  const checkDepth = (obj: any, depth: number): boolean => {
    if (depth > maxDepth) return false;
    if (typeof obj !== 'object' || obj === null) return true;
    
    for (const value of Object.values(obj)) {
      if (!checkDepth(value, depth + 1)) return false;
    }
    return true;
  };
  
  if (!checkDepth(response, 0)) {
    console.warn('AI response has suspicious nesting depth');
    return false;
  }
  
  // Check for reasonable data size
  const jsonString = JSON.stringify(response);
  if (jsonString.length > 500000) { // 500KB max
    console.warn('AI response too large');
    return false;
  }
  
  return true;
};
