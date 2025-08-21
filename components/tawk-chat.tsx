'use client';

import Script from 'next/script';

export default function TawkChat() {
  return (
    <>
      <Script
        id="tawk-api"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          `,
        }}
      />
      <Script
        id="tawk-chat"
        src="https://embed.tawk.to/68a73d3f1229991923daca63/1j36kegth"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
