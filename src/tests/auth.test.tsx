import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { AuthProvider } from '../contexts/AuthContext';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Authentication Pages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Login Page', () => {
    it('renders login form correctly', () => {
      renderWithProviders(<Login />);
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByText('Sign in to your ZenYukti account')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('shows demo credentials', () => {
      renderWithProviders(<Login />);
      
      expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
      expect(screen.getByText(/user@example.com/)).toBeInTheDocument();
      expect(screen.getByText(/password123/)).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
      renderWithProviders(<Login />);
      
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('shows validation error for invalid email', async () => {
      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('Enter your email');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });
  });

  describe('Signup Page', () => {
    it('renders signup form correctly', () => {
      renderWithProviders(<Signup />);
      
      expect(screen.getByText('Join ZenYukti')).toBeInTheDocument();
      expect(screen.getByText('Create your account and start your journey')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Create a strong password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
    });

    it('disables submit button when terms are not accepted', () => {
      renderWithProviders(<Signup />);
      
      const submitButton = screen.getByRole('button', { name: /create account/i });
      expect(submitButton).toBeDisabled();
    });

    it('shows validation errors for empty fields', async () => {
      renderWithProviders(<Signup />);
      
      // Accept terms to enable the button
      const termsCheckbox = screen.getByRole('checkbox');
      fireEvent.click(termsCheckbox);
      
      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('shows password validation errors', async () => {
      renderWithProviders(<Signup />);
      
      const passwordInput = screen.getByPlaceholderText('Create a strong password');
      const termsCheckbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.click(termsCheckbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Password must contain at least one lowercase letter, one uppercase letter, and one number/)).toBeInTheDocument();
      });
    });

    it('shows password mismatch error', async () => {
      renderWithProviders(<Signup />);
      
      const passwordInput = screen.getByPlaceholderText('Create a strong password');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
      const termsCheckbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      fireEvent.change(passwordInput, { target: { value: 'Password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'Different123' } });
      fireEvent.click(termsCheckbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      });
    });
  });
});