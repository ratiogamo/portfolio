import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { FileUpload } from '../shared/FileUpload';
import { 
  TicketStatusBadge, 
  TicketPriorityBadge, 
  CombinedTicketBadge 
} from './TicketStatusBadge';
import { useTickets } from '../../../contexts/TicketsContext';
import { 
  Ticket, 
  TICKET_CATEGORIES,
  TicketStatus
} from '../../../types/tickets';

interface TicketDetailModalProps {
  ticketId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ ticketId, isOpen, onClose }) => {
  const { getTicket, addComment, updateTicket, deleteAttachment, loading } = useTickets();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentFiles, setCommentFiles] = useState<File[]>([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ticketId && isOpen) {
      loadTicket(ticketId);
    } else {
      setTicket(null);
      setError(null);
    }
  }, [ticketId, isOpen]);

  const loadTicket = async (id: string) => {
    try {
      const ticketData = await getTicket(id);
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
      await loadTicket(ticket.id);
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
      await loadTicket(ticket.id);
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
      await loadTicket(ticket.id);
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
        actions.push({ label: 'Mark In Progress', status: 'in_progress', variant: 'default' });
        actions.push({ label: 'Mark Resolved', status: 'resolved', variant: 'outline' });
        break;
      case 'in_progress':
        actions.push({ label: 'Mark Resolved', status: 'resolved', variant: 'default' });
        actions.push({ label: 'Waiting for Customer', status: 'waiting_for_customer', variant: 'outline' });
        break;
      case 'waiting_for_customer':
        actions.push({ label: 'Resume Progress', status: 'in_progress', variant: 'default' });
        actions.push({ label: 'Mark Resolved', status: 'resolved', variant: 'outline' });
        break;
      case 'resolved':
        actions.push({ label: 'Close Ticket', status: 'closed', variant: 'default' });
        actions.push({ label: 'Reopen', status: 'open', variant: 'outline' });
        break;
      case 'closed':
        actions.push({ label: 'Reopen', status: 'open', variant: 'outline' });
        break;
    }
    return actions;
  };

  const renderContent = () => {
    if (loading && !ticket) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading ticket...</p>
          </div>
        </div>
      );
    }

    if (error || !ticket) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error || 'Ticket not found'}</p>
            <Button onClick={onClose} className="bg-transparent text-white border-white/50 hover:bg-white/10">
              Close
            </Button>
          </div>
        </div>
      );
    }

    const categoryInfo = TICKET_CATEGORIES[ticket.category];

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                          <p className="text-xs text-gray-400">{formatFileSize(attachment.fileSize)} • {formatDate(attachment.uploadedAt)}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">📥</Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteAttachment(attachment.id)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10">🗑️</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
                            <Badge variant="secondary" className="text-xs">{comment.authorRole}</Badge>
                          </div>
                          <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                        </div>
                        <div className="prose prose-sm max-w-none prose-invert">
                          <p className="whitespace-pre-wrap text-gray-300">{comment.content}</p>
                        </div>
                        {comment.attachments && comment.attachments.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {comment.attachments.map((attachment) => (
                              <Badge key={attachment.id} variant="outline" className="text-xs">{getFileIcon(attachment.fileType)} {attachment.fileName}</Badge>
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

            {ticket.status !== 'closed' && (
              <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Add a comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." rows={4} maxLength={1000} className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 resize-vertical" disabled={isAddingComment} />
                    <div className="flex items-center justify-between">
                      <FileUpload onFilesSelected={(files) => setCommentFiles(prev => [...prev, ...files])} onFileRemove={(index) => setCommentFiles(prev => prev.filter((_, i) => i !== index))} selectedFiles={commentFiles} disabled={isAddingComment} maxFiles={3} variant="compact" className="flex-1 mr-4" />
                      <Button onClick={handleAddComment} disabled={!newComment.trim() || isAddingComment}>{isAddingComment ? 'Adding...' : 'Add Comment'}</Button>
                    </div>
                    <p className="text-sm text-gray-400">{1000 - newComment.length} characters left</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getStatusActions().map((action) => (
                    <Button key={action.status} variant={action.variant} className="w-full bg-transparent text-white border-white/50 hover:bg-white/10" onClick={() => handleStatusChange(action.status)} disabled={isUpdatingStatus}>{action.label}</Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Ticket Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div><span className="text-gray-400">Status:</span><div className="mt-1"><TicketStatusBadge status={ticket.status} /></div></div>
                  <div><span className="text-gray-400">Priority:</span><div className="mt-1"><TicketPriorityBadge priority={ticket.priority} /></div></div>
                  <div><span className="text-gray-400">Category:</span><p className="font-medium text-white">{categoryInfo.label}</p></div>
                  <div><span className="text-gray-400">Created:</span><p className="font-medium text-white">{formatDate(ticket.createdAt)}</p></div>
                  <div><span className="text-gray-400">Last Updated:</span><p className="font-medium text-white">{formatDate(ticket.updatedAt)}</p></div>
                  {ticket.resolvedAt && <div><span className="text-gray-400">Resolved:</span><p className="font-medium text-white">{formatDate(ticket.resolvedAt)}</p></div>}
                  {ticket.assignedToName && <div><span className="text-gray-400">Assigned To:</span><p className="font-medium text-white">{ticket.assignedToName}</p></div>}
                  {ticket.estimatedResolutionTime && <div><span className="text-gray-400">Est. Resolution:</span><p className="font-medium text-white">{ticket.estimatedResolutionTime}</p></div>}
                </div>
              </CardContent>
            </Card>

            {ticket.tags && ticket.tags.length > 0 && (
              <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {ticket.tags.map((tag, index) => (<Badge key={index} variant="secondary">{tag}</Badge>))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-black/50 backdrop-blur-md border border-white/20 text-white">
        {ticket && (
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-4">
              <span className="text-3xl">{TICKET_CATEGORIES[ticket.category].icon}</span>
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold">{ticket.id}</span>
                  <CombinedTicketBadge status={ticket.status} priority={ticket.priority} />
                </div>
                <p className="text-lg text-gray-300 font-normal">{ticket.title}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
        )}
        <div className="max-h-[80vh] overflow-y-auto p-2">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailModal;