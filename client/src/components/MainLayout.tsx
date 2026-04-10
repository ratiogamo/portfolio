import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { getCalApi } from "@calcom/embed-react";
import { useLocation } from 'wouter';
import Galaxy from './backgrounds/Galaxy';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <div className="font-roboto text-gray-300 min-h-screen flex flex-col bg-black">
      <div className="fixed inset-0 z-0">
        <Galaxy
          density={0.3}
          glowIntensity={0.8}
          starSpeed={0.2}
          saturation={1.0}
          rotationSpeed={0.05}
        />
      </div>
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;