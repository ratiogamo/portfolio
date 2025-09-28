import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Alert, AlertDescription } from '../../ui/alert';
import { Invoice, InvoiceFilters, SortOptions, BillingComponentProps } from '../../../types/billing';

interface InvoiceDownloadProps extends BillingComponentProps {
  invoices: Invoice[];
  loading?: boolean;
  onDownloadInvoice?: (invoiceId: string) => Promise<void>;
  onEmailInvoice?: (invoiceId: string, email: string) => Promise<void>;
  onRetryPayment?: (invoiceId: string) => Promise<void>;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  totalCount?: number;
}

const InvoiceDownload: React.FC<InvoiceDownloadProps> = ({
  invoices,
  loading = false,
  onDownloadInvoice,
  onEmailInvoice,
  onRetryPayment,
  onLoadMore,
  hasMore = false,
  totalCount = 0,
  className = '',
  showActions = true,
}) => {
  const [filters, setFilters] = useState<InvoiceFilters>({});
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'invoiceDate',
    direction: 'desc',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [isEmailingInvoice, setIsEmailingInvoice] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'void':
      case 'uncollectible':
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
    });
  };

  const formatAmount = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const filteredAndSortedInvoices = useMemo(() => {
    let filtered = invoices.filter((invoice) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          invoice.number.toLowerCase().includes(searchLower) ||
          invoice.id.toLowerCase().includes(searchLower) ||
          invoice.description?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(invoice.status)) return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const invoiceDate = new Date(invoice.invoiceDate);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        
        if (invoiceDate < startDate || invoiceDate > endDate) return false;
      }

      // Amount range filter
      if (filters.amountRange) {
        const amount = invoice.total / 100; // Convert from cents
        if (amount < filters.amountRange.min || amount > filters.amountRange.max) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortOptions.field as keyof Invoice];
      let bValue: any = b[sortOptions.field as keyof Invoice];

      if (sortOptions.field === 'total' || sortOptions.field === 'amount') {
        aValue = a.total;
        bValue = b.total;
      } else if (sortOptions.field === 'invoiceDate' || sortOptions.field === 'dueDate') {
        aValue = new Date(a[sortOptions.field]).getTime();
        bValue = new Date(b[sortOptions.field]).getTime();
      }

      if (sortOptions.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [invoices, filters, sortOptions, searchTerm]);

  const handleDownloadInvoice = async (invoiceId: string) => {
    if (onDownloadInvoice) {
      try {
        await onDownloadInvoice(invoiceId);
      } catch (error) {
        console.error('Failed to download invoice:', error);
      }
    }
  };

  const handleEmailInvoice = async (invoiceId: string) => {
    if (onEmailInvoice && emailAddress) {
      setIsEmailingInvoice(true);
      try {
        await onEmailInvoice(invoiceId, emailAddress);
        setEmailAddress('');
      } catch (error) {
        console.error('Failed to email invoice:', error);
      } finally {
        setIsEmailingInvoice(false);
      }
    }
  };

  const handleRetryPayment = async (invoiceId: string) => {
    if (onRetryPayment) {
      try {
        await onRetryPayment(invoiceId);
      } catch (error) {
        console.error('Failed to retry payment:', error);
      }
    }
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const getInvoicePeriod = (invoice: Invoice) => {
    if (invoice.periodStart && invoice.periodEnd) {
      return `${formatDate(invoice.periodStart)} - ${formatDate(invoice.periodEnd)}`;
    }
    return 'N/A';
  };

  if (loading && invoices.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Invoices & Receipts</CardTitle>
          <CardDescription>Loading your invoices...</CardDescription>
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
              <CardTitle>Invoices & Receipts</CardTitle>
              <CardDescription>
                Download and manage your billing documents
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
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:col-span-2"
              />
              
              <Select
                value={filters.status?.[0] || ''}
                onValueChange={(value) => 
                  setFilters(prev => ({
                    ...prev,
                    status: value ? [value as Invoice['status']] : undefined
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="void">Void</SelectItem>
                  <SelectItem value="uncollectible">Uncollectible</SelectItem>
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
                  <SelectItem value="invoiceDate-desc">Date (Newest)</SelectItem>
                  <SelectItem value="invoiceDate-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="total-desc">Amount (High to Low)</SelectItem>
                  <SelectItem value="total-asc">Amount (Low to High)</SelectItem>
                  <SelectItem value="dueDate-asc">Due Date (Soonest)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(Object.keys(filters).length > 0 || searchTerm) && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredAndSortedInvoices.length} of {invoices.length} invoices
                </p>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Invoices Table */}
          {filteredAndSortedInvoices.length > 0 ? (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Period</TableHead>
                      {showActions && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <div className="font-medium">
                            {invoice.number}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {invoice.id.slice(-8)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatDate(invoice.invoiceDate)}
                          </div>
                          {invoice.dueDate && (
                            <div className="text-sm text-gray-500">
                              Due: {formatDate(invoice.dueDate)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatAmount(invoice.total, invoice.currency)}
                          </div>
                          {invoice.amountDue > 0 && (
                            <div className="text-sm text-red-600">
                              Due: {formatAmount(invoice.amountDue, invoice.currency)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {getInvoicePeriod(invoice)}
                          </div>
                        </TableCell>
                        {showActions && (
                          <TableCell>
                            <div className="flex space-x-2">
                              {/* View Details */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedInvoice(invoice)}
                                  >
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Invoice Details</DialogTitle>
                                    <DialogDescription>
                                      Invoice {invoice.number} - {formatDate(invoice.invoiceDate)}
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedInvoice && (
                                    <div className="space-y-6">
                                      {/* Invoice Summary */}
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium">Total Amount</label>
                                          <p className="text-lg font-semibold">
                                            {formatAmount(selectedInvoice.total, selectedInvoice.currency)}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Status</label>
                                          <p>
                                            <Badge className={getStatusColor(selectedInvoice.status)}>
                                              {selectedInvoice.status}
                                            </Badge>
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Invoice Date</label>
                                          <p>{formatDate(selectedInvoice.invoiceDate)}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Due Date</label>
                                          <p>{formatDate(selectedInvoice.dueDate)}</p>
                                        </div>
                                      </div>

                                      {/* Invoice Items */}
                                      <div>
                                        <label className="text-sm font-medium">Invoice Items</label>
                                        <div className="mt-2 space-y-2">
                                          {selectedInvoice.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                              <div>
                                                <p className="font-medium">{item.description}</p>
                                                {item.period && (
                                                  <p className="text-sm text-gray-500">
                                                    {formatDate(item.period.start)} - {formatDate(item.period.end)}
                                                  </p>
                                                )}
                                              </div>
                                              <div className="text-right">
                                                <p className="font-medium">
                                                  {formatAmount(item.amount, item.currency)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                  {item.quantity} × {formatAmount(item.unitAmount, item.currency)}
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Invoice Totals */}
                                      <div className="border-t pt-4">
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>{formatAmount(selectedInvoice.subtotal, selectedInvoice.currency)}</span>
                                          </div>
                                          {selectedInvoice.discount && selectedInvoice.discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                              <span>Discount:</span>
                                              <span>-{formatAmount(selectedInvoice.discount, selectedInvoice.currency)}</span>
                                            </div>
                                          )}
                                          {selectedInvoice.tax && selectedInvoice.tax > 0 && (
                                            <div className="flex justify-between">
                                              <span>Tax:</span>
                                              <span>{formatAmount(selectedInvoice.tax, selectedInvoice.currency)}</span>
                                            </div>
                                          )}
                                          <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                            <span>Total:</span>
                                            <span>{formatAmount(selectedInvoice.total, selectedInvoice.currency)}</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Actions */}
                                      <div className="flex space-x-2">
                                        <Button
                                          onClick={() => handleDownloadInvoice(selectedInvoice.id)}
                                          className="flex-1"
                                        >
                                          Download PDF
                                        </Button>
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Button variant="outline" className="flex-1">
                                              Email Invoice
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>Email Invoice</DialogTitle>
                                              <DialogDescription>
                                                Send this invoice to an email address
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                              <Input
                                                type="email"
                                                placeholder="Enter email address"
                                                value={emailAddress}
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                              />
                                              <div className="flex space-x-2">
                                                <Button
                                                  variant="outline"
                                                  onClick={() => setEmailAddress('')}
                                                  className="flex-1"
                                                >
                                                  Cancel
                                                </Button>
                                                <Button
                                                  onClick={() => handleEmailInvoice(selectedInvoice.id)}
                                                  disabled={!emailAddress || isEmailingInvoice}
                                                  className="flex-1"
                                                >
                                                  {isEmailingInvoice ? 'Sending...' : 'Send Email'}
                                                </Button>
                                              </div>
                                            </div>
                                          </DialogContent>
                                        </Dialog>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {/* Download */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadInvoice(invoice.id)}
                              >
                                Download
                              </Button>

                              {/* Retry Payment for unpaid invoices */}
                              {invoice.status === 'open' && invoice.amountDue > 0 && onRetryPayment && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRetryPayment(invoice.id)}
                                >
                                  Pay Now
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
                    {loading ? 'Loading...' : 'Load More Invoices'}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📄</div>
              <p className="text-gray-600 mb-4">
                {searchTerm || Object.keys(filters).length > 0
                  ? 'No invoices match your filters'
                  : 'No invoices yet'
                }
              </p>
              {(searchTerm || Object.keys(filters).length > 0) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          {/* Outstanding Invoices Alert */}
          {invoices.some(inv => inv.status === 'open' && inv.amountDue > 0) && (
            <Alert className="mt-6">
              <AlertDescription>
                <strong>Outstanding Balance:</strong> You have unpaid invoices. 
                Please review and pay any outstanding amounts to avoid service interruption.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceDownload;