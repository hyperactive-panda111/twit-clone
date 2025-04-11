import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import type { Metadata } from 'next'
import { QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "@/providers/QueryProvider";

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
      <QueryProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
