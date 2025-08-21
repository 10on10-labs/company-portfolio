import '../globals.css';

import Footer from '@/components/footer';
import TawkChat from '@/components/tawk-chat';
import { TopNavbar } from '@/components/top-navbar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <TopNavbar />
      <main className="flex-grow mt-20 sm:mt-30 relative z-0">{children}</main>
      <Footer />
      <TawkChat />
    </div>
  );
}
