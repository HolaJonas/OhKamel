/// <reference types="vite/client" />

declare global {
  interface Window {
    OcamlInception?: {
      run: (code: string) => string;
    };
  }
}

export {};
