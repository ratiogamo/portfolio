import React, { useEffect } from 'react';
import PortalNavigation from './shared/PortalNavigation';
import { useLocation } from 'wouter';
import Galaxy from '../backgrounds/Galaxy';
import { useTickets } from '../../contexts/TicketsContext';
import TicketDetailModal from './tickets/TicketDetailModal';

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const { selectedTicketId, setSelectedTicketId } = useTickets();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleCloseModal = () => {
    setSelectedTicketId(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-300">
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
        <PortalNavigation />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <TicketDetailModal
          ticketId={selectedTicketId}
          isOpen={!!selectedTicketId}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default PortalLayout;