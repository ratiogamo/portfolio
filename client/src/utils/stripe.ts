import {
  Subscription,
  PaymentMethod,
  Invoice,
  Payment,
  Customer,
  PaymentIntent,
  WebhookEvent,
  BillingError,
  StripeConfig,
} from '../types/billing';

// Stripe configuration
export const stripeConfig: StripeConfig = {
  publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here',
  apiVersion: '2023-10-16',
  locale: 'en',
};

// Mock Stripe API responses for development
class MockStripeAPI {
  private customers: Customer[] = [];
  private subscriptions: Subscription[] = [];
  private paymentMethods: PaymentMethod[] = [];
  private invoices: Invoice[] = [];
  private payments: Payment[] = [];
  private paymentIntents: PaymentIntent[] = [];

  // Customer methods
  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const customer: Customer = {
      id: `cus_${Date.now()}`,
      email: customerData.email || '',
      name: customerData.name || '',
      phone: customerData.phone,
      description: customerData.description,
      defaultPaymentMethod: customerData.defaultPaymentMethod,
      invoiceSettings: {
        defaultPaymentMethod: customerData.defaultPaymentMethod,
        customFields: [],
      },
      address: customerData.address,
      shipping: customerData.shipping,
      taxExempt: 'none',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.customers.push(customer);
    return customer;
  }

  async retrieveCustomer(customerId: string): Promise<Customer | null> {
    return this.customers.find(c => c.id === customerId) || null;
  }

  async updateCustomer(customerId: string, updates: Partial<Customer>): Promise<Customer> {
    const customerIndex = this.customers.findIndex(c => c.id === customerId);
    if (customerIndex === -1) {
      throw new Error('Customer not found');
    }

    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return this.customers[customerIndex];
  }

  // Subscription methods
  async createSubscription(subscriptionData: Partial<Subscription>): Promise<Subscription> {
    const subscription: Subscription = {
      id: `sub_${Date.now()}`,
      customerId: subscriptionData.customerId || '',
      planId: subscriptionData.planId || '',
      plan: subscriptionData.plan || {
        id: 'pro',
        name: 'Pro Plan',
        description: 'Professional plan',
        price: 25000,
        currency: 'USD',
        interval: 'month',
        features: [],
      },
      status: 'active',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      billingCycleAnchor: new Date().toISOString(),
      ...subscriptionData,
    };

    this.subscriptions.push(subscription);
    return subscription;
  }

  async retrieveSubscription(subscriptionId: string): Promise<Subscription | null> {
    return this.subscriptions.find(s => s.id === subscriptionId) || null;
  }

  async updateSubscription(subscriptionId: string, updates: Partial<Subscription>): Promise<Subscription> {
    const subscriptionIndex = this.subscriptions.findIndex(s => s.id === subscriptionId);
    if (subscriptionIndex === -1) {
      throw new Error('Subscription not found');
    }

    this.subscriptions[subscriptionIndex] = {
      ...this.subscriptions[subscriptionIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return this.subscriptions[subscriptionIndex];
  }

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true): Promise<Subscription> {
    return this.updateSubscription(subscriptionId, {
      cancelAtPeriodEnd,
      status: cancelAtPeriodEnd ? 'active' : 'canceled',
      canceledAt: cancelAtPeriodEnd ? undefined : new Date().toISOString(),
    });
  }

  // Payment Method methods
  async createPaymentMethod(paymentMethodData: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const paymentMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: paymentMethodData.type || 'card',
      isDefault: paymentMethodData.isDefault || false,
      card: paymentMethodData.card,
      bankAccount: paymentMethodData.bankAccount,
      digitalWallet: paymentMethodData.digitalWallet,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.paymentMethods.push(paymentMethod);
    return paymentMethod;
  }

  async listPaymentMethods(customerId: string): Promise<PaymentMethod[]> {
    // In a real implementation, this would filter by customer
    return this.paymentMethods;
  }

  async detachPaymentMethod(paymentMethodId: string): Promise<void> {
    const index = this.paymentMethods.findIndex(pm => pm.id === paymentMethodId);
    if (index !== -1) {
      this.paymentMethods.splice(index, 1);
    }
  }

  // Invoice methods
  async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    const invoice: Invoice = {
      id: `in_${Date.now()}`,
      customerId: invoiceData.customerId || '',
      subscriptionId: invoiceData.subscriptionId,
      number: `INV-${Date.now()}`,
      status: 'draft',
      amount: invoiceData.amount || 0,
      amountPaid: 0,
      amountDue: invoiceData.amount || 0,
      currency: 'USD',
      description: invoiceData.description,
      invoiceDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      periodStart: new Date().toISOString(),
      periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: invoiceData.amount || 0,
      total: invoiceData.amount || 0,
      items: invoiceData.items || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...invoiceData,
    };

    this.invoices.push(invoice);
    return invoice;
  }

  async retrieveInvoice(invoiceId: string): Promise<Invoice | null> {
    return this.invoices.find(i => i.id === invoiceId) || null;
  }

  async listInvoices(customerId: string): Promise<Invoice[]> {
    return this.invoices.filter(i => i.customerId === customerId);
  }

  async payInvoice(invoiceId: string, paymentMethodId: string): Promise<Payment> {
    const invoice = await this.retrieveInvoice(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const paymentMethod = this.paymentMethods.find(pm => pm.id === paymentMethodId);
    if (!paymentMethod) {
      throw new Error('Payment method not found');
    }

    const payment: Payment = {
      id: `pi_${Date.now()}`,
      customerId: invoice.customerId,
      invoiceId: invoice.id,
      subscriptionId: invoice.subscriptionId,
      amount: invoice.amountDue,
      currency: invoice.currency,
      status: 'succeeded',
      paymentMethod,
      description: `Payment for ${invoice.number}`,
      refunded: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Update invoice status
    await this.updateInvoice(invoiceId, {
      status: 'paid',
      amountPaid: invoice.amount,
      amountDue: 0,
      paidAt: new Date().toISOString(),
    });

    this.payments.push(payment);
    return payment;
  }

  async updateInvoice(invoiceId: string, updates: Partial<Invoice>): Promise<Invoice> {
    const invoiceIndex = this.invoices.findIndex(i => i.id === invoiceId);
    if (invoiceIndex === -1) {
      throw new Error('Invoice not found');
    }

    this.invoices[invoiceIndex] = {
      ...this.invoices[invoiceIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return this.invoices[invoiceIndex];
  }

  // Payment methods
  async createPaymentIntent(paymentIntentData: Partial<PaymentIntent>): Promise<PaymentIntent> {
    const paymentIntent: PaymentIntent = {
      id: `pi_${Date.now()}`,
      amount: paymentIntentData.amount || 0,
      currency: paymentIntentData.currency || 'USD',
      status: 'requires_payment_method',
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      paymentMethod: paymentIntentData.paymentMethod,
      description: paymentIntentData.description,
      receiptEmail: paymentIntentData.receiptEmail,
      setupFutureUsage: paymentIntentData.setupFutureUsage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.paymentIntents.push(paymentIntent);
    return paymentIntent;
  }

  async confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string): Promise<PaymentIntent> {
    const paymentIntentIndex = this.paymentIntents.findIndex(pi => pi.id === paymentIntentId);
    if (paymentIntentIndex === -1) {
      throw new Error('Payment intent not found');
    }

    const paymentMethod = this.paymentMethods.find(pm => pm.id === paymentMethodId);
    if (!paymentMethod) {
      throw new Error('Payment method not found');
    }

    this.paymentIntents[paymentIntentIndex] = {
      ...this.paymentIntents[paymentIntentIndex],
      status: 'succeeded',
      paymentMethod,
      updatedAt: new Date().toISOString(),
    };

    return this.paymentIntents[paymentIntentIndex];
  }

  // Webhook simulation
  async simulateWebhook(eventType: string, data: any): Promise<WebhookEvent> {
    const webhookEvent: WebhookEvent = {
      id: `evt_${Date.now()}`,
      type: eventType,
      data: {
        object: data,
      },
      created: Math.floor(Date.now() / 1000),
      livemode: false,
      pendingWebhooks: 1,
      request: {
        id: `req_${Date.now()}`,
      },
    };

    return webhookEvent;
  }
}

// Create a singleton instance
export const mockStripeAPI = new MockStripeAPI();

// Utility functions for Stripe integration
export const formatStripeAmount = (amount: number): number => {
  // Convert dollars to cents for Stripe
  return Math.round(amount * 100);
};

export const formatDisplayAmount = (amount: number, currency = 'USD'): string => {
  // Convert cents to dollars for display
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  // Basic Luhn algorithm validation
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const getCardBrand = (cardNumber: string): string => {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.startsWith('4')) return 'visa';
  if (digits.startsWith('5') || digits.startsWith('2')) return 'mastercard';
  if (digits.startsWith('3')) return 'amex';
  if (digits.startsWith('6')) return 'discover';
  
  return 'unknown';
};

export const formatCardNumber = (cardNumber: string): string => {
  const digits = cardNumber.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(' ').substr(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
};

export const formatExpiryDate = (expiry: string): string => {
  const digits = expiry.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.substr(0, 2)}/${digits.substr(2, 2)}`;
  }
  return digits;
};

// Error handling utilities
export const handleStripeError = (error: any): BillingError => {
  const billingError: BillingError = {
    code: error.code || 'unknown_error',
    message: error.message || 'An unknown error occurred',
    type: error.type || 'api_error',
    param: error.param,
    declineCode: error.decline_code,
  };

  return billingError;
};

export const isRetryableError = (error: BillingError): boolean => {
  const retryableCodes = [
    'rate_limit_error',
    'api_connection_error',
    'api_error',
  ];
  
  return retryableCodes.includes(error.type);
};

// Webhook verification (mock implementation)
export const verifyWebhookSignature = (payload: string, signature: string, secret: string): boolean => {
  // In a real implementation, this would verify the webhook signature
  // For mock purposes, we'll just return true
  return true;
};

// Subscription helpers
export const calculateProrationAmount = (
  currentPlan: { price: number; interval: string },
  newPlan: { price: number; interval: string },
  daysRemaining: number
): number => {
  const currentDailyRate = currentPlan.price / (currentPlan.interval === 'month' ? 30 : 365);
  const newDailyRate = newPlan.price / (newPlan.interval === 'month' ? 30 : 365);
  
  const currentPeriodCredit = currentDailyRate * daysRemaining;
  const newPeriodCharge = newDailyRate * daysRemaining;
  
  return newPeriodCharge - currentPeriodCredit;
};

export const calculateDiscountAmount = (
  amount: number,
  discount: { percentOff?: number; amountOff?: number }
): number => {
  if (discount.percentOff) {
    return Math.round(amount * (discount.percentOff / 100));
  } else if (discount.amountOff) {
    return Math.min(discount.amountOff, amount);
  }
  return 0;
};

// Tax calculation helpers
export const calculateTax = (amount: number, taxRate: number): number => {
  return Math.round(amount * (taxRate / 100));
};

export const getTaxRateForLocation = (country: string, state?: string): number => {
  // Mock tax rates - in real implementation, use a tax service
  const taxRates: Record<string, number> = {
    'US': 8.5, // Average US sales tax
    'CA': 13.0, // Average Canadian tax
    'GB': 20.0, // UK VAT
    'DE': 19.0, // German VAT
  };
  
  return taxRates[country] || 0;
};

export default mockStripeAPI;