import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { 
  TicketStatusBadge, 
  TicketPriorityBadge, 
  TicketAgeBadge,
  TicketStatusIndicator,
  TicketPriorityIndicator
} from './TicketStatusBadge';
import { Ticket, TICKET_CATEGORIES } from '../../../types/tickets';

interface TicketCardProps {
  ticket: Ticket;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  className?: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  variant = 'default',
  showActions = true,
  className = ''
}) => {
  const categoryInfo = TICKET_CATEGORIES[ticket.category];
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCommentCount = (): number => {
    return ticket.comments?.length || 0;
  };

  const getAttachmentCount = (): number => {
    return ticket.attachments?.length || 0;
  };

  const hasRecentActivity = (): boolean => {
    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);
    return new Date(ticket.updatedAt) > dayAgo;
  };

  if (variant === 'compact') {
    return (
      <Card className={`bg-black/20 backdrop-blur-md border border-white/20 hover:border-white/30 transition-colors ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Category Icon */}
              <div className="flex-shrink-0">
                <span className="text-lg" title={categoryInfo.description}>
                  {categoryInfo.icon}
                </span>
              </div>

              {/* Ticket Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Link 
                    href={`/portal/tickets/${ticket.id}`}
                    className="text-sm font-medium text-primary hover:underline truncate"
                  >
                    {ticket.id}
                  </Link>
                  <TicketStatusIndicator status={ticket.status} />
                  <TicketPriorityIndicator priority={ticket.priority} />
                </div>
                <p className="text-sm text-gray-300 truncate" title={ticket.title}>
                  {ticket.title}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <TicketAgeBadge createdAt={ticket.createdAt} size="sm" />
              <Link href={`/portal/tickets/${ticket.id}`}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  View
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={`bg-black/20 backdrop-blur-md border border-white/20 hover:border-white/30 transition-colors ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <span className="text-2xl" title={categoryInfo.description}>
                  {categoryInfo.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Link 
                    href={`/portal/tickets/${ticket.id}`}
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    {ticket.id}
                  </Link>
                  {hasRecentActivity() && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
                      🔥 Active
                    </Badge>
                  )}
                </div>
                <h3 className="text-base font-medium text-white mb-2">
                  {ticket.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {ticket.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <TicketStatusBadge status={ticket.status} />
              <TicketPriorityBadge priority={ticket.priority} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-400">Category:</span>
              <p className="font-medium text-white">{categoryInfo.label}</p>
            </div>
            <div>
              <span className="text-gray-400">Created:</span>
              <p className="font-medium text-white">{formatDate(ticket.createdAt)}</p>
            </div>
            <div>
              <span className="text-gray-400">Updated:</span>
              <p className="font-medium text-white">{formatDate(ticket.updatedAt)}</p>
            </div>
            <div>
              <span className="text-gray-400">Assigned:</span>
              <p className="font-medium text-white">{ticket.assignedToName || 'Unassigned'}</p>
            </div>
          </div>

          {/* Activity Indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              {getCommentCount() > 0 && (
                <div className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>{getCommentCount()} comments</span>
                </div>
              )}
              {getAttachmentCount() > 0 && (
                <div className="flex items-center space-x-1">
                  <span>📎</span>
                  <span>{getAttachmentCount()} files</span>
                </div>
              )}
              {ticket.tags && ticket.tags.length > 0 && (
                <div className="flex items-center space-x-1">
                  <span>🏷️</span>
                  <span>{ticket.tags.length} tags</span>
                </div>
              )}
            </div>

            {showActions && (
              <div className="flex items-center space-x-2">
                <Link href={`/portal/tickets/${ticket.id}`}>
                  <Button variant="outline" size="sm" className="bg-transparent text-white border-white/50 hover:bg-white/10">
                    View Details
                  </Button>
                </Link>
                {ticket.status !== 'closed' && (
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    Add Comment
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          {ticket.tags && ticket.tags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex flex-wrap gap-1">
                {ticket.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`bg-black/20 backdrop-blur-md border border-white/20 hover:border-white/30 transition-colors ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {/* Category Icon */}
            <div className="flex-shrink-0 mt-1">
              <span className="text-xl" title={categoryInfo.description}>
                {categoryInfo.icon}
              </span>
            </div>

            {/* Ticket Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Link 
                  href={`/portal/tickets/${ticket.id}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {ticket.id}
                </Link>
                <Badge variant="secondary" className="text-xs">
                  {categoryInfo.label}
                </Badge>
                {hasRecentActivity() && (
                  <span className="text-xs text-blue-400" title="Recent activity">
                    🔥
                  </span>
                )}
              </div>
              
              <h3 className="text-base font-medium text-white mb-2 line-clamp-1">
                {ticket.title}
              </h3>
              
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                {ticket.description}
              </p>

              {/* Metadata Row */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-3">
                  <span>Created {formatDate(ticket.createdAt)}</span>
                  {ticket.assignedToName && (
                    <span>• Assigned to {ticket.assignedToName}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getCommentCount() > 0 && (
                    <span className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{getCommentCount()}</span>
                    </span>
                  )}
                  {getAttachmentCount() > 0 && (
                    <span className="flex items-center space-x-1">
                      <span>📎</span>
                      <span>{getAttachmentCount()}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-4">
            <div className="flex items-center space-x-2">
              <TicketStatusBadge status={ticket.status} size="sm" />
              <TicketPriorityBadge priority={ticket.priority} size="sm" />
            </div>
            
            {showActions && (
              <div className="flex items-center space-x-1">
                <Link href={`/portal/tickets/${ticket.id}`}>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    View
                  </Button>
                </Link>
                {ticket.status !== 'closed' && (
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-500/10">
                    Reply
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;