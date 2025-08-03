import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Alert, AlertDescription } from '../../ui/alert';
import AuthLayout from './AuthLayout';

const LoginForm: React.FC = () => {
  const [, setLocation] = useLocation();
  const { authState, login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData);
      // Redirect to portal dashboard on successful login
      setLocation('/portal/dashboard');
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login error:', error);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <AuthLayout 
      title="Sign in to your account"
      subtitle="Access your IT solutions portal"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Error Alert */}
        {authState.error && (
          <Alert variant="destructive">
            <AlertDescription>{authState.error}</AlertDescription>
          </Alert>
        )}

        {/* Demo Credentials Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-700">
            <strong>Demo Credentials:</strong><br />
            Email: demo@example.com<br />
            Password: password
          </p>
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-1 relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="text-gray-400 hover:text-gray-600">
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </Label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:text-primary/80">
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || authState.isLoading}
          >
            {authState.isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/portal/register" className="font-medium text-primary hover:text-primary/80">
              Sign up for IT solutions
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;