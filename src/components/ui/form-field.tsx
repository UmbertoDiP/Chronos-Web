import * as React from "react";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  success?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, required = false, error, success, hint, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-1.5", className)}>
        <Label className="flex items-center gap-1 text-sm font-medium">
          {label}
          {required && <span className="text-destructive">*</span>}
          {success && !error && (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 ml-1 animate-fade-in" />
          )}
        </Label>
        {children}
        {error && (
          <div className="flex items-center gap-1.5 text-xs text-destructive animate-fade-in">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && !error && (
          <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-500 animate-fade-in">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>{success}</span>
          </div>
        )}
        {hint && !error && !success && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="w-3 h-3 shrink-0" />
            <span>{hint}</span>
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

// Validation helpers for CV fields
export const cvValidators = {
  // Required field check
  isRequired: (value: string | undefined): boolean => {
    return !!value && value.trim().length > 0;
  },

  // Email validation
  isValidEmail: (email: string): boolean => {
    if (!email) return true; // Empty is handled by required check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone validation (international format)
  isValidPhone: (phone: string): boolean => {
    if (!phone) return true;
    // Accepts formats: +39 123 456 7890, 3901234567, +1-555-555-5555
    const phoneRegex = /^[\d\s+\-().]{7,20}$/;
    return phoneRegex.test(phone);
  },

  // URL validation
  isValidUrl: (url: string): boolean => {
    if (!url) return true;
    // Accept with or without protocol
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    return urlRegex.test(url);
  },

  // LinkedIn URL validation
  isValidLinkedIn: (url: string): boolean => {
    if (!url) return true;
    return url.includes('linkedin.com/in/') || !url.includes('http');
  },

  // Date validation (MM/YYYY or YYYY)
  isValidDate: (date: string): boolean => {
    if (!date) return true;
    // Accept: 01/2024, 2024, Gennaio 2024, Presente, In corso, etc.
    const dateRegex = /^(\d{2}\/\d{4}|\d{4}|[A-Za-z]+\s*\d{4}|Presente|In corso|Present|Ongoing)$/i;
    return dateRegex.test(date.trim());
  },

  // Name validation (letters and common name characters)
  isValidName: (name: string): boolean => {
    if (!name) return true;
    return name.trim().length >= 2 && name.trim().length <= 50;
  },

  // Summary/description length
  isValidSummary: (summary: string, minLength = 50, maxLength = 500): boolean => {
    if (!summary) return true;
    const length = summary.trim().length;
    return length >= minLength && length <= maxLength;
  },
};

// CV industry standard required fields
export const requiredFields = {
  personal: ['firstName', 'lastName', 'email', 'phone', 'city'],
  experience: ['jobTitle', 'company', 'startDate'],
  education: ['degree', 'school'],
  skill: ['name'],
  language: ['name'],
} as const;

// Get error message for field
export const getFieldError = (
  field: string,
  value: string | undefined,
  isRequired: boolean
): string | undefined => {
  // Required check
  if (isRequired && !cvValidators.isRequired(value)) {
    return 'Campo obbligatorio';
  }

  if (!value) return undefined;

  // Specific validations
  switch (field) {
    case 'email':
      return cvValidators.isValidEmail(value) ? undefined : 'Email non valida';
    case 'phone':
      return cvValidators.isValidPhone(value) ? undefined : 'Numero di telefono non valido';
    case 'linkedIn':
      return cvValidators.isValidLinkedIn(value) ? undefined : 'URL LinkedIn non valido';
    case 'website':
      return cvValidators.isValidUrl(value) ? undefined : 'URL non valido';
    case 'startDate':
    case 'endDate':
      return cvValidators.isValidDate(value) ? undefined : 'Formato: MM/YYYY o YYYY';
    case 'firstName':
    case 'lastName':
      return cvValidators.isValidName(value) ? undefined : 'Nome deve essere tra 2 e 50 caratteri';
    default:
      return undefined;
  }
};

// Get success message for field (when valid)
export const getFieldSuccess = (
  field: string,
  value: string | undefined,
  isRequired: boolean
): string | undefined => {
  // Only show success for fields that have validation
  if (!value || value.trim().length === 0) return undefined;
  
  // Check if the field has a validation error first
  const error = getFieldError(field, value, isRequired);
  if (error) return undefined;

  switch (field) {
    case 'email':
      return 'Email valida';
    case 'phone':
      return 'Telefono valido';
    case 'linkedIn':
      if (value.includes('linkedin.com')) return 'Profilo LinkedIn valido';
      return undefined;
    case 'website':
      if (value.includes('.')) return 'URL valido';
      return undefined;
    case 'startDate':
    case 'endDate':
      return 'Data valida';
    default:
      return undefined;
  }
};
