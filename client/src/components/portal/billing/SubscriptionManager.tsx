import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Alert, AlertDescription } from '../../ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Subscription, SubscriptionPlan, BillingComponentProps } from '../../../types/billing';
import BillingCard from './BillingCard';

interface SubscriptionManagerProps extends BillingComponentProps {
  subscription: Subscription | null;
  availablePlans?: SubscriptionPlan[];
  onUpdateSubscription?: (planId: string) => Promise<void>;
  onCancelSubscription?: (cancelAtPeriodEnd?: boolean) => Promise<void>;
  onResumeSubscription?: () => Promise<void>;
  loading?: boolean;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  subscription,
  availablePlans = [],
  onUpdateSubscription,
  onCancelSubscription,
  onResumeSubscription,
  loading = false,
  className = '',
  showActions = true,
}) => {
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trialing':
        return 'bg-blue-100 text-blue-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
      case 'incomplete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const calculateDiscountedPrice = (plan: SubscriptionPlan) => {
    if (plan.discountPercentage) {
      const discountAmount = (plan.price * plan.discountPercentage) / 100;
      return plan.price - discountAmount;
    }
    return plan.price;
  };

  const handlePlanChange = async () => {
    if (!selectedPlan || !onUpdateSubscription) return;
    
    setIsChangingPlan(true);
    try {
      await onUpdateSubscription(selectedPlan);
      setSelectedPlan(null);
    } catch (error) {
      console.error('Failed to update subscription:', error);
    } finally {
      setIsChangingPlan(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!onCancelSubscription) return;
    
    setIsCanceling(true);
    try {
      await onCancelSubscription(cancelAtPeriodEnd);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    } finally {
      setIsCanceling(false);
    }
  };

  const handleResumeSubscription = async () => {
    if (!onResumeSubscription) return;
    
    try {
      await onResumeSubscription();
    } catch (error) {
      console.error('Failed to resume subscription:', error);
    }
  };

  if (!subscription) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>
            You don't have an active subscription. Choose a plan to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-gray-600 mb-4">Start your IT solutions journey today</p>
            <Button>Choose a Plan</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Current Subscription Overview */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Current Subscription</span>
                <Badge className={getStatusColor(subscription.status)}>
                  {subscription.status.replace('_', ' ')}
                </Badge>
              </CardTitle>
              <CardDescription>
                Manage your {subscription.plan.name} subscription
              </CardDescription>
            </div>
            {subscription.status === 'canceled' && subscription.cancelAtPeriodEnd && (
              <Button
                variant="outline"
                onClick={handleResumeSubscription}
                disabled={loading}
              >
                Resume Subscription
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BillingCard
              title="Monthly Cost"
              value={subscription.discountApplied 
                ? calculateDiscountedPrice(subscription.plan)
                : subscription.plan.price
              }
              subtitle={subscription.discountApplied 
                ? `${subscription.discountApplied.percentOff}% discount applied`
                : `Billed ${subscription.plan.interval}ly`
              }
              icon="💰"
              variant="compact"
            />
            
            <BillingCard
              title="Current Period"
              value={formatDate(subscription.currentPeriodEnd)}
              subtitle="Billing period ends"
              icon="📅"
              variant="compact"
            />
            
            <BillingCard
              title="Next Billing"
              value={formatDate(subscription.nextBillingDate)}
              subtitle="Next charge date"
              icon="🔄"
              variant="compact"
            />
            
            <BillingCard
              title="Plan Features"
              value={subscription.plan.features.length}
              subtitle="Included features"
              icon="✨"
              variant="compact"
            />
          </div>

          {/* Plan Features */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Plan Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {subscription.plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discount Information */}
          {subscription.discountApplied && (
            <Alert className="mt-4">
              <AlertDescription>
                <strong>Discount Applied:</strong> {subscription.discountApplied.name} - 
                {subscription.discountApplied.percentOff}% off 
                {subscription.discountApplied.duration === 'forever' 
                  ? ' forever' 
                  : subscription.discountApplied.duration === 'once' 
                    ? ' for this billing cycle'
                    : ` for ${subscription.discountApplied.durationInMonths} months`
                }
              </AlertDescription>
            </Alert>
          )}

          {/* Cancellation Notice */}
          {subscription.cancelAtPeriodEnd && (
            <Alert className="mt-4">
              <AlertDescription>
                <strong>Subscription Ending:</strong> Your subscription will end on {formatDate(subscription.currentPeriodEnd)}. 
                You'll continue to have access until then.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Subscription Actions */}
      {showActions && subscription.status !== 'canceled' && (
        <Card>
          <CardHeader>
            <CardTitle>Subscription Actions</CardTitle>
            <CardDescription>
              Manage your subscription settings and billing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Change Plan */}
              {availablePlans.length > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      Change Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Change Subscription Plan</DialogTitle>
                      <DialogDescription>
                        Choose a new plan. Changes will be prorated and take effect immediately.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                      {availablePlans.map((plan) => (
                        <Card 
                          key={plan.id}
                          className={`cursor-pointer transition-colors ${
                            selectedPlan === plan.id 
                              ? 'ring-2 ring-primary' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {plan.name}
                              {plan.isPopular && (
                                <Badge>Popular</Badge>
                              )}
                            </CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {formatPrice(calculateDiscountedPrice(plan), plan.currency)}
                              <span className="text-sm font-normal text-gray-500">
                                /{plan.interval}
                              </span>
                            </div>
                            {plan.discountPercentage && (
                              <p className="text-sm text-green-600 mt-1">
                                {plan.discountPercentage}% discount applied
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPlan(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handlePlanChange}
                        disabled={!selectedPlan || isChangingPlan}
                      >
                        {isChangingPlan ? 'Updating...' : 'Update Plan'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* Cancel Subscription */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="flex-1">
                    Cancel Subscription
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Subscription</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel your subscription? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="cancelAtPeriodEnd"
                        checked={cancelAtPeriodEnd}
                        onChange={(e) => setCancelAtPeriodEnd(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="cancelAtPeriodEnd" className="text-sm">
                        Cancel at the end of the current billing period ({formatDate(subscription.currentPeriodEnd)})
                      </label>
                    </div>
                    {!cancelAtPeriodEnd && (
                      <p className="text-sm text-red-600 mt-2">
                        Your subscription will be canceled immediately and you'll lose access to all features.
                      </p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline">
                      Keep Subscription
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleCancelSubscription}
                      disabled={isCanceling}
                    >
                      {isCanceling ? 'Canceling...' : 'Cancel Subscription'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionManager;