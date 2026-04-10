// Comprehensive ticket management TypeScript interfaces

export type TicketStatus = 'open' | 'in_progress' | 'waiting_for_customer' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketCategory = 
  | 'network_issues'
  | 'software_support'
  | 'hardware_problems'
  | 'security_concerns'
  | 'emergency_support'
  | 'general_inquiry';

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  url: string;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  authorRole: 'customer' | 'support' | 'admin';
  content: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt?: string;
  attachments?: TicketAttachment[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  userId: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  attachments: TicketAttachment[];
  comments: TicketComment[];
  tags?: string[];
  estimatedResolutionTime?: string;
  actualResolutionTime?: string;
}

export interface CreateTicketData {
  title: string;
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
  attachments?: File[];
}

export interface UpdateTicketData {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  assignedTo?: string;
  tags?: string[];
}

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: TicketCategory[];
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}

export interface TicketSortOptions {
  field: 'createdAt' | 'updatedAt' | 'priority' | 'status' | 'title';
  direction: 'asc' | 'desc';
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  waitingForCustomer: number;
  resolved: number;
  closed: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  byCategory: Record<TicketCategory, number>;
  averageResolutionTime: number;
  recentActivity: number;
}

export interface TicketListResponse {
  tickets: Ticket[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Category display information
export const TICKET_CATEGORIES: Record<TicketCategory, { label: string; icon: string; description: string }> = {
  network_issues: {
    label: 'Network Issues',
    icon: '🌐',
    description: 'Internet connectivity, network configuration, and infrastructure problems'
  },
  software_support: {
    label: 'Software Support',
    icon: '💻',
    description: 'Application issues, software installation, and configuration help'
  },
  hardware_problems: {
    label: 'Hardware Problems',
    icon: '🔧',
    description: 'Computer hardware, peripherals, and equipment issues'
  },
  security_concerns: {
    label: 'Security Concerns',
    icon: '🔒',
    description: 'Security incidents, malware, and data protection issues'
  },
  emergency_support: {
    label: 'Emergency Support',
    icon: '🚨',
    description: 'Critical issues requiring immediate attention'
  },
  general_inquiry: {
    label: 'General Inquiry',
    icon: '❓',
    description: 'Questions, requests for information, and general support'
  }
};

// Priority display information
export const TICKET_PRIORITIES: Record<TicketPriority, { label: string; color: string; description: string }> = {
  low: {
    label: 'Low',
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Minor issues that can be addressed during regular business hours'
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Standard issues that should be addressed within normal timeframes'
  },
  high: {
    label: 'High',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Important issues that need prompt attention'
  },
  critical: {
    label: 'Critical',
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Urgent issues that require immediate attention and may affect business operations'
  }
};

// Status display information
export const TICKET_STATUSES: Record<TicketStatus, { label: string; color: string; description: string }> = {
  open: {
    label: 'Open',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'New ticket awaiting initial review'
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Ticket is being actively worked on'
  },
  waiting_for_customer: {
    label: 'Waiting for Customer',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Waiting for customer response or action'
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Issue has been resolved and is awaiting customer confirmation'
  },
  closed: {
    label: 'Closed',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    description: 'Ticket has been completed and closed'
  }
};

// File upload constraints
export const FILE_UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  allowedTypes: [
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/csv',
    // Logs and technical files
    'text/log',
    'application/json',
    'application/xml'
  ],
  allowedExtensions: [
    '.jpg', '.jpeg', '.png', '.gif', '.webp',
    '.pdf', '.doc', '.docx', '.txt', '.csv',
    '.log', '.json', '.xml'
  ]
};