// Comprehensive billing and subscription TypeScript interfaces

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
  discountPercentage?: number;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete' | 'incomplete_expired' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  trialStart?: string;
  trialEnd?: string;
  createdAt: string;
  updatedAt: string;
  discountApplied?: Discount;
  nextBillingDate: string;
  billingCycleAnchor: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account' | 'digital_wallet';
  isDefault: boolean;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    funding: 'credit' | 'debit' | 'prepaid';
  };
  bankAccount?: {
    bankName: string;
    last4: string;
    accountType: 'checking' | 'savings';
  };
  digitalWallet?: {
    type: 'apple_pay' | 'google_pay' | 'paypal';
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  subscriptionId?: string;
  number: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  amount: number;
  amountPaid: number;
  amountDue: number;
  currency: string;
  description?: string;
  invoiceDate: string;
  dueDate: string;
  paidAt?: string;
  periodStart: string;
  periodEnd: string;
  subtotal: number;
  tax?: number;
  discount?: number;
  total: number;
  paymentMethod?: PaymentMethod;
  downloadUrl?: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitAmount: number;
  amount: number;
  currency: string;
  period?: {
    start: string;
    end: string;
  };
}

export interface Payment {
  id: string;
  customerId: string;
  invoiceId?: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'canceled' | 'requires_action' | 'requires_confirmation';
  paymentMethod: PaymentMethod;
  description?: string;
  failureReason?: string;
  refunded: boolean;
  refundedAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Discount {
  id: string;
  couponId: string;
  name: string;
  percentOff?: number;
  amountOff?: number;
  currency?: string;
  duration: 'once' | 'repeating' | 'forever';
  durationInMonths?: number;
  validUntil?: string;
  timesRedeemed: number;
  maxRedemptions?: number;
  isActive: boolean;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  description?: string;
  defaultPaymentMethod?: string;
  invoiceSettings: {
    defaultPaymentMethod?: string;
    customFields?: Array<{
      name: string;
      value: string;
    }>;
  };
  address?: BillingAddress;
  shipping?: {
    address: BillingAddress;
    name: string;
    phone?: string;
  };
  taxExempt: 'none' | 'exempt' | 'reverse';
  createdAt: string;
  updatedAt: string;
}

export interface BillingAlert {
  id: string;
  type: 'payment_failed' | 'payment_succeeded' | 'invoice_upcoming' | 'subscription_canceled' | 'trial_ending';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  actionRequired: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
}

export interface BillingStats {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  activeSubscriptions: number;
  pastDueInvoices: number;
  upcomingInvoices: number;
  failedPayments: number;
  successfulPayments: number;
  averageRevenuePerUser: number;
  churnRate: number;
  lifetimeValue: number;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded';
  clientSecret: string;
  paymentMethod?: PaymentMethod;
  description?: string;
  receiptEmail?: string;
  setupFutureUsage?: 'on_session' | 'off_session';
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
    previous_attributes?: any;
  };
  created: number;
  livemode: boolean;
  pendingWebhooks: number;
  request: {
    id: string;
    idempotencyKey?: string;
  };
}

// API Response types
export interface BillingApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  totalCount: number;
  page: number;
  limit: number;
}

// Hook and component prop types
export interface UseBillingReturn {
  subscription: Subscription | null;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  payments: Payment[];
  alerts: BillingAlert[];
  stats: BillingStats | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchSubscription: () => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;
  fetchInvoices: (page?: number, limit?: number) => Promise<void>;
  fetchPayments: (page?: number, limit?: number) => Promise<void>;
  fetchAlerts: () => Promise<void>;
  
  // Subscription management
  updateSubscription: (planId: string) => Promise<void>;
  cancelSubscription: (cancelAtPeriodEnd?: boolean) => Promise<void>;
  resumeSubscription: () => Promise<void>;
  
  // Payment methods
  addPaymentMethod: (paymentMethodData: Partial<PaymentMethod>) => Promise<void>;
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>) => Promise<void>;
  deletePaymentMethod: (id: string) => Promise<void>;
  setDefaultPaymentMethod: (id: string) => Promise<void>;
  
  // Invoices and payments
  downloadInvoice: (invoiceId: string) => Promise<void>;
  retryPayment: (invoiceId: string) => Promise<void>;
  
  // Discounts
  applyDiscount: (couponCode: string) => Promise<void>;
  removeDiscount: () => Promise<void>;
  
  // Alerts
  markAlertAsRead: (alertId: string) => Promise<void>;
  dismissAlert: (alertId: string) => Promise<void>;
}

export interface BillingComponentProps {
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  onAction?: (action: string, data?: any) => void;
}

// Filter and sort types
export interface InvoiceFilters {
  status?: Invoice['status'][];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}

export interface PaymentFilters {
  status?: Payment['status'][];
  paymentMethod?: PaymentMethod['type'][];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

// Stripe-specific types for integration
export interface StripeConfig {
  publishableKey: string;
  apiVersion: string;
  locale?: string;
}

export interface StripeElements {
  card?: any;
  cardNumber?: any;
  cardExpiry?: any;
  cardCvc?: any;
  iban?: any;
}

// Error types
export interface BillingError {
  code: string;
  message: string;
  type: 'validation_error' | 'card_error' | 'api_error' | 'authentication_error' | 'rate_limit_error';
  param?: string;
  declineCode?: string;
}