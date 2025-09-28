import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { TicketCard } from './TicketCard';
import { TicketStatusBadge, TicketPriorityBadge } from './TicketStatusBadge';
import { useTickets } from '../../../hooks/useTickets';
import PortalLayout from '../PortalLayout';
import { 
  Ticket, 
  TicketFilters, 
  TicketSortOptions, 
  TicketStatus, 
  TicketPriority, 
  TicketCategory,
  TICKET_CATEGORIES,
  TICKET_STATUSES,
  TICKET_PRIORITIES 
} from '../../../types/tickets';

type ViewMode = 'cards' | 'table' | 'compact';

const TicketList: React.FC = () => {
  const { fetchTickets, stats, loading, error } = useTickets();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TicketFilters>({});
  const [sortOptions, setSortOptions] = useState<TicketSortOptions>({
    field: 'updatedAt',
    direction: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    loadTickets();
  }, [filters, sortOptions, currentPage]);

  useEffect(() => {
    applySearchFilter();
  }, [searchQuery, tickets]);

  const loadTickets = async () => {
    try {
      const response = await fetchTickets(filters, sortOptions, currentPage, itemsPerPage);
      setTickets(response.tickets);
      setTotalTickets(response.total);
    } catch (err) {
      console.error('Failed to load tickets:', err);
    }
  };

  const applySearchFilter = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredTickets(tickets);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query) ||
      ticket.id.toLowerCase().includes(query) ||
      ticket.assignedToName?.toLowerCase().includes(query)
    );
    setFilteredTickets(filtered);
  }, [searchQuery, tickets]);

  const handleFilterChange = (key: keyof TicketFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (field: TicketSortOptions['field']) => {
    setSortOptions(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  const getActiveFilterCount = (): number => {
    let count = 0;
    if (filters.status?.length) count++;
    if (filters.priority?.length) count++;
    if (filters.category?.length) count++;
    if (filters.dateRange) count++;
    if (searchQuery.trim()) count++;
    return count;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (field: TicketSortOptions['field']): string => {
    if (sortOptions.field !== field) return '↕️';
    return sortOptions.direction === 'asc' ? '↑' : '↓';
  };

  const totalPages = Math.ceil(totalTickets / itemsPerPage);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">
              Manage and track your IT support requests
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/portal/tickets/new">
              <Button>
                <span className="mr-2">🎫</span>
                Create Ticket
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <span className="text-2xl">📊</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Open</p>
                    <p className="text-2xl font-bold text-blue-400">{stats.open}</p>
                  </div>
                  <span className="text-2xl">🆕</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">In Progress</p>
                    <p className="text-2xl font-bold text-purple-400">{stats.inProgress}</p>
                  </div>
                  <span className="text-2xl">⚡</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-md border border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Resolved</p>
                    <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
                  </div>
                  <span className="text-2xl">✅</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Controls */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search tickets by title, description, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="bg-transparent text-white border-white/50 hover:bg-white/10"
                >
                  📋
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="bg-transparent text-white border-white/50 hover:bg-white/10"
                >
                  📊
                </Button>
                <Button
                  variant={viewMode === 'compact' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('compact')}
                  className="bg-transparent text-white border-white/50 hover:bg-white/10"
                >
                  📝
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative bg-transparent text-white border-white/50 hover:bg-white/10"
              >
                🔍 Filters
                {getActiveFilterCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-white/20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <div className="space-y-2">
                      {Object.entries(TICKET_STATUSES).map(([key, _status]) => (
                        <label key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.status?.includes(key as TicketStatus) || false}
                            onChange={(e) => {
                              const currentStatuses = filters.status || [];
                              const newStatuses = e.target.checked
                                ? [...currentStatuses, key as TicketStatus]
                                : currentStatuses.filter(s => s !== key);
                              handleFilterChange('status', newStatuses.length > 0 ? newStatuses : undefined);
                            }}
                          />
                          <TicketStatusBadge status={key as TicketStatus} size="sm" />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Priority Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Priority
                    </label>
                    <div className="space-y-2">
                      {Object.entries(TICKET_PRIORITIES).map(([key, _priority]) => (
                        <label key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.priority?.includes(key as TicketPriority) || false}
                            onChange={(e) => {
                              const currentPriorities = filters.priority || [];
                              const newPriorities = e.target.checked
                                ? [...currentPriorities, key as TicketPriority]
                                : currentPriorities.filter(p => p !== key);
                              handleFilterChange('priority', newPriorities.length > 0 ? newPriorities : undefined);
                            }}
                          />
                          <TicketPriorityBadge priority={key as TicketPriority} size="sm" />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <div className="space-y-2">
                      {Object.entries(TICKET_CATEGORIES).map(([key, category]) => (
                        <label key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.category?.includes(key as TicketCategory) || false}
                            onChange={(e) => {
                              const currentCategories = filters.category || [];
                              const newCategories = e.target.checked
                                ? [...currentCategories, key as TicketCategory]
                                : currentCategories.filter(c => c !== key);
                              handleFilterChange('category', newCategories.length > 0 ? newCategories : undefined);
                            }}
                          />
                          <span className="text-sm flex items-center space-x-1">
                            <span>{category.icon}</span>
                            <span>{category.label}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-gray-400">
                    {getActiveFilterCount()} filter(s) active
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="bg-transparent text-white border-white/50 hover:bg-white/10">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading tickets...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-red-900/30 border-red-500/50">
            <CardContent className="p-4">
              <p className="text-red-300">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Tickets Display */}
        {!loading && !error && (
          <>
            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Showing {filteredTickets.length} of {totalTickets} tickets
              </p>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSortChange('updatedAt')}
                  className="text-xs text-gray-300 hover:text-white"
                >
                  Updated {getSortIcon('updatedAt')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSortChange('priority')}
                  className="text-xs text-gray-300 hover:text-white"
                >
                  Priority {getSortIcon('priority')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSortChange('createdAt')}
                  className="text-xs text-gray-300 hover:text-white"
                >
                  Created {getSortIcon('createdAt')}
                </Button>
              </div>
            </div>

            {/* Tickets List */}
            {filteredTickets.length > 0 ? (
              <div className="space-y-4">
                {viewMode === 'table' ? (
                  <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-white/5 border-b border-white/20">
                            <tr>
                              <th className="text-left p-4 font-medium text-white">Ticket</th>
                              <th className="text-left p-4 font-medium text-white">Status</th>
                              <th className="text-left p-4 font-medium text-white">Priority</th>
                              <th className="text-left p-4 font-medium text-white">Category</th>
                              <th className="text-left p-4 font-medium text-white">Updated</th>
                              <th className="text-left p-4 font-medium text-white">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTickets.map((ticket) => (
                              <tr key={ticket.id} className="border-b border-white/20 hover:bg-white/5">
                                <td className="p-4">
                                  <div>
                                    <Link 
                                      href={`/portal/tickets/${ticket.id}`}
                                      className="font-medium text-primary hover:underline"
                                    >
                                      {ticket.id}
                                    </Link>
                                    <p className="text-sm text-gray-400 truncate max-w-xs">
                                      {ticket.title}
                                    </p>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <TicketStatusBadge status={ticket.status} size="sm" />
                                </td>
                                <td className="p-4">
                                  <TicketPriorityBadge priority={ticket.priority} size="sm" />
                                </td>
                                <td className="p-4">
                                  <span className="text-sm">
                                    {TICKET_CATEGORIES[ticket.category].icon} {TICKET_CATEGORIES[ticket.category].label}
                                  </span>
                                </td>
                                <td className="p-4 text-sm text-gray-400">
                                  {formatDate(ticket.updatedAt)}
                                </td>
                                <td className="p-4">
                                  <Link href={`/portal/tickets/${ticket.id}`}>
                                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                      View
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredTickets.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        variant={viewMode === 'compact' ? 'compact' : 'default'}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="bg-transparent text-white border-white/50 hover:bg-white/10"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="bg-transparent text-white border-white/50 hover:bg-white/10"
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="bg-transparent text-white border-white/50 hover:bg-white/10"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🎫</div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {getActiveFilterCount() > 0 ? 'No tickets match your filters' : 'No tickets yet'}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {getActiveFilterCount() > 0 
                      ? 'Try adjusting your search criteria or clearing filters.'
                      : 'Create your first support ticket to get started.'
                    }
                  </p>
                  {getActiveFilterCount() > 0 ? (
                    <Button variant="outline" onClick={clearFilters} className="bg-transparent text-white border-white/50 hover:bg-white/10">
                      Clear Filters
                    </Button>
                  ) : (
                    <Link href="/portal/tickets/new">
                      <Button>
                        Create Your First Ticket
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </PortalLayout>
  );
};

export default TicketList;