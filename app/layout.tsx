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
      <body>
        <main className="relative">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(circle at 20% 30%, rgba(255, 126, 0, 0.5) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(255, 126, 0, 0.3) 0%, transparent 40%)',
              filter: 'blur(60px)',
            }}
          ></div>

          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="neural-net"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <g fill="#ff7e00" r="2">
                    <circle cx="50" cy="50" r="2" />
                    <circle cx="15" cy="15" r="2" />
                    <circle cx="85" cy="15" r="2" />
                    <circle cx="15" cy="85" r="2" />
                    <circle cx="85" cy="85" r="2" />
                  </g>

                  <g stroke="#ff7e00" strokeWidth="0.5">
                    <g opacity="0.6">
                      <line x1="50" y1="50" x2="15" y2="15" />
                      <line x1="50" y1="50" x2="85" y2="15" />
                      <line x1="50" y1="50" x2="15" y2="85" />
                      <line x1="50" y1="50" x2="85" y2="85" />
                    </g>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#neural-net)" />
            </svg>
          </div>
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
