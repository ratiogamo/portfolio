import React, { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { FileUpload } from '../shared/FileUpload';
import { 
  TicketStatusBadge, 
  TicketPriorityBadge, 
  CombinedTicketBadge 
} from './TicketStatusBadge';
import { useTickets } from '../../../hooks/useTickets';
import PortalLayout from '../PortalLayout';
import { 
  Ticket, 
  TICKET_CATEGORIES,
  TicketStatus
} from '../../../types/tickets';

interface TicketDetailProps {
  ticketId?: string;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId: propTicketId }) => {
  const [, params] = useRoute('/portal/tickets/:id');
  const [, setLocation] = useLocation();
  const ticketId = propTicketId || params?.id;
  
  const { getTicket, addComment, updateTicket, deleteAttachment, loading } = useTickets();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentFiles, setCommentFiles] = useState<File[]>([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ticketId) {
      loadTicket();
    }
  }, [ticketId]);

  const loadTicket = async () => {
    if (!ticketId) return;
    
    try {
      const ticketData = await getTicket(ticketId);
      if (ticketData) {
        setTicket(ticketData);
      } else {
        setError('Ticket not found');
      }
    } catch (err) {
      setError('Failed to load ticket');
    }
  };

  const handleAddComment = async () => {
    if (!ticket || !newComment.trim()) return;

    setIsAddingComment(true);
    try {
      await addComment(ticket.id, newComment.trim(), commentFiles);
      setNewComment('');
      setCommentFiles([]);
      await loadTicket(); // Refresh ticket data
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket) return;

    setIsUpdatingStatus(true);
    try {
      await updateTicket(ticket.id, { status: newStatus });
      await loadTicket(); // Refresh ticket data
    } catch (err) {
      setError('Failed to update ticket status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteAttachment = async (attachmentId: string) => {
    if (!ticket) return;

    try {
      await deleteAttachment(ticket.id, attachmentId);
      await loadTicket(); // Refresh ticket data
    } catch (err) {
      setError('Failed to delete attachment');
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string): string => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType === 'text/plain') return '📄';
    if (fileType === 'text/csv') return '📊';
    if (fileType.includes('json') || fileType.includes('xml')) return '⚙️';
    return '📎';
  };

  const getStatusActions = (): { label: string; status: TicketStatus; variant: 'default' | 'outline' | 'secondary' }[] => {
    if (!ticket) return [];

    const actions = [];
    
    switch (ticket.status) {
      case 'open':
        actions.push({ label: 'Mark In Progress', status: 'in_progress' as TicketStatus, variant: 'default' as const });
        actions.push({ label: 'Mark Resolved', status: 'resolved' as TicketStatus, variant: 'outline' as const });
        break;
      case 'in_progress':
        actions.push({ label: 'Mark Resolved', status: 'resolved' as TicketStatus, variant: 'default' as const });
        actions.push({ label: 'Waiting for Customer', status: 'waiting_for_customer' as TicketStatus, variant: 'outline' as const });
        break;
      case 'waiting_for_customer':
        actions.push({ label: 'Resume Progress', status: 'in_progress' as TicketStatus, variant: 'default' as const });
        actions.push({ label: 'Mark Resolved', status: 'resolved' as TicketStatus, variant: 'outline' as const });
        break;
      case 'resolved':
        actions.push({ label: 'Close Ticket', status: 'closed' as TicketStatus, variant: 'default' as const });
        actions.push({ label: 'Reopen', status: 'open' as TicketStatus, variant: 'outline' as const });
        break;
      case 'closed':
        actions.push({ label: 'Reopen', status: 'open' as TicketStatus, variant: 'outline' as const });
        break;
    }

    return actions;
  };

  if (loading && !ticket) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading ticket...</p>
          </div>
        </div>
      </PortalLayout>
    );
  }

  if (error || !ticket) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error || 'Ticket not found'}</p>
            <Button onClick={() => setLocation('/portal/tickets')} className="bg-transparent text-white border-white/50 hover:bg-white/10">
              Back to Tickets
            </Button>
          </div>
        </div>
      </PortalLayout>
    );
  }

  const categoryInfo = TICKET_CATEGORIES[ticket.category];

  return (
    <PortalLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-3xl" title={categoryInfo.description}>
                    {categoryInfo.icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-white">{ticket.id}</h1>
                    <CombinedTicketBadge status={ticket.status} priority={ticket.priority} />
                  </div>
                  <h2 className="text-xl text-gray-300 mb-2">{ticket.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Created {formatDate(ticket.createdAt)}</span>
                    <span>•</span>
                    <span>Category: {categoryInfo.label}</span>
                    {ticket.assignedToName && (
                      <>
                        <span>•</span>
                        <span>Assigned to {ticket.assignedToName}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setLocation('/portal/tickets')}
                  className="bg-transparent text-white border-white/50 hover:bg-white/10"
                >
                  ← Back to Tickets
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none prose-invert">
                  <p className="whitespace-pre-wrap text-gray-300">{ticket.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            {ticket.attachments && ticket.attachments.length > 0 && (
              <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Attachments ({ticket.attachments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ticket.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                        <span className="text-2xl">{getFileIcon(attachment.fileType)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white">{attachment.fileName}</p>
                          <p className="text-xs text-gray-400">
                            {formatFileSize(attachment.fileSize)} • {formatDate(attachment.uploadedAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                            📥
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteAttachment(attachment.id)}
                            className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments */}
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Comments & Updates ({ticket.comments?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticket.comments && ticket.comments.length > 0 ? (
                    ticket.comments.map((comment) => (
                      <div key={comment.id} className="border-l-4 border-white/20 pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm text-white">{comment.authorName}</span>
                            <Badge variant="secondary" className="text-xs">
                              {comment.authorRole}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <div className="prose prose-sm max-w-none prose-invert">
                          <p className="whitespace-pre-wrap text-gray-300">{comment.content}</p>
                        </div>
                        {comment.attachments && comment.attachments.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {comment.attachments.map((attachment) => (
                              <Badge key={attachment.id} variant="outline" className="text-xs">
                                {getFileIcon(attachment.fileType)} {attachment.fileName}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No comments yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Add Comment */}
            {ticket.status !== 'closed' && (
              <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Add a comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={4}
                      maxLength={1000}
                      className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 resize-vertical"
                      disabled={isAddingComment}
                    />
                    
                    <div className="flex items-center justify-between">
                      <FileUpload
                        onFilesSelected={(files) => setCommentFiles(prev => [...prev, ...files])}
                        onFileRemove={(index) => setCommentFiles(prev => prev.filter((_, i) => i !== index))}
                        selectedFiles={commentFiles}
                        disabled={isAddingComment}
                        maxFiles={3}
                        variant="compact"
                        className="flex-1 mr-4"
                      />
                      <Button
                        onClick={handleAddComment}
                        disabled={!newComment.trim() || isAddingComment}
                      >
                        {isAddingComment ? 'Adding...' : 'Add Comment'}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-400">
                      {1000 - newComment.length} characters left
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Actions */}
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getStatusActions().map((action) => (
                    <Button
                      key={action.status}
                      variant={action.variant}
                      className="w-full bg-transparent text-white border-white/50 hover:bg-white/10"
                      onClick={() => handleStatusChange(action.status)}
                      disabled={isUpdatingStatus}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ticket Info */}
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Ticket Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <div className="mt-1">
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Priority:</span>
                    <div className="mt-1">
                      <TicketPriorityBadge priority={ticket.priority} />
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Category:</span>
                    <p className="font-medium text-white">{categoryInfo.label}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Created:</span>
                    <p className="font-medium text-white">{formatDate(ticket.createdAt)}</p>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Last Updated:</span>
                    <p className="font-medium text-white">{formatDate(ticket.updatedAt)}</p>
                  </div>
                  
                  {ticket.resolvedAt && (
                    <div>
                      <span className="text-gray-400">Resolved:</span>
                      <p className="font-medium text-white">{formatDate(ticket.resolvedAt)}</p>
                    </div>
                  )}
                  
                  {ticket.assignedToName && (
                    <div>
                      <span className="text-gray-400">Assigned To:</span>
                      <p className="font-medium text-white">{ticket.assignedToName}</p>
                    </div>
                  )}
                  
                  {ticket.estimatedResolutionTime && (
                    <div>
                      <span className="text-gray-400">Est. Resolution:</span>
                      <p className="font-medium text-white">{ticket.estimatedResolutionTime}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {ticket.tags && ticket.tags.length > 0 && (
              <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {ticket.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default TicketDetail;