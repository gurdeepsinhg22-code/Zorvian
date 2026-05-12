'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-[#f8fafc]">
      <Sidebar
        className="md:sticky md:top-0 md:self-stretch md:min-h-screen"
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen((p) => !p)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen((p) => !p)}
        />
        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
