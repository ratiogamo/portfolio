import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Alert, AlertDescription } from '../../ui/alert';
import PortalLayout from '../PortalLayout';
import BillingCard from './BillingCard';
import SubscriptionManager from './SubscriptionManager';
import PaymentHistory from './PaymentHistory';
import InvoiceDownload from './InvoiceDownload';
import PaymentMethodManager from './PaymentMethodManager';
import { useBilling } from '../../../hooks/useBilling';

const BillingDashboard: React.FC = () => {
  const {
    subscription,
    paymentMethods,
    invoices,
    payments,
    alerts,
    stats,
    loading,
    error,
    updateSubscription,
    cancelSubscription,
    resumeSubscription,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    downloadInvoice,
    retryPayment,
    markAlertAsRead,
    dismissAlert,
  } = useBilling();

  const [activeTab, setActiveTab] = useState('overview');

  // Mock available plans for subscription changes
  const availablePlans = [
    {
      id: 'basic',
      name: 'Basic IT Solutions',
      description: 'Essential IT support for small businesses',
      price: 15000, // $150 in cents
      currency: 'USD',
      interval: 'month' as const,
      features: [
        'Email support',
        'Basic troubleshooting',
        'Monthly system check',
        '5 support tickets/month',
      ],
      discountPercentage: 15,
    },
    {
      id: 'pro',
      name: 'Pro IT Solutions',
      description: 'Comprehensive IT management for growing businesses',
      price: 25000, // $250 in cents
      currency: 'USD',
      interval: 'month' as const,
      features: [
        'Priority phone & email support',
        'Advanced troubleshooting',
        'Weekly system monitoring',
        'Unlimited support tickets',
        'Remote desktop support',
        'Security monitoring',
        'Backup management',
      ],
      isPopular: true,
      discountPercentage: 15,
    },
    {
      id: 'enterprise',
      name: 'Enterprise IT Solutions',
      description: 'Full-scale IT infrastructure management',
      price: 50000, // $500 in cents
      currency: 'USD',
      interval: 'month' as const,
      features: [
        'Dedicated account manager',
        '24/7 phone support',
        'Daily system monitoring',
        'Unlimited support tickets',
        'On-site support available',
        'Advanced security suite',
        'Disaster recovery planning',
        'Custom integrations',
      ],
      discountPercentage: 15,
    },
  ];

  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getNextBillingAmount = () => {
    if (!subscription) return 0;
    
    let amount = subscription.plan.price;
    if (subscription.discountApplied?.percentOff) {
      amount = amount * (1 - subscription.discountApplied.percentOff / 100);
    }
    return amount;
  };

  const getUnreadAlertsCount = () => {
    return alerts.filter(alert => !alert.isRead).length;
  };

  const getOverdueInvoices = () => {
    return invoices.filter(invoice => 
      invoice.status === 'open' && 
      new Date(invoice.dueDate) < new Date()
    );
  };

  const getUpcomingInvoices = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return invoices.filter(invoice => 
      invoice.status === 'open' && 
      new Date(invoice.dueDate) <= thirtyDaysFromNow &&
      new Date(invoice.dueDate) >= new Date()
    );
  };

  if (error) {
    return (
      <PortalLayout>
        <div className="space-y-6">
          <Alert>
            <AlertDescription>
              <strong>Error loading billing information:</strong> {error}
            </AlertDescription>
          </Alert>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing & Subscriptions</h1>
            <p className="text-gray-600 mt-1">
              Manage your subscription, payment methods, and billing history
            </p>
          </div>
          {getUnreadAlertsCount() > 0 && (
            <Badge variant="destructive">
              {getUnreadAlertsCount()} Alert{getUnreadAlertsCount() > 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {/* Alerts */}
        {alerts.filter(alert => !alert.isRead).length > 0 && (
          <div className="space-y-2">
            {alerts
              .filter(alert => !alert.isRead)
              .slice(0, 3)
              .map((alert) => (
                <Alert key={alert.id} className={
                  alert.severity === 'error' ? 'border-red-200 bg-red-50' :
                  alert.severity === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  alert.severity === 'success' ? 'border-green-200 bg-green-50' :
                  'border-blue-200 bg-blue-50'
                }>
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <strong>{alert.title}:</strong> {alert.message}
                      </div>
                      <div className="flex space-x-2">
                        {alert.actionUrl && alert.actionText && (
                          <Button size="sm" variant="outline">
                            {alert.actionText}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAlertAsRead(alert.id)}
                        >
                          Mark Read
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BillingCard
                title="Current Plan"
                value={subscription?.plan.name || 'No Plan'}
                subtitle={subscription ? `${formatAmount(getNextBillingAmount(), subscription.plan.currency)}/month` : 'Choose a plan'}
                status={subscription?.status}
                icon="📋"
              />
              
              <BillingCard
                title="Next Billing"
                value={subscription ? formatDate(subscription.nextBillingDate) : 'N/A'}
                subtitle={subscription ? formatAmount(getNextBillingAmount(), subscription.plan.currency) : 'No upcoming billing'}
                icon="📅"
              />
              
              <BillingCard
                title="Payment Methods"
                value={paymentMethods.length}
                subtitle={paymentMethods.length > 0 ? 'methods on file' : 'Add a payment method'}
                icon="💳"
                action={paymentMethods.length === 0 ? {
                  label: 'Add Payment Method',
                  onClick: () => setActiveTab('payment-methods'),
                } : undefined}
              />
              
              <BillingCard
                title="Outstanding Balance"
                value={getOverdueInvoices().reduce((sum, inv) => sum + inv.amountDue, 0)}
                subtitle={getOverdueInvoices().length > 0 ? `${getOverdueInvoices().length} overdue invoice${getOverdueInvoices().length > 1 ? 's' : ''}` : 'All caught up'}
                status={getOverdueInvoices().length > 0 ? 'past_due' : 'paid'}
                icon="⚠️"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Invoices */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Your latest billing documents</CardDescription>
                </CardHeader>
                <CardContent>
                  {invoices.slice(0, 3).length > 0 ? (
                    <div className="space-y-3">
                      {invoices.slice(0, 3).map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{invoice.number}</p>
                            <p className="text-sm text-gray-500">{formatDate(invoice.invoiceDate)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatAmount(invoice.total, invoice.currency)}</p>
                            <Badge className={
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                              invoice.status === 'open' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {invoice.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab('invoices')}
                      >
                        View All Invoices
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No invoices yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Your latest payment activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {payments.slice(0, 3).length > 0 ? (
                    <div className="space-y-3">
                      {payments.slice(0, 3).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{formatAmount(payment.amount, payment.currency)}</p>
                            <p className="text-sm text-gray-500">{formatDate(payment.createdAt)}</p>
                          </div>
                          <Badge className={
                            payment.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {payment.status}
                          </Badge>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab('history')}
                      >
                        View Payment History
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No payments yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Billing */}
            {subscription && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Billing</CardTitle>
                  <CardDescription>Your next billing cycle information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Next Billing Date</label>
                      <p className="text-lg font-semibold">{formatDate(subscription.nextBillingDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Amount</label>
                      <p className="text-lg font-semibold">{formatAmount(getNextBillingAmount(), subscription.plan.currency)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Method</label>
                      <p className="text-lg font-semibold">
                        {paymentMethods.find(pm => pm.isDefault)?.card?.brand.toUpperCase() || 'None'} 
                        {paymentMethods.find(pm => pm.isDefault)?.card?.last4 && ` •••• ${paymentMethods.find(pm => pm.isDefault)?.card?.last4}`}
                      </p>
                    </div>
                  </div>
                  {subscription.discountApplied && (
                    <Alert className="mt-4">
                      <AlertDescription>
                        <strong>Discount Applied:</strong> {subscription.discountApplied.name} - 
                        {subscription.discountApplied.percentOff}% off your subscription
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <SubscriptionManager
              subscription={subscription}
              availablePlans={availablePlans}
              onUpdateSubscription={updateSubscription}
              onCancelSubscription={cancelSubscription}
              onResumeSubscription={resumeSubscription}
              loading={loading}
            />
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods">
            <PaymentMethodManager
              paymentMethods={paymentMethods}
              onAddPaymentMethod={addPaymentMethod}
              onUpdatePaymentMethod={updatePaymentMethod}
              onDeletePaymentMethod={deletePaymentMethod}
              onSetDefaultPaymentMethod={setDefaultPaymentMethod}
              loading={loading}
            />
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <InvoiceDownload
              invoices={invoices}
              onDownloadInvoice={downloadInvoice}
              onRetryPayment={retryPayment}
              loading={loading}
            />
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history">
            <PaymentHistory
              payments={payments}
              onRetryPayment={retryPayment}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default BillingDashboard;