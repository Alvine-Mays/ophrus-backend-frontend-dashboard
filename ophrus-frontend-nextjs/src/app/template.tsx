'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages qui n'ont pas besoin du layout complet (comme la page d'intro)
  const noLayoutPages = ['/'];
  
  if (noLayoutPages.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

