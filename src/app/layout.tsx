// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Menu from '@/components/Menu/Menu';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Hub Direitista',
  description: 'Um círculo de jovens talentos que rejeita o conformismo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
      </head>
      <body>
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  );
}