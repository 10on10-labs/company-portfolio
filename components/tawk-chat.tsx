'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function TawkChat() {
  useEffect(() => {
    // Initialize Tawk_API immediately when component mounts
    if (typeof window !== 'undefined') {
      (window as any).Tawk_API = (window as any).Tawk_API || {};
      (window as any).Tawk_LoadStart = new Date();
    }
  }, []);

  return (
    <>
      {/* DNS prefetch for faster loading */}
      <link rel="dns-prefetch" href="https://embed.tawk.to" />
      <link rel="preconnect" href="https://embed.tawk.to" crossOrigin="" />

      <Script
        id="tawk-chat"
        src="https://embed.tawk.to/68a8b1aba4fc79192a7cf16e/1j39fc1ut"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
