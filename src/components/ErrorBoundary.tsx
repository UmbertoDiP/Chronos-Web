import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logComponentError } from '@/lib/errorLogger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Section name for error reporting */
  section?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React errors gracefully.
 * Prevents entire app from crashing when a component fails.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const section = this.props.section || 'unknown';
    console.error(`[ErrorBoundary:${section}]`, error, errorInfo);
    
    // Log to internal error store for debugging
    logComponentError(error, section);
    
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 bg-destructive/5 border border-destructive/20 rounded-lg text-center">
          <AlertTriangle className="h-10 w-10 text-destructive mb-3" />
          <h3 className="text-lg font-semibold text-destructive mb-1">
            Qualcosa è andato storto
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md">
            {this.props.section 
              ? `Si è verificato un errore nella sezione "${this.props.section}".`
              : 'Si è verificato un errore imprevisto.'
            }
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={this.handleRetry}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Riprova
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Minimal error boundary for inline components (no UI, just catches errors)
 */
export class SilentErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error('[SilentErrorBoundary]', error);
    logComponentError(error, 'silent');
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

/**
 * HOC to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  section?: string
): React.FC<P> {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary section={section}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;
