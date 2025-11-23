'use client';
import { ReactNode } from 'react';
import LeftSidebar from '@/components/shared/LeftSiderbar';

export default function MusicGeneratorLayout({ children, }: { children: ReactNode; }) {
  return (
    <div className="flex flex-row min-h-screen bg-gray-950 text-gray-100">
        <div>
          <aside className="sticky top-0 h-screen z-30 flex-shrink-0">
          <LeftSidebar />
        </aside>
        </div>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto min-w-0 bg-gray-950">
          <div className="h-full custom-scrollbar">
            <div className="p-6 md:p-8 min-h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}