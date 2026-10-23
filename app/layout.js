import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';
import FloatingContactWidget from './components/website/FloatingContactWidget';
import GlobalStickyMarketingHeader from './components/website/GlobalStickyMarketingHeader';
import { OrganizationJsonLd, WebSiteJsonLd } from './components/website/JsonLd';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medhostech.com';
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME || 'Zorvian Digital Solutions';
const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  process.env.APP_DESCRIPTION ||
  'Zorvian Digital Solutions — web development, web applications, and custom digital solutions for modern businesses.';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <GlobalStickyMarketingHeader />
          {children}
          <FloatingContactWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
