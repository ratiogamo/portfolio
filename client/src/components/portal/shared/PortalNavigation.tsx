import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/button';
import { PortalNavItem } from '../../../types/portal';

const PortalNavigation: React.FC = () => {
  const [location] = useLocation();
  const { authState, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: PortalNavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/portal/dashboard',
      icon: '📊',
    },
    {
      id: 'tickets',
      label: 'Support Tickets',
      href: '/portal/tickets',
      icon: '🎫',
    },
    {
      id: 'billing',
      label: 'Billing',
      href: '/portal/billing',
      icon: '💳',
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/portal/profile',
      icon: '👤',
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    return location === href || location.startsWith(href + '/');
  };

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/portal/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-inter text-white">
                JamesDev<span className="text-secondary">Pro</span>
              </span>
              <span className="hidden sm:block text-sm text-gray-400 border-l border-white/20 pl-2 ml-2">
                Customer Portal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveRoute(item.href)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {authState.user?.firstName} {authState.user?.lastName}
                </p>
                <p className="text-xs text-gray-400">
                  {authState.user?.subscriptionStatus === 'active' ? (
                    <span className="text-green-400">✓ Active Subscription</span>
                  ) : (
                    <span className="text-orange-400">⚠ Inactive</span>
                  )}
                </p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {authState.user?.firstName?.[0]}{authState.user?.lastName?.[0]}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden md:flex bg-transparent text-white border-white/50 hover:bg-white/10"
            >
              Logout
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/5"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="pt-2 pb-3 space-y-1">
              {/* User Info Mobile */}
              <div className="px-3 py-2 border-b border-white/20 mb-2">
                <p className="text-sm font-medium text-white">
                  {authState.user?.firstName} {authState.user?.lastName}
                </p>
                <p className="text-xs text-gray-400">
                  {authState.user?.email}
                </p>
                <p className="text-xs mt-1">
                  {authState.user?.subscriptionStatus === 'active' ? (
                    <span className="text-green-400">✓ Active Subscription</span>
                  ) : (
                    <span className="text-orange-400">⚠ Inactive</span>
                  )}
                </p>
              </div>

              {/* Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 text-base font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-white/10 text-white border-r-2 border-primary'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Logout Button Mobile */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/10 flex items-center space-x-3"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>

              {/* Back to Main Site */}
              <Link
                href="/"
                className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 border-t border-white/20 mt-2 pt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>🏠</span>
                <span>Back to Main Site</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PortalNavigation;