import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Alert, AlertDescription } from '../../ui/alert';
import { PaymentMethod, BillingComponentProps } from '../../../types/billing';

interface PaymentMethodManagerProps extends BillingComponentProps {
  paymentMethods: PaymentMethod[];
  loading?: boolean;
  onAddPaymentMethod?: (paymentMethodData: Partial<PaymentMethod>) => Promise<void>;
  onUpdatePaymentMethod?: (id: string, updates: Partial<PaymentMethod>) => Promise<void>;
  onDeletePaymentMethod?: (id: string) => Promise<void>;
  onSetDefaultPaymentMethod?: (id: string) => Promise<void>;
}

interface NewPaymentMethodForm {
  type: 'card' | 'bank_account';
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvc?: string;
  cardholderName?: string;
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  accountType?: 'checking' | 'savings';
  accountHolderName?: string;
}

const PaymentMethodManager: React.FC<PaymentMethodManagerProps> = ({
  paymentMethods,
  loading = false,
  onAddPaymentMethod,
  onUpdatePaymentMethod,
  onDeletePaymentMethod,
  onSetDefaultPaymentMethod,
  className = '',
  showActions = true,
}) => {
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState<NewPaymentMethodForm>({
    type: 'card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMethodForDeletion, setSelectedMethodForDeletion] = useState<PaymentMethod | null>(null);

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    if (method.type === 'card' && method.card) {
      switch (method.card.brand.toLowerCase()) {
        case 'visa':
          return '💳';
        case 'mastercard':
          return '💳';
        case 'amex':
        case 'american_express':
          return '💳';
        case 'discover':
          return '💳';
        default:
          return '💳';
      }
    } else if (method.type === 'bank_account') {
      return '🏦';
    } else if (method.type === 'digital_wallet') {
      return '📱';
    }
    return '💳';
  };

  const getPaymentMethodDisplay = (method: PaymentMethod) => {
    if (method.type === 'card' && method.card) {
      return {
        title: `${method.card.brand.toUpperCase()} •••• ${method.card.last4}`,
        subtitle: `Expires ${method.card.expMonth.toString().padStart(2, '0')}/${method.card.expYear}`,
        type: method.card.funding,
      };
    } else if (method.type === 'bank_account' && method.bankAccount) {
      return {
        title: `${method.bankAccount.bankName} •••• ${method.bankAccount.last4}`,
        subtitle: `${method.bankAccount.accountType} account`,
        type: 'bank',
      };
    } else if (method.type === 'digital_wallet' && method.digitalWallet) {
      return {
        title: method.digitalWallet.type.replace('_', ' ').toUpperCase(),
        subtitle: method.digitalWallet.email || 'Digital wallet',
        type: 'digital',
      };
    }
    return {
      title: 'Unknown payment method',
      subtitle: '',
      type: 'unknown',
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleAddPaymentMethod = async () => {
    if (!onAddPaymentMethod) return;

    setIsSubmitting(true);
    try {
      const paymentMethodData: Partial<PaymentMethod> = {
        type: newPaymentMethod.type,
        isDefault: paymentMethods.length === 0, // First payment method becomes default
      };

      if (newPaymentMethod.type === 'card') {
        paymentMethodData.card = {
          brand: 'visa', // This would be determined by the card number in real implementation
          last4: newPaymentMethod.cardNumber?.slice(-4) || '0000',
          expMonth: parseInt(newPaymentMethod.expiryMonth || '1'),
          expYear: parseInt(newPaymentMethod.expiryYear || '2024'),
          funding: 'credit',
        };
      } else if (newPaymentMethod.type === 'bank_account') {
        paymentMethodData.bankAccount = {
          bankName: newPaymentMethod.bankName || 'Unknown Bank',
          last4: newPaymentMethod.accountNumber?.slice(-4) || '0000',
          accountType: newPaymentMethod.accountType || 'checking',
        };
      }

      await onAddPaymentMethod(paymentMethodData);
      
      // Reset form
      setNewPaymentMethod({ type: 'card' });
      setIsAddingPaymentMethod(false);
    } catch (error) {
      console.error('Failed to add payment method:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetDefault = async (methodId: string) => {
    if (onSetDefaultPaymentMethod) {
      try {
        await onSetDefaultPaymentMethod(methodId);
      } catch (error) {
        console.error('Failed to set default payment method:', error);
      }
    }
  };

  const handleDeletePaymentMethod = async (methodId: string) => {
    if (onDeletePaymentMethod) {
      try {
        await onDeletePaymentMethod(methodId);
        setSelectedMethodForDeletion(null);
      } catch (error) {
        console.error('Failed to delete payment method:', error);
      }
    }
  };

  const isFormValid = () => {
    if (newPaymentMethod.type === 'card') {
      return (
        newPaymentMethod.cardNumber &&
        newPaymentMethod.expiryMonth &&
        newPaymentMethod.expiryYear &&
        newPaymentMethod.cvc &&
        newPaymentMethod.cardholderName
      );
    } else if (newPaymentMethod.type === 'bank_account') {
      return (
        newPaymentMethod.bankName &&
        newPaymentMethod.accountNumber &&
        newPaymentMethod.routingNumber &&
        newPaymentMethod.accountType &&
        newPaymentMethod.accountHolderName
      );
    }
    return false;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods for subscriptions and invoices
              </CardDescription>
            </div>
            {showActions && (
              <Dialog open={isAddingPaymentMethod} onOpenChange={setIsAddingPaymentMethod}>
                <DialogTrigger asChild>
                  <Button>Add Payment Method</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Add a new payment method to your account
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Payment Method Type */}
                    <div>
                      <Label>Payment Method Type</Label>
                      <Select
                        value={newPaymentMethod.type}
                        onValueChange={(value: 'card' | 'bank_account') =>
                          setNewPaymentMethod(prev => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="bank_account">Bank Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Card Form */}
                    {newPaymentMethod.type === 'card' && (
                      <>
                        <div>
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input
                            id="cardholderName"
                            value={newPaymentMethod.cardholderName || ''}
                            onChange={(e) =>
                              setNewPaymentMethod(prev => ({ ...prev, cardholderName: e.target.value }))
                            }
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={newPaymentMethod.cardNumber || ''}
                            onChange={(e) =>
                              setNewPaymentMethod(prev => ({ ...prev, cardNumber: e.target.value }))
                            }
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <Label htmlFor="expiryMonth">Month</Label>
                            <Select
                              value={newPaymentMethod.expiryMonth || ''}
                              onValueChange={(value) =>
                                setNewPaymentMethod(prev => ({ ...prev, expiryMonth: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                                    {(i + 1).toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="expiryYear">Year</Label>
                            <Select
                              value={newPaymentMethod.expiryYear || ''}
                              onValueChange={(value) =>
                                setNewPaymentMethod(prev => ({ ...prev, expiryYear: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="YYYY" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => {
                                  const year = new Date().getFullYear() + i;
                                  return (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              value={newPaymentMethod.cvc || ''}
                              onChange={(e) =>
                                setNewPaymentMethod(prev => ({ ...prev, cvc: e.target.value }))
                              }
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Bank Account Form */}
                    {newPaymentMethod.type === 'bank_account' && (
                      <>
                        <div>
                          <Label htmlFor="accountHolderName">Account Holder Name</Label>
                          <Input
                            id="accountHolderName"
                            value={newPaymentMethod.accountHolderName || ''}
                            onChange={(e) =>
                              setNewPaymentMethod(prev => ({ ...prev, accountHolderName: e.target.value }))
                            }
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input
                            id="bankName"
                            value={newPaymentMethod.bankName || ''}
                            onChange={(e) =>
                              setNewPaymentMethod(prev => ({ ...prev, bankName: e.target.value }))
                            }
                            placeholder="Chase Bank"
                          />
                        </div>
                        <div>
                          <Label htmlFor="routingNumber">Routing Number</Label>
                          <Input
                            id="routingNumber"
                            value={newPaymentMethod.routingNumber || ''}
                            onChange={(e) =>
                              setNewPaymentMethod(prev => ({ ...prev, routingNumber: e.target.value }))
                            }
                            placeholder="123456789"
                            maxLength={9}
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            value={newPaymentMethod.accountNumber || ''}
                            onChange={(e) =>
                              setNewPaymentMethod(prev => ({ ...prev, accountNumber: e.target.value }))
                            }
                            placeholder="1234567890"
                          />
                        </div>
                        <div>
                          <Label>Account Type</Label>
                          <Select
                            value={newPaymentMethod.accountType || ''}
                            onValueChange={(value: 'checking' | 'savings') =>
                              setNewPaymentMethod(prev => ({ ...prev, accountType: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checking">Checking</SelectItem>
                              <SelectItem value="savings">Savings</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <Alert>
                      <AlertDescription>
                        Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingPaymentMethod(false);
                        setNewPaymentMethod({ type: 'card' });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddPaymentMethod}
                      disabled={!isFormValid() || isSubmitting}
                    >
                      {isSubmitting ? 'Adding...' : 'Add Payment Method'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const display = getPaymentMethodDisplay(method);
                return (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{getPaymentMethodIcon(method)}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{display.title}</p>
                          {method.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{display.subtitle}</p>
                        <p className="text-xs text-gray-400">
                          Added {formatDate(method.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    {showActions && (
                      <div className="flex space-x-2">
                        {!method.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(method.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMethodForDeletion(method)}
                            >
                              Remove
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Remove Payment Method</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to remove this payment method? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedMethodForDeletion && (
                              <div className="py-4">
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                  <span className="text-2xl">{getPaymentMethodIcon(selectedMethodForDeletion)}</span>
                                  <div>
                                    <p className="font-medium">{getPaymentMethodDisplay(selectedMethodForDeletion).title}</p>
                                    <p className="text-sm text-gray-500">{getPaymentMethodDisplay(selectedMethodForDeletion).subtitle}</p>
                                  </div>
                                </div>
                                {selectedMethodForDeletion.isDefault && (
                                  <Alert className="mt-4">
                                    <AlertDescription>
                                      This is your default payment method. You'll need to set another payment method as default before removing this one.
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            )}
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedMethodForDeletion(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => selectedMethodForDeletion && handleDeletePaymentMethod(selectedMethodForDeletion.id)}
                                disabled={selectedMethodForDeletion?.isDefault}
                              >
                                Remove Payment Method
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💳</div>
              <p className="text-gray-600 mb-4">No payment methods added yet</p>
              <p className="text-sm text-gray-500 mb-4">
                Add a payment method to enable automatic billing and easy payments
              </p>
              {showActions && (
                <Button onClick={() => setIsAddingPaymentMethod(true)}>
                  Add Your First Payment Method
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodManager;