import '../globals.css';

import { TopNavbar } from '@/components/top-navbar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center h-full w-full z-1">
      <TopNavbar />
      <div className="w-full  h-full hide-scrollbar  mt-20 sm:mt-30 mb-20">{children}</div>
    </div>
  );
}
