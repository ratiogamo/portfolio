import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import Galaxy from '../../backgrounds/Galaxy';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative text-white">
      <div className="fixed inset-0 z-0">
        <Galaxy
          density={0.3}
          glowIntensity={0.8}
          starSpeed={0.2}
          saturation={1.0}
          rotationSpeed={0.05}
        />
      </div>
      <div className="relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <Link href="/" className="flex justify-center">
            <img src="/logo.png" alt="JamesDevPro Logo" className="h-20 w-auto mx-auto" />
          </Link>
          
          {/* Title */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {title}
          </h2>
          
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-300">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-black/20 backdrop-blur-md border border-white/20 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            ← Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;