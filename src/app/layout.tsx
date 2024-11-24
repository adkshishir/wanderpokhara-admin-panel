import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AdminPanel } from '@/components/admin-panel';
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Admin Panel Wander pokhara',
  description: 'Admin Panel Wander pokhara',
  authors: [{ name: 'Shishir Adhikari', url: 'https://adkshishir.vercel.app' }],
  keywords: [
    'wander pokhara',
    'wander',
    'pokhara',
    'travel',
    'adventure',
    'tourism',
    'adventure',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* no index for now */}
        <meta name='robots' content='noindex' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              fontSize: '1rem',
            },
          }}
        />
        <AdminPanel>{children}</AdminPanel>
      </body>
    </html>
  );
}
