import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { getCalApi } from "@calcom/embed-react";
import { useLocation } from 'wouter';

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
    <div className="font-roboto bg-light text-dark min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;