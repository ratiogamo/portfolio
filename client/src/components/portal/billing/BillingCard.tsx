import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { BillingComponentProps } from '../../../types/billing';

interface BillingCardProps extends BillingComponentProps {
  title: string;
  description?: string;
  value: string | number;
  subtitle?: string;
  status?: string;
  statusVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    disabled?: boolean;
  };
  children?: React.ReactNode;
}

const BillingCard: React.FC<BillingCardProps> = ({
  title,
  description,
  value,
  subtitle,
  status,
  statusVariant = 'default',
  icon,
  action,
  variant = 'default',
  className = '',
  showActions = true,
  children,
}) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'paid':
      case 'succeeded':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'past_due':
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'trialing':
        return 'bg-blue-100 text-blue-800';
      case 'incomplete':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      // Check if it's a currency amount (assuming cents)
      if (val >= 100 || val === 0) {
        return `$${(val / 100).toFixed(2)}`;
      }
      return val.toString();
    }
    return val;
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-between p-4 bg-white rounded-lg border ${className}`}>
        <div className="flex items-center space-x-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <div>
            <p className="font-medium text-gray-900">{title}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">{formatValue(value)}</p>
          {status && (
            <Badge className={getStatusColor(status)}>
              {status}
            </Badge>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-2xl">{icon}</span>}
          <div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
        </div>
        {status && (
          <Badge 
            variant={statusVariant}
            className={statusVariant === 'default' ? getStatusColor(status) : ''}
          >
            {status}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
          
          {action && showActions && (
            <div className="mt-4">
              <Button
                variant={action.variant || 'default'}
                size="sm"
                onClick={action.onClick}
                disabled={action.disabled}
                className="w-full"
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingCard;