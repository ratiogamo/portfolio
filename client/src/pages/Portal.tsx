import React from 'react';
import { Switch, Route } from 'wouter';
import { AuthProvider } from '../contexts/AuthContext';
import { TicketsProvider } from '../contexts/TicketsContext';
import ProtectedRoute from '../components/portal/auth/ProtectedRoute';
import LoginForm from '../components/portal/auth/LoginForm';
import RegisterForm from '../components/portal/auth/RegisterForm';
import PortalDashboard from '../components/portal/PortalDashboard';
import TicketList from '../components/portal/tickets/TicketList';
import CreateTicket from '../components/portal/tickets/CreateTicket';
import BillingDashboard from '../components/portal/billing/BillingDashboard';

const Portal: React.FC = () => {
  return (
    <AuthProvider>
      <TicketsProvider>
        <Switch>
          {/* Public auth routes */}
          <Route path="/portal/login" component={LoginForm} />
          <Route path="/portal/register" component={RegisterForm} />
          
          {/* Protected portal routes */}
          <Route path="/portal/dashboard">
            <ProtectedRoute>
              <PortalDashboard />
            </ProtectedRoute>
          </Route>
          
          {/* Ticket management routes */}
          <Route path="/portal/tickets/new">
            <ProtectedRoute>
              <CreateTicket />
            </ProtectedRoute>
          </Route>
          
          <Route path="/portal/tickets">
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          </Route>
          
          <Route path="/portal/billing">
            <ProtectedRoute>
              <BillingDashboard />
            </ProtectedRoute>
          </Route>
          
          <Route path="/portal/profile">
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h1>
                  <p className="text-gray-600">This feature will be implemented soon.</p>
                </div>
              </div>
            </ProtectedRoute>
          </Route>
          
          {/* Default portal route - redirect to dashboard */}
          <Route path="/portal">
            <ProtectedRoute redirectTo="/portal/login">
              <PortalDashboard />
            </ProtectedRoute>
          </Route>
        </Switch>
      </TicketsProvider>
    </AuthProvider>
  );
};

export default Portal;