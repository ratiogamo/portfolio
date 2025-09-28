import { useState, useEffect, useCallback } from 'react';
import {
  Subscription,
  PaymentMethod,
  Invoice,
  Payment,
  BillingAlert,
  BillingStats,
  UseBillingReturn,
} from '../types/billing';

// Mock data for development
const mockSubscription: Subscription = {
  id: 'sub_1234567890',
  customerId: 'cus_1234567890',
  planId: 'pro',
  plan: {
    id: 'pro',
    name: 'Pro IT Solutions',
    description: 'Comprehensive IT management for growing businesses',
    price: 25000, // $250 in cents
    currency: 'USD',
    interval: 'month',
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
  status: 'active',
  currentPeriodStart: '2024-01-15T00:00:00Z',
  currentPeriodEnd: '2024-02-15T00:00:00Z',
  cancelAtPeriodEnd: false,
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
  discountApplied: {
    id: 'discount_15percent',
    couponId: 'new_customer_15',
    name: 'New Customer 15% Off',
    percentOff: 15,
    duration: 'forever',
    timesRedeemed: 1,
    isActive: true,
  },
  nextBillingDate: '2024-02-15T00:00:00Z',
  billingCycleAnchor: '2024-01-15T00:00:00Z',
};

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm_1234567890',
    type: 'card',
    isDefault: true,
    card: {
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      funding: 'credit',
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'pm_0987654321',
    type: 'bank_account',
    isDefault: false,
    bankAccount: {
      bankName: 'Chase Bank',
      last4: '6789',
      accountType: 'checking',
    },
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
];

const mockInvoices: Invoice[] = [
  {
    id: 'in_1234567890',
    customerId: 'cus_1234567890',
    subscriptionId: 'sub_1234567890',
    number: 'INV-2024-001',
    status: 'paid',
    amount: 21250, // $212.50 with 15% discount
    amountPaid: 21250,
    amountDue: 0,
    currency: 'USD',
    description: 'Pro IT Solutions - February 2024',
    invoiceDate: '2024-01-15T00:00:00Z',
    dueDate: '2024-01-30T00:00:00Z',
    paidAt: '2024-01-16T00:00:00Z',
    periodStart: '2024-01-15T00:00:00Z',
    periodEnd: '2024-02-15T00:00:00Z',
    subtotal: 25000,
    tax: 0,
    discount: 3750, // 15% discount
    total: 21250,
    items: [
      {
        id: 'ii_1234567890',
        description: 'Pro IT Solutions - Monthly Subscription',
        quantity: 1,
        unitAmount: 25000,
        amount: 25000,
        currency: 'USD',
        period: {
          start: '2024-01-15T00:00:00Z',
          end: '2024-02-15T00:00:00Z',
        },
      },
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
  {
    id: 'in_0987654321',
    customerId: 'cus_1234567890',
    subscriptionId: 'sub_1234567890',
    number: 'INV-2024-002',
    status: 'open',
    amount: 21250,
    amountPaid: 0,
    amountDue: 21250,
    currency: 'USD',
    description: 'Pro IT Solutions - March 2024',
    invoiceDate: '2024-02-15T00:00:00Z',
    dueDate: '2024-03-01T00:00:00Z',
    periodStart: '2024-02-15T00:00:00Z',
    periodEnd: '2024-03-15T00:00:00Z',
    subtotal: 25000,
    tax: 0,
    discount: 3750,
    total: 21250,
    items: [
      {
        id: 'ii_0987654321',
        description: 'Pro IT Solutions - Monthly Subscription',
        quantity: 1,
        unitAmount: 25000,
        amount: 25000,
        currency: 'USD',
        period: {
          start: '2024-02-15T00:00:00Z',
          end: '2024-03-15T00:00:00Z',
        },
      },
    ],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
];

const mockPayments: Payment[] = [
  {
    id: 'pi_1234567890',
    customerId: 'cus_1234567890',
    invoiceId: 'in_1234567890',
    subscriptionId: 'sub_1234567890',
    amount: 21250,
    currency: 'USD',
    status: 'succeeded',
    paymentMethod: mockPaymentMethods[0],
    description: 'Pro IT Solutions - February 2024',
    refunded: false,
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
];

const mockAlerts: BillingAlert[] = [
  {
    id: 'alert_1234567890',
    type: 'invoice_upcoming',
    title: 'Upcoming Payment',
    message: 'Your next payment of $212.50 is due on March 1, 2024',
    severity: 'info',
    isRead: false,
    actionRequired: false,
    createdAt: '2024-02-20T00:00:00Z',
  },
];

const mockStats: BillingStats = {
  totalRevenue: 21250,
  monthlyRecurringRevenue: 21250,
  activeSubscriptions: 1,
  pastDueInvoices: 0,
  upcomingInvoices: 1,
  failedPayments: 0,
  successfulPayments: 1,
  averageRevenuePerUser: 21250,
  churnRate: 0,
  lifetimeValue: 21250,
};

export const useBilling = (): UseBillingReturn => {
  const [subscription, setSubscription] = useState<Subscription | null>(mockSubscription);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [alerts, setAlerts] = useState<BillingAlert[]>(mockAlerts);
  const [stats] = useState<BillingStats | null>(mockStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch functions (mock implementations)
  const fetchSubscription = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscription(mockSubscription);
    } catch (err) {
      setError('Failed to fetch subscription');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPaymentMethods(mockPaymentMethods);
    } catch (err) {
      setError('Failed to fetch payment methods');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setInvoices(mockInvoices);
    } catch (err) {
      setError('Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPayments(mockPayments);
    } catch (err) {
      setError('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setAlerts(mockAlerts);
    } catch (err) {
      setError('Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Subscription management
  const updateSubscription = useCallback(async (planId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock subscription update
      if (subscription) {
        const updatedSubscription = { ...subscription, planId };
        // Update plan based on planId (mock logic)
        setSubscription(updatedSubscription);
      }
    } catch (err) {
      setError('Failed to update subscription');
    } finally {
      setLoading(false);
    }
  }, [subscription]);

  const cancelSubscription = useCallback(async (cancelAtPeriodEnd = true) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (subscription) {
        const updatedSubscription = {
          ...subscription,
          cancelAtPeriodEnd,
          status: cancelAtPeriodEnd ? subscription.status : 'canceled' as const,
        };
        setSubscription(updatedSubscription);
      }
    } catch (err) {
      setError('Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  }, [subscription]);

  const resumeSubscription = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (subscription) {
        const updatedSubscription = {
          ...subscription,
          cancelAtPeriodEnd: false,
          status: 'active' as const,
        };
        setSubscription(updatedSubscription);
      }
    } catch (err) {
      setError('Failed to resume subscription');
    } finally {
      setLoading(false);
    }
  }, [subscription]);

  // Payment methods
  const addPaymentMethod = useCallback(async (paymentMethodData: Partial<PaymentMethod>) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newPaymentMethod: PaymentMethod = {
        id: `pm_${Date.now()}`,
        type: paymentMethodData.type || 'card',
        isDefault: paymentMethodData.isDefault || false,
        ...paymentMethodData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as PaymentMethod;

      setPaymentMethods(prev => [...prev, newPaymentMethod]);
    } catch (err) {
      setError('Failed to add payment method');
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePaymentMethod = useCallback(async (id: string, updates: Partial<PaymentMethod>) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPaymentMethods(prev =>
        prev.map(pm => pm.id === id ? { ...pm, ...updates, updatedAt: new Date().toISOString() } : pm)
      );
    } catch (err) {
      setError('Failed to update payment method');
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePaymentMethod = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    } catch (err) {
      setError('Failed to delete payment method');
    } finally {
      setLoading(false);
    }
  }, []);

  const setDefaultPaymentMethod = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPaymentMethods(prev =>
        prev.map(pm => ({ ...pm, isDefault: pm.id === id }))
      );
    } catch (err) {
      setError('Failed to set default payment method');
    } finally {
      setLoading(false);
    }
  }, []);

  // Invoices and payments
  const downloadInvoice = useCallback(async (invoiceId: string) => {
    try {
      // Mock download - in real implementation, this would trigger a file download
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (invoice) {
        // Create a mock PDF download
        const blob = new Blob([`Invoice ${invoice.number} - ${invoice.description}`], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoice.number}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError('Failed to download invoice');
    }
  }, [invoices]);

  const retryPayment = useCallback(async (invoiceId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock payment retry
      setInvoices(prev =>
        prev.map(inv =>
          inv.id === invoiceId
            ? { ...inv, status: 'paid' as const, amountDue: 0, paidAt: new Date().toISOString() }
            : inv
        )
      );
    } catch (err) {
      setError('Failed to retry payment');
    } finally {
      setLoading(false);
    }
  }, []);

  // Discounts
  const applyDiscount = useCallback(async (couponCode: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock discount application
      console.log('Applying discount:', couponCode);
    } catch (err) {
      setError('Failed to apply discount');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeDiscount = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (subscription) {
        setSubscription({ ...subscription, discountApplied: undefined });
      }
    } catch (err) {
      setError('Failed to remove discount');
    } finally {
      setLoading(false);
    }
  }, [subscription]);

  // Alerts
  const markAlertAsRead = useCallback(async (alertId: string) => {
    try {
      setAlerts(prev =>
        prev.map(alert =>
          alert.id === alertId ? { ...alert, isRead: true } : alert
        )
      );
    } catch (err) {
      setError('Failed to mark alert as read');
    }
  }, []);

  const dismissAlert = useCallback(async (alertId: string) => {
    try {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    } catch (err) {
      setError('Failed to dismiss alert');
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    fetchSubscription();
    fetchPaymentMethods();
    fetchInvoices();
    fetchPayments();
    fetchAlerts();
  }, [fetchSubscription, fetchPaymentMethods, fetchInvoices, fetchPayments, fetchAlerts]);

  return {
    subscription,
    paymentMethods,
    invoices,
    payments,
    alerts,
    stats,
    loading,
    error,
    fetchSubscription,
    fetchPaymentMethods,
    fetchInvoices,
    fetchPayments,
    fetchAlerts,
    updateSubscription,
    cancelSubscription,
    resumeSubscription,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
    downloadInvoice,
    retryPayment,
    applyDiscount,
    removeDiscount,
    markAlertAsRead,
    dismissAlert,
  };
};