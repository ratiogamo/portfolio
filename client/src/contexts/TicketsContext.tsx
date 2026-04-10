import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  Ticket, 
  CreateTicketData, 
  UpdateTicketData, 
  TicketFilters, 
  TicketSortOptions, 
  TicketStats,
  TicketListResponse,
  TicketComment,
  TicketAttachment
} from '../types/tickets';

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: 'TK-001',
    title: 'Email server configuration issues',
    description: 'Unable to send emails from Outlook. Getting authentication errors when trying to connect to the mail server.',
    status: 'in_progress',
    priority: 'high',
    category: 'software_support',
    userId: 'user-1',
    assignedTo: 'support-1',
    assignedToName: 'John Smith',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    attachments: [
      {
        id: 'att-1',
        fileName: 'error-screenshot.png',
        fileSize: 245760,
        fileType: 'image/png',
        uploadedAt: '2024-01-10T09:05:00Z',
        url: '/uploads/error-screenshot.png'
      }
    ],
    comments: [
      {
        id: 'comment-1',
        ticketId: 'TK-001',
        authorId: 'user-1',
        authorName: 'Jane Doe',
        authorRole: 'customer',
        content: 'This started happening after the Windows update yesterday.',
        isInternal: false,
        createdAt: '2024-01-10T09:15:00Z'
      },
      {
        id: 'comment-2',
        ticketId: 'TK-001',
        authorId: 'support-1',
        authorName: 'John Smith',
        authorRole: 'support',
        content: 'I can see the issue. Let me check the server configuration and get back to you.',
        isInternal: false,
        createdAt: '2024-01-10T14:30:00Z'
      }
    ],
    tags: ['email', 'outlook', 'authentication'],
    estimatedResolutionTime: '2 hours'
  },
  {
    id: 'TK-002',
    title: 'Network printer not responding',
    description: 'The office printer (HP LaserJet Pro) is not responding to print jobs. All computers show it as offline.',
    status: 'open',
    priority: 'medium',
    category: 'hardware_problems',
    userId: 'user-1',
    createdAt: '2024-01-08T11:30:00Z',
    updatedAt: '2024-01-08T11:30:00Z',
    attachments: [],
    comments: [],
    tags: ['printer', 'network', 'hardware']
  },
  {
    id: 'TK-003',
    title: 'Suspicious email received',
    description: 'Received a suspicious email that looks like phishing. Want to report it and get guidance on security best practices.',
    status: 'resolved',
    priority: 'high',
    category: 'security_concerns',
    userId: 'user-1',
    assignedTo: 'support-2',
    assignedToName: 'Sarah Johnson',
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-01-06T10:20:00Z',
    resolvedAt: '2024-01-06T10:20:00Z',
    attachments: [],
    comments: [
      {
        id: 'comment-3',
        ticketId: 'TK-003',
        authorId: 'support-2',
        authorName: 'Sarah Johnson',
        authorRole: 'support',
        content: 'Thank you for reporting this. I\'ve analyzed the email and confirmed it\'s a phishing attempt. I\'ve added the sender to our blocklist.',
        isInternal: false,
        createdAt: '2024-01-06T10:20:00Z'
      }
    ],
    tags: ['security', 'phishing', 'email'],
    actualResolutionTime: '18 hours'
  }
];

interface TicketsContextType {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  stats: TicketStats | null;
  selectedTicketId: string | null;
  setSelectedTicketId: (id: string | null) => void;
  
  createTicket: (data: CreateTicketData) => Promise<Ticket>;
  updateTicket: (id: string, data: UpdateTicketData) => Promise<Ticket>;
  deleteTicket: (id: string) => Promise<void>;
  getTicket: (id: string) => Promise<Ticket | null>;
  fetchTickets: (filters?: TicketFilters, sort?: TicketSortOptions, page?: number, limit?: number) => Promise<TicketListResponse>;
  refreshTickets: () => Promise<void>;
  addComment: (ticketId: string, content: string, attachments?: File[]) => Promise<TicketComment>;
  uploadAttachment: (ticketId: string, file: File) => Promise<TicketAttachment>;
  deleteAttachment: (ticketId: string, attachmentId: string) => Promise<void>;
  fetchStats: () => Promise<TicketStats>;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

interface TicketsProviderProps {
  children: ReactNode;
}

export const TicketsProvider: React.FC<TicketsProviderProps> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const calculateStats = useCallback((ticketList: Ticket[]) => {
    const stats: TicketStats = {
      total: ticketList.length,
      open: ticketList.filter(t => t.status === 'open').length,
      inProgress: ticketList.filter(t => t.status === 'in_progress').length,
      waitingForCustomer: ticketList.filter(t => t.status === 'waiting_for_customer').length,
      resolved: ticketList.filter(t => t.status === 'resolved').length,
      closed: ticketList.filter(t => t.status === 'closed').length,
      byPriority: {
        low: ticketList.filter(t => t.priority === 'low').length,
        medium: ticketList.filter(t => t.priority === 'medium').length,
        high: ticketList.filter(t => t.priority === 'high').length,
        critical: ticketList.filter(t => t.priority === 'critical').length,
      },
      byCategory: {
        network_issues: ticketList.filter(t => t.category === 'network_issues').length,
        software_support: ticketList.filter(t => t.category === 'software_support').length,
        hardware_problems: ticketList.filter(t => t.category === 'hardware_problems').length,
        security_concerns: ticketList.filter(t => t.category === 'security_concerns').length,
        emergency_support: ticketList.filter(t => t.category === 'emergency_support').length,
        general_inquiry: ticketList.filter(t => t.category === 'general_inquiry').length,
      },
      averageResolutionTime: 24, // Mock average in hours
      recentActivity: ticketList.filter(t => {
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 1);
        return new Date(t.updatedAt) > dayAgo;
      }).length
    };
    setStats(stats);
  }, []);

  useEffect(() => {
    setTickets(mockTickets);
    calculateStats(mockTickets);
  }, [calculateStats]);

  const createTicket = useCallback(async (data: CreateTicketData): Promise<Ticket> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTicket: Ticket = {
        id: `TK-${String(tickets.length + 1).padStart(3, '0')}`,
        title: data.title,
        description: data.description,
        status: 'open',
        priority: data.priority,
        category: data.category,
        userId: 'current-user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attachments: [],
        comments: [],
        tags: []
      };
      
      const updatedTickets = [newTicket, ...tickets];
      setTickets(updatedTickets);
      calculateStats(updatedTickets);
      
      return newTicket;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create ticket';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets, calculateStats]);

  const updateTicket = useCallback(async (id: string, data: UpdateTicketData): Promise<Ticket> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let updatedTicket: Ticket | undefined;
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === id) {
          updatedTicket = {
            ...ticket,
            ...data,
            updatedAt: new Date().toISOString(),
            ...(data.status === 'resolved' && !ticket.resolvedAt ? { resolvedAt: new Date().toISOString() } : {}),
            ...(data.status === 'closed' && !ticket.closedAt ? { closedAt: new Date().toISOString() } : {})
          };
          return updatedTicket;
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      calculateStats(updatedTickets);
      
      if (!updatedTicket) throw new Error('Ticket not found');
      
      return updatedTicket;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update ticket';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets, calculateStats]);

  const deleteTicket = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedTickets = tickets.filter(ticket => ticket.id !== id);
      setTickets(updatedTickets);
      calculateStats(updatedTickets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete ticket';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets, calculateStats]);

  const getTicket = useCallback(async (id: string): Promise<Ticket | null> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const ticket = tickets.find(t => t.id === id) || null;
      return ticket;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch ticket';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets]);

  const fetchTickets = useCallback(async (
    filters?: TicketFilters,
    sort?: TicketSortOptions,
    page = 1,
    limit = 10
  ): Promise<TicketListResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredTickets = [...tickets];
      
      if (filters) {
        if (filters.status?.length) {
          filteredTickets = filteredTickets.filter(t => filters.status!.includes(t.status));
        }
        if (filters.priority?.length) {
          filteredTickets = filteredTickets.filter(t => filters.priority!.includes(t.priority));
        }
        if (filters.category?.length) {
          filteredTickets = filteredTickets.filter(t => filters.category!.includes(t.category));
        }
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredTickets = filteredTickets.filter(t => 
            t.title.toLowerCase().includes(searchLower) ||
            t.description.toLowerCase().includes(searchLower) ||
            t.id.toLowerCase().includes(searchLower)
          );
        }
      }
      
      if (sort) {
        filteredTickets.sort((a, b) => {
          let aValue: any = a[sort.field];
          let bValue: any = b[sort.field];
          
          if (sort.field === 'priority') {
            const priorityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
            aValue = priorityOrder[a.priority];
            bValue = priorityOrder[b.priority];
          }
          
          if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedTickets = filteredTickets.slice(startIndex, endIndex);
      
      return {
        tickets: paginatedTickets,
        total: filteredTickets.length,
        page,
        limit,
        hasMore: endIndex < filteredTickets.length
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tickets';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets]);

  const refreshTickets = useCallback(async (): Promise<void> => {
    calculateStats(tickets);
  }, [tickets, calculateStats]);

  const addComment = useCallback(async (ticketId: string, content: string, attachments?: File[]): Promise<TicketComment> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newAttachments: TicketAttachment[] = (attachments || []).map(file => ({
        id: `att-${Date.now()}-${Math.random()}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString(),
        url: `/uploads/${file.name}`
      }));

      const newComment: TicketComment = {
        id: `comment-${Date.now()}`,
        ticketId,
        authorId: 'current-user',
        authorName: 'Current User',
        authorRole: 'customer',
        content,
        isInternal: false,
        createdAt: new Date().toISOString(),
        attachments: newAttachments
      };
      
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            comments: [...(ticket.comments || []), newComment],
            updatedAt: new Date().toISOString()
          };
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      return newComment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add comment';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets]);

  const uploadAttachment = useCallback(async (ticketId: string, file: File): Promise<TicketAttachment> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAttachment: TicketAttachment = {
        id: `att-${Date.now()}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString(),
        url: `/uploads/${file.name}`
      };
      
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            attachments: [...(ticket.attachments || []), newAttachment],
            updatedAt: new Date().toISOString()
          };
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
      return newAttachment;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload attachment';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets]);

  const deleteAttachment = useCallback(async (ticketId: string, attachmentId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === ticketId) {
          return {
            ...ticket,
            attachments: ticket.attachments.filter(att => att.id !== attachmentId),
            updatedAt: new Date().toISOString()
          };
        }
        return ticket;
      });
      
      setTickets(updatedTickets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete attachment';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tickets]);

  const fetchStats = useCallback(async (): Promise<TicketStats> => {
    if (stats) return stats;
    
    calculateStats(tickets);
    return stats!;
  }, [stats, tickets, calculateStats]);

  const contextValue: TicketsContextType = {
    tickets,
    loading,
    error,
    stats,
    selectedTicketId,
    setSelectedTicketId,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicket,
    fetchTickets,
    refreshTickets,
    addComment,
    uploadAttachment,
    deleteAttachment,
    fetchStats
  };

  return (
    <TicketsContext.Provider value={contextValue}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = (): TicketsContextType => {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
};