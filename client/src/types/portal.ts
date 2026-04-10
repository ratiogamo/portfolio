// Portal-related TypeScript interfaces

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'past_due';
  subscriptionPlan?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export interface PortalNavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface BillingInfo {
  subscriptionId: string;
  planName: string;
  amount: number;
  currency: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}