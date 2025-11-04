import { type ReactNode } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { Home, Moon, Sun } from 'lucide-react';

import { Header } from '@/components/ui';
import { useActualTheme, useThemeActions } from '@/stores/themeStore';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="w-5 h-5" />,
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const actualTheme = useActualTheme();
  const { toggleTheme } = useThemeActions();

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      {/* Fixed Header */}
      <Header className="mb-8" />

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden gap-6 px-6">
        {/* Fixed Sidebar */}
        <aside className="w-64 bg-base-100 flex flex-col shadow-lg">
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Digital Currency Title */}
            <h2 className="text-lg font-semibold text-base-content mb-6">Digital Currency</h2>

            {/* Navigation */}
            <nav className="space-y-2">
              {/* HOME Section */}
              <div className="mb-4">
                <h3 className="font-semibold text-base-content/60 uppercase tracking-wider mb-4">
                  HOME
                </h3>
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = currentPath === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center space-x-3 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-content'
                            : 'text-base-content/80 hover:bg-base-200 hover:text-base-content'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          {/* Fixed Bottom Controls */}
          <div className="p-6 border-t border-base-300">
            <div className="flex space-x-2">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-circle"
                title={actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {actualTheme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Scrollable Main content area */}
        <main className="flex-1 overflow-y-auto bg-base-100 rounded-lg shadow-lg p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
