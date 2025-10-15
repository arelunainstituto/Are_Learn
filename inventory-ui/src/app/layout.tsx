'use client';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
                  AreLuna Inventory
                </h1>
                <nav style={{ display: 'flex', gap: '1rem' }}>
                  <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Dashboard</a>
                  <a href="/inventory" style={{ color: '#6b7280', textDecoration: 'none' }}>Produtos</a>
                  <a href="/movements" style={{ color: '#6b7280', textDecoration: 'none' }}>Movimentos</a>
                  <a href="/documents" style={{ color: '#6b7280', textDecoration: 'none' }}>Documentos</a>
                  <a href="/integrations" style={{ color: '#6b7280', textDecoration: 'none' }}>Integrações</a>
                </nav>
              </div>
            </header>
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
              {children}
            </main>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}