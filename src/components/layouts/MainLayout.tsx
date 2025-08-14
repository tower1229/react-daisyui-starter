import type { ReactNode } from 'react';
import { Header } from '@/components/ui';

interface LayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
