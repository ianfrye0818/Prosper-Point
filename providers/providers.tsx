import React from 'react';
import { ThemeProvider } from './themeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
