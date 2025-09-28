import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../../contexts/AuthContext';
import { useTickets } from '../../hooks/useTickets';
import { useBilling } from '../../hooks/useBilling';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { TicketCard } from './tickets/TicketCard';
import PortalLayout from './PortalLayout';

const PortalDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { tickets, stats, fetchTickets, loading } = useTickets();
  const { subscription, alerts, invoices } = useBilling();
  const user = authState.user;

  useEffect(() => {
    // Load recent tickets for dashboard
    fetchTickets({}, { field: 'updatedAt', direction: 'desc' }, 1, 5);
  }, []);

  // Dashboard stats from real ticket data and billing
  const dashboardStats = {
    activeTickets: stats ? stats.open + stats.inProgress : 0,
    resolvedTickets: stats ? stats.resolved : 0,
    nextBilling: subscription?.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString() : 'N/A',
    accountStatus: subscription?.status || user?.subscriptionStatus || 'inactive',
  };

  // Get billing alerts
  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const overdueInvoices = invoices.filter(invoice =>
    invoice.status === 'open' &&
    new Date(invoice.dueDate) < new Date()
  );

  // Format currency
  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  // Get recent tickets (limit to 3 for dashboard)
  const recentTickets = tickets.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-200';
      case 'inactive':
        return 'bg-orange-500/20 text-orange-200';
      case 'cancelled':
        return 'bg-red-500/20 text-red-200';
      default:
        return 'bg-gray-500/20 text-gray-200';
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-300 mt-1">
                Here's an overview of your IT solutions account
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Badge className={getStatusColor(dashboardStats.accountStatus)}>
                {dashboardStats.accountStatus === 'active' ? '✓ Active Plan' : '⚠ Inactive Plan'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
              <span className="text-2xl">🎫</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeTickets}</div>
              <p className="text-xs text-muted-foreground">
                Support requests in progress
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
              <span className="text-2xl">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.resolvedTickets}</div>
              <p className="text-xs text-muted-foreground">
                Issues resolved this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
              <span className="text-2xl">💳</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscription?.nextBillingDate
                  ? new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : 'N/A'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {subscription && subscription.discountApplied
                  ? `${formatAmount(subscription.plan.price * (1 - (subscription.discountApplied.percentOff || 0) / 100), subscription.plan.currency)} (15% off)`
                  : subscription
                    ? formatAmount(subscription.plan.price, subscription.plan.currency)
                    : 'No active subscription'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan Status</CardTitle>
              <span className="text-2xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscription?.plan.name.split(' ')[0] || 'No Plan'}
              </div>
              <p className="text-xs text-muted-foreground">
                {subscription?.plan.name || 'Choose a plan to get started'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Billing Alerts */}
        {(unreadAlerts.length > 0 || overdueInvoices.length > 0) && (
          <div className="space-y-4">
            {unreadAlerts.slice(0, 2).map((alert) => (
              <Alert key={alert.id} className="bg-black/20 border-white/20">
                <AlertDescription>
                  <strong>{alert.title}:</strong> {alert.message}
                </AlertDescription>
              </Alert>
            ))}
            
            {overdueInvoices.length > 0 && (
              <Alert className="bg-red-900/30 border-red-500/50">
                <AlertDescription className="text-red-200">
                  <strong>Payment Overdue:</strong> You have {overdueInvoices.length} overdue invoice{overdueInvoices.length > 1 ? 's' : ''} totaling {formatAmount(overdueInvoices.reduce((sum, inv) => sum + inv.amountDue, 0))}.
                  <Link href="/portal/billing" className="ml-2 underline">View billing details</Link>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tickets */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle>Recent Support Tickets</CardTitle>
              <CardDescription>
                Your latest support requests and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : recentTickets.length > 0 ? (
                  <>
                    {recentTickets.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        variant="compact"
                        showActions={false}
                      />
                    ))}
                    <div className="pt-2">
                      <Link href="/portal/tickets">
                        <Button variant="outline" className="w-full bg-transparent text-white border-white/50 hover:bg-white/10">
                          View All Tickets ({stats?.total || 0})
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🎫</div>
                    <p className="text-gray-400 mb-4">No tickets yet</p>
                    <Link href="/portal/tickets/new">
                      <Button size="sm">Create Your First Ticket</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/portal/tickets/new">
                  <Button className="w-full justify-start bg-white/5 border border-white/20 text-white hover:bg-white/10" variant="outline">
                    <span className="mr-2">🎫</span>
                    Create Support Ticket
                  </Button>
                </Link>
                
                <Link href="/portal/billing">
                  <Button className="w-full justify-start bg-white/5 border border-white/20 text-white hover:bg-white/10" variant="outline">
                    <span className="mr-2">💳</span>
                    View Billing & Invoices
                  </Button>
                </Link>
                
                <Link href="/portal/profile">
                  <Button className="w-full justify-start bg-white/5 border border-white/20 text-white hover:bg-white/10" variant="outline">
                    <span className="mr-2">👤</span>
                    Update Profile
                  </Button>
                </Link>
                
                <a href="tel:+1-305-555-0123">
                  <Button className="w-full justify-start bg-white/5 border border-white/20 text-white hover:bg-white/10" variant="outline">
                    <span className="mr-2">📞</span>
                    Emergency Support
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Information */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your current subscription and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-2">Contact Information</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
                  <p><strong>Company:</strong> {user?.company || 'Not provided'}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Subscription Details</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><strong>Plan:</strong> {subscription?.plan.name || user?.subscriptionPlan || 'No active plan'}</p>
                  <div className="flex items-center">
                    <strong>Status:</strong>
                    <Badge className={`ml-2 ${getStatusColor(subscription?.status || user?.subscriptionStatus || 'inactive')}`}>
                      {subscription?.status || user?.subscriptionStatus || 'inactive'}
                    </Badge>
                  </div>
                  <p><strong>Next Billing:</strong> {subscription?.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Member since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
};

export default PortalDashboard;