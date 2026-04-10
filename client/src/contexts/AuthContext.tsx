import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, LoginCredentials, RegisterData, User, ApiResponse } from '../types/portal';

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Mock API functions - replace with actual API calls
  const mockLogin = async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      const user: User = {
        id: '1',
        email: credentials.email,
        firstName: 'Demo',
        lastName: 'User',
        company: 'Demo Company',
        phone: '+1-305-555-0123',
        subscriptionStatus: 'active',
        subscriptionPlan: 'IT Solutions Pro',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      return { success: true, data: user };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const mockRegister = async (data: RegisterData): Promise<ApiResponse<User>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user creation
    const user: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      phone: data.phone,
      subscriptionStatus: 'inactive',
      createdAt: new Date().toISOString(),
    };
    
    return { success: true, data: user };
  };

  const mockRefreshUser = async (): Promise<ApiResponse<User>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return { success: false, error: 'No token found' };
    }
    
    // Mock user data
    const user: User = {
      id: '1',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      company: 'Demo Company',
      phone: '+1-305-555-0123',
      subscriptionStatus: 'active',
      subscriptionPlan: 'IT Solutions Pro',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    
    return { success: true, data: user };
  };

  // Auth functions
  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await mockLogin(credentials);
      
      if (response.success && response.data) {
        // Store token in localStorage (mock)
        localStorage.setItem('auth_token', 'mock_jwt_token');
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.error || 'Login failed' });
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Network error occurred' });
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await mockRegister(data);
      
      if (response.success && response.data) {
        // Store token in localStorage (mock)
        localStorage.setItem('auth_token', 'mock_jwt_token');
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.error || 'Registration failed' });
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Network error occurred' });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('auth_token');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const refreshUser = async (): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await mockRefreshUser();
      
      if (response.success && response.data) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: response.error || 'Failed to refresh user' });
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Network error occurred' });
      localStorage.removeItem('auth_token');
    }
  };

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      refreshUser();
    } else {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  }, []);

  const contextValue: AuthContextType = {
    authState,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;