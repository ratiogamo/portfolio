import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Payment, PaymentFilters, SortOptions, BillingComponentProps } from '../../../types/billing';

interface PaymentHistoryProps extends BillingComponentProps {
  payments: Payment[];
  loading?: boolean;
  onRetryPayment?: (paymentId: string) => Promise<void>;
  onRefundPayment?: (paymentId: string, amount?: number) => Promise<void>;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  totalCount?: number;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({
  payments,
  loading = false,
  onRetryPayment,
  onRefundPayment,
  onLoadMore,
  hasMore = false,
  totalCount = 0,
  className = '',
  showActions = true,
}) => {
  const [filters, setFilters] = useState<PaymentFilters>({});
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'createdAt',
    direction: 'desc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'requires_action':
      case 'requires_confirmation':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getPaymentMethodDisplay = (payment: Payment) => {
    const method = payment.paymentMethod;
    if (method.type === 'card' && method.card) {
      return `${method.card.brand.toUpperCase()} •••• ${method.card.last4}`;
    } else if (method.type === 'bank_account' && method.bankAccount) {
      return `${method.bankAccount.bankName} •••• ${method.bankAccount.last4}`;
    } else if (method.type === 'digital_wallet' && method.digitalWallet) {
      return method.digitalWallet.type.replace('_', ' ').toUpperCase();
    }
    return 'Unknown';
  };

  const filteredAndSortedPayments = useMemo(() => {
    let filtered = payments.filter((payment) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          payment.id.toLowerCase().includes(searchLower) ||
          payment.description?.toLowerCase().includes(searchLower) ||
          getPaymentMethodDisplay(payment).toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(payment.status)) return false;
      }

      // Payment method filter
      if (filters.paymentMethod && filters.paymentMethod.length > 0) {
        if (!filters.paymentMethod.includes(payment.paymentMethod.type)) return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const paymentDate = new Date(payment.createdAt);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        
        if (paymentDate < startDate || paymentDate > endDate) return false;
      }

      // Amount range filter
      if (filters.amountRange) {
        const amount = payment.amount / 100; // Convert from cents
        if (amount < filters.amountRange.min || amount > filters.amountRange.max) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortOptions.field as keyof Payment];
      let bValue: any = b[sortOptions.field as keyof Payment];

      if (sortOptions.field === 'amount') {
        aValue = a.amount;
        bValue = b.amount;
      } else if (sortOptions.field === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      }

      if (sortOptions.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [payments, filters, sortOptions, searchTerm]);

  const handleRetryPayment = async (paymentId: string) => {
    if (onRetryPayment) {
      try {
        await onRetryPayment(paymentId);
      } catch (error) {
        console.error('Failed to retry payment:', error);
      }
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  if (loading && payments.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Loading your payment history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View and manage your payment transactions
                {totalCount > 0 && ` (${totalCount} total)`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:col-span-2"
              />
              
              <Select
                value={filters.status?.[0] || ''}
                onValueChange={(value) => 
                  setFilters(prev => ({
                    ...prev,
                    status: value ? [value as Payment['status']] : undefined
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="succeeded">Succeeded</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={`${sortOptions.field}-${sortOptions.direction}`}
                onValueChange={(value) => {
                  const [field, direction] = value.split('-');
                  setSortOptions({ field, direction: direction as 'asc' | 'desc' });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Date (Newest)</SelectItem>
                  <SelectItem value="createdAt-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(Object.keys(filters).length > 0 || searchTerm) && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredAndSortedPayments.length} of {payments.length} payments
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Payments Table */}
          {filteredAndSortedPayments.length > 0 ? (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Description</TableHead>
                      {showActions && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div className="font-medium">
                            {formatDate(payment.createdAt)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {payment.id.slice(-8)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatAmount(payment.amount, payment.currency)}
                          </div>
                          {payment.refunded && payment.refundedAmount && (
                            <div className="text-sm text-red-600">
                              Refunded: {formatAmount(payment.refundedAmount, payment.currency)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status.replace('_', ' ')}
                          </Badge>
                          {payment.failureReason && (
                            <div className="text-sm text-red-600 mt-1">
                              {payment.failureReason}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {getPaymentMethodDisplay(payment)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {payment.description || 'No description'}
                          </div>
                        </TableCell>
                        {showActions && (
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedPayment(payment)}
                                  >
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Payment Details</DialogTitle>
                                    <DialogDescription>
                                      Complete information for payment {payment.id}
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedPayment && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium">Amount</label>
                                          <p>{formatAmount(selectedPayment.amount, selectedPayment.currency)}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Status</label>
                                          <p>
                                            <Badge className={getStatusColor(selectedPayment.status)}>
                                              {selectedPayment.status.replace('_', ' ')}
                                            </Badge>
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Date</label>
                                          <p>{formatDate(selectedPayment.createdAt)}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Payment Method</label>
                                          <p>{getPaymentMethodDisplay(selectedPayment)}</p>
                                        </div>
                                      </div>
                                      {selectedPayment.description && (
                                        <div>
                                          <label className="text-sm font-medium">Description</label>
                                          <p>{selectedPayment.description}</p>
                                        </div>
                                      )}
                                      {selectedPayment.failureReason && (
                                        <div>
                                          <label className="text-sm font-medium">Failure Reason</label>
                                          <p className="text-red-600">{selectedPayment.failureReason}</p>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              
                              {payment.status === 'failed' && onRetryPayment && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRetryPayment(payment.id)}
                                >
                                  Retry
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Load More */}
              {hasMore && onLoadMore && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={onLoadMore}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More Payments'}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💳</div>
              <p className="text-gray-600 mb-4">
                {searchTerm || Object.keys(filters).length > 0
                  ? 'No payments match your filters'
                  : 'No payment history yet'
                }
              </p>
              {(searchTerm || Object.keys(filters).length > 0) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;