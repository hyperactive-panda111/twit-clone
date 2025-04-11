'use client';

import { QueryClient } from "@tanstack/react-query";


export default function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient();
  return (
    <QueryProvider>
      {children}
    </QueryProvider>

  );
}
