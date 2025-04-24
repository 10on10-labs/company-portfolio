import '../globals.css';

import { Saira_Condensed } from 'next/font/google';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';

import { MainSidebar } from '@/components/main-sidebar';

import { handleError } from '../client-functions';
import { DraftModeToast } from '../DraftModeToast';

const sairaCondensed = Saira_Condensed({
  variable: '--font-saira-condensed',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sairaCondensed.variable} font-barlow`}>
      <body className="overscroll-none">
        <main className="bg-white flex overscroll-none overflow-hidden">
          <MainSidebar />

          {children}
        </main>
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
