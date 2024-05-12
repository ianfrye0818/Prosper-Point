import React, { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main>
      {/* TODO: Sidebar */}
      SIDEBAR
      {children}
    </main>
  );
}
