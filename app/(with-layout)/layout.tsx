import '../globals.css';

import { MainSidebar } from '@/components/main-sidebar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary flex overscroll-none overflow-hidden h-full w-full">
      <MainSidebar />
      <div className="w-full p-5 max-[600px]:pt-20">{children}</div>
    </div>
  );
}
