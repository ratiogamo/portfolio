import React from 'react';
import { Badge } from '../../ui/badge';
import { 
  TicketStatus, 
  TicketPriority, 
  TICKET_STATUSES, 
  TICKET_PRIORITIES 
} from '../../../types/tickets';

interface TicketStatusBadgeProps {
  status: TicketStatus;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface TicketPriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface CombinedBadgeProps {
  status: TicketStatus;
  priority: TicketPriority;
  showBoth?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({ 
  status, 
  className = '', 
  size = 'md' 
}) => {
  const statusInfo = TICKET_STATUSES[status];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <Badge 
      className={`${statusInfo.color} ${sizeClasses[size]} font-medium border ${className}`}
      variant="secondary"
    >
      {statusInfo.label}
    </Badge>
  );
};

export const TicketPriorityBadge: React.FC<TicketPriorityBadgeProps> = ({ 
  priority, 
  className = '', 
  size = 'md' 
}) => {
  const priorityInfo = TICKET_PRIORITIES[priority];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const priorityIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🟠',
    critical: '🔴'
  };

  return (
    <Badge 
      className={`${priorityInfo.color} ${sizeClasses[size]} font-medium border ${className}`}
      variant="secondary"
    >
      <span className="mr-1">{priorityIcons[priority]}</span>
      {priorityInfo.label}
    </Badge>
  );
};

export const CombinedTicketBadge: React.FC<CombinedBadgeProps> = ({ 
  status, 
  priority, 
  showBoth = true, 
  className = '', 
  size = 'md' 
}) => {
  if (!showBoth) {
    // Show priority for open/in_progress tickets, status for others
    if (status === 'open' || status === 'in_progress') {
      return <TicketPriorityBadge priority={priority} className={className} size={size} />;
    } else {
      return <TicketStatusBadge status={status} className={className} size={size} />;
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <TicketStatusBadge status={status} size={size} />
      <TicketPriorityBadge priority={priority} size={size} />
    </div>
  );
};

// Status indicator with icon for compact displays
export const TicketStatusIndicator: React.FC<{ 
  status: TicketStatus; 
  className?: string;
  showLabel?: boolean;
}> = ({ status, className = '', showLabel = false }) => {
  const statusInfo = TICKET_STATUSES[status];
  
  const statusIcons = {
    open: '🆕',
    in_progress: '⚡',
    waiting_for_customer: '⏳',
    resolved: '✅',
    closed: '🔒'
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <span className="text-sm" title={statusInfo.description}>
        {statusIcons[status]}
      </span>
      {showLabel && (
        <span className={`text-xs font-medium ${statusInfo.color.split(' ')[1]}`}>
          {statusInfo.label}
        </span>
      )}
    </div>
  );
};

// Priority indicator with icon for compact displays
export const TicketPriorityIndicator: React.FC<{ 
  priority: TicketPriority; 
  className?: string;
  showLabel?: boolean;
}> = ({ priority, className = '', showLabel = false }) => {
  const priorityInfo = TICKET_PRIORITIES[priority];
  
  const priorityIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🟠',
    critical: '🔴'
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <span className="text-sm" title={priorityInfo.description}>
        {priorityIcons[priority]}
      </span>
      {showLabel && (
        <span className={`text-xs font-medium ${priorityInfo.color.split(' ')[1]}`}>
          {priorityInfo.label}
        </span>
      )}
    </div>
  );
};

// Utility component for displaying ticket age
export const TicketAgeBadge: React.FC<{ 
  createdAt: string; 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ createdAt, className = '', size = 'md' }) => {
  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  };

  const getAgeColor = (dateString: string): string => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return 'bg-green-100 text-green-800 border-green-200';
    if (diffInHours < 72) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <Badge 
      className={`${getAgeColor(createdAt)} ${sizeClasses[size]} font-medium border ${className}`}
      variant="secondary"
    >
      {getTimeAgo(createdAt)}
    </Badge>
  );
};

export default TicketStatusBadge;