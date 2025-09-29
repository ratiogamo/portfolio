import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { FileUpload } from '../shared/FileUpload';
import { TicketPriorityBadge } from './TicketStatusBadge';
import { useTickets } from '../../../contexts/TicketsContext';
import PortalLayout from '../PortalLayout';
import { 
  CreateTicketData, 
  TicketPriority, 
  TicketCategory, 
  TICKET_CATEGORIES, 
  TICKET_PRIORITIES 
} from '../../../types/tickets';

interface FormData {
  title: string;
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
}

interface FormErrors {
  title?: string;
  description?: string;
  priority?: string;
  category?: string;
  general?: string;
}

const CreateTicket: React.FC = () => {
  const [, setLocation] = useLocation();
  const { createTicket, loading } = useTickets();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general_inquiry'
  });
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const ticketData: CreateTicketData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        category: formData.category,
        attachments: selectedFiles.length > 0 ? selectedFiles : undefined
      };

      const newTicket = await createTicket(ticketData);
      
      // Redirect to the new ticket
      setLocation(`/portal/tickets/${newTicket.id}`);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to create ticket. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setLocation('/portal/tickets');
  };

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Create Support Ticket</h1>
            <p className="text-gray-300 mt-1">
              Describe your issue and we'll help you resolve it quickly
            </p>
          </div>
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting} className="bg-transparent text-white border-white/50 hover:bg-white/10">
            Cancel
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-md p-4">
              <p className="text-sm text-red-300">{errors.general}</p>
            </div>
          )}

          {/* Title */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Ticket Title</CardTitle>
              <CardDescription>
                Provide a clear, concise summary of your issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Unable to access email server"
                  className={`w-full px-3 py-2 bg-black/20 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 ${
                    errors.title ? 'border-red-500/50' : 'border-white/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="text-sm text-red-400">{errors.title}</p>
                )}
                <p className="text-xs text-gray-400">
                  {formData.title.length}/100 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg">Category</CardTitle>
                <CardDescription>
                  Select the category that best describes your issue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(TICKET_CATEGORIES).map(([key, category]) => (
                    <label
                      key={key}
                      className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.category === key
                          ? 'border-primary bg-primary/10'
                          : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={key}
                        checked={formData.category === key}
                        onChange={(e) => handleInputChange('category', e.target.value as TicketCategory)}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium">{category.label}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </label>
                  ))}
                  {errors.category && (
                    <p className="text-sm text-red-400">{errors.category}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Priority */}
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg">Priority Level</CardTitle>
                <CardDescription>
                  How urgent is this issue for your business?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(TICKET_PRIORITIES).map(([key, priority]) => (
                    <label
                      key={key}
                      className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.priority === key
                          ? 'border-primary bg-primary/10'
                          : 'border-white/20 hover:border-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={key}
                        checked={formData.priority === key}
                        onChange={(e) => handleInputChange('priority', e.target.value as TicketPriority)}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <TicketPriorityBadge priority={key as TicketPriority} size="sm" />
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {priority.description}
                        </p>
                      </div>
                    </label>
                  ))}
                  {errors.priority && (
                    <p className="text-sm text-red-400">{errors.priority}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Description</CardTitle>
              <CardDescription>
                Provide as much detail as possible about the issue, including steps to reproduce, error messages, and what you've already tried
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Please describe your issue in detail..."
                  rows={6}
                  className={`w-full px-3 py-2 bg-black/20 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500 resize-vertical ${
                    errors.description ? 'border-red-500/50' : 'border-white/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <p className="text-sm text-red-400">{errors.description}</p>
                )}
                <p className="text-xs text-gray-400">
                  {formData.description.length}/2000 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* File Attachments */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Attachments (Optional)</CardTitle>
              <CardDescription>
                Upload screenshots, error logs, or other files that might help us understand the issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                onFileRemove={handleFileRemove}
                selectedFiles={selectedFiles}
                disabled={isSubmitting}
              />
            </CardContent>
          </Card>

          {/* Submit Actions */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  <p>By submitting this ticket, you agree to our support terms.</p>
                  <p className="mt-1">We'll respond within 24 hours during business days.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="bg-transparent text-white border-white/50 hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create Ticket'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Help Section */}
        <Card className="bg-blue-900/30 border-blue-500/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-medium text-blue-200 mb-2">Tips for Better Support</h3>
                <ul className="text-sm text-blue-300 space-y-1">
                  <li>• Include specific error messages if any</li>
                  <li>• Mention what you were doing when the issue occurred</li>
                  <li>• Attach screenshots or relevant files</li>
                  <li>• Let us know if this is affecting multiple users</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
};

export default CreateTicket;