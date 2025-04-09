import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'X Clone',
  description: 'Next.js social media application project',
}


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
