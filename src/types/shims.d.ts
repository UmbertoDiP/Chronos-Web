// Override react-helmet-async types for React 18 JSX compatibility.
// The package ships class-component types incompatible with @types/react@18.

declare module 'react-helmet-async' {
  import type { FC, ReactNode } from 'react';

  export interface HelmetProps {
    children?: ReactNode;
    [key: string]: any;
  }

  export interface HelmetProviderProps {
    children?: ReactNode;
    context?: Record<string, unknown>;
  }

  export const Helmet: FC<HelmetProps>;
  export const HelmetProvider: FC<HelmetProviderProps>;
}
