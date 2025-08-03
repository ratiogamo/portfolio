import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Alert, AlertDescription } from '../../ui/alert';
import AuthLayout from './AuthLayout';

const RegisterForm: React.FC = () => {
  const [, setLocation] = useLocation();
  const { authState, register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (!acceptTerms) {
      return;
    }
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      // Redirect to portal dashboard on successful registration
      setLocation('/portal/dashboard');
    } catch (error) {
      // Error is handled by the auth context
      console.error('Registration error:', error);
    }
  };

  const isFormValid = 
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    acceptTerms;

  const passwordsMatch = formData.password === formData.confirmPassword || !formData.confirmPassword;

  return (
    <AuthLayout 
      title="Create your account"
      subtitle="Get started with our IT solutions"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Error Alert */}
        {authState.error && (
          <Alert variant="destructive">
            <AlertDescription>{authState.error}</AlertDescription>
          </Alert>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="First name"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Last name"
            />
          </div>
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

        {/* Company Field */}
        <div>
          <Label htmlFor="company">Company (optional)</Label>
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="Your company name"
          />
        </div>

        {/* Phone Field */}
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="Your phone number"
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
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
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

        {/* Confirm Password Field */}
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`mt-1 ${!passwordsMatch ? 'border-red-500' : ''}`}
            placeholder="Confirm your password"
          />
          {!passwordsMatch && (
            <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            id="accept-terms"
            name="accept-terms"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <Label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary/80">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary/80">
              Privacy Policy
            </a>
          </Label>
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
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/portal/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;