import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soccer Predictions',
  description: 'Bolões de futebol — crie bolões, palpite e acompanhe rankings',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={`${inter.variable} h-full overflow-x-hidden antialiased`}>
      <body className='flex min-h-dvh flex-col overflow-x-hidden font-sans'>
        {children}
      </body>
    </html>
  );
}
