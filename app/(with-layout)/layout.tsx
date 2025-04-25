import '../globals.css';

import { MainSidebar } from '@/components/main-sidebar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white flex overscroll-none overflow-hidden">
      <div>
        <MainSidebar />
      </div>
      <div className="container flex items-center p-10">{children}</div>
    </div>
  );
}
