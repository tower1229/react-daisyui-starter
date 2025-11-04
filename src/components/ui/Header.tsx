import { Link } from '@tanstack/react-router';

import Logo from '@/assets/images/onta-white.svg?react';

import { UserMenu } from './UserMenu';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`navbar bg-base-100 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Logo className="w-10 h-10 text-base-content" />
                <span className="text-xl font-semibold text-base-content">Onta Network</span>
              </Link>
            </div>
          </div>

          {/* Right side content */}
          <div className="flex items-center space-x-4">
            {/* <span className="text-sm text-base-content/70">Messages</span> */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
