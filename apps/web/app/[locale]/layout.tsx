import './globals.css';

import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { VisualEditing } from 'next-sanity';
import { ThemeProvider } from 'next-themes';

import { SanityLive } from '@/lib/live';
import { ThemeBackground } from '@/components/theme-background';

import { handleError } from '../client-functions';
import { DraftModeToast } from './DraftModeToast';

const fontPoppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: { default: '10on10Labs', template: '%s - 10on10Labs' },
  description:
    'Engineering digital perfection.We specialize in crafting seamless user experiences and building powerful frontend solutions that are a perfect 10/10.',
  keywords: [
    '10on10labs',
    '10 on 10 Labs',
    'Engineering digital perfection',
    'Web development company',
    'App development company',
    'UI/UX design agency',
    'Frontend development services',
    'Backend development company',
    'Full-stack development company',
    'Custom software development',
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  // Determine text direction based on locale
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontPoppins.variable} font-poppins`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <main className="relative">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            storageKey="company-portfolio-theme"
            enableSystem
          >
            <ThemeBackground />
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </main>
        <SanityLive onError={handleError} />
        {(await draftMode()).isEnabled && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
      </body>
      <GoogleAnalytics gaId="G-CRJ3QT48MZ" />
    </html>
  );
}
