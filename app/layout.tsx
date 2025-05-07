import './globals.css';

import { Poppins } from 'next/font/google';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';

import { handleError } from './client-functions';
import { DraftModeToast } from './DraftModeToast';

const fontPoppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontPoppins.variable} font-poppins`}>
      <body className="overscroll-none">
        <main>{children}</main>
        <SanityLive onError={handleError} />
        {(await draftMode()).isEnabled && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
      </body>
    </html>
  );
}
