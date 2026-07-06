import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { ServiceWorkerRegister } from '@/components/pwa/service-worker-register';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soccer Predictions',
  description: 'Bolões de futebol — crie bolões, palpite e acompanhe rankings',
  applicationName: 'Soccer Predictions',
  appleWebApp: {
    capable: true,
    title: 'Soccer Predictions',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#059669',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={`${inter.variable} h-full overflow-x-hidden antialiased`}>
      <body className='flex min-h-dvh flex-col overflow-x-hidden font-sans'>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
