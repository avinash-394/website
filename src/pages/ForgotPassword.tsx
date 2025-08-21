import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, isLoading, error, clearError, isAuthenticated } = useAuth();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState('');

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when form values change
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [form.watch(), clearError, error]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setEmailSent(data.email);
      setIsSubmitted(true);
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = async () => {
    if (emailSent) {
      try {
        await resetPassword(emailSent);
      } catch (err) {
        // Error is handled by the auth context
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
                <span className="text-foreground">Check Your </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">Email</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                We've sent you a password reset link
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-card">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Email Sent Successfully
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  We've sent a password reset link to <strong>{emailSent}</strong>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Please check your email and click the reset link to create a new password.
                    The link will expire in 15 minutes.
                  </p>
                  
                  <div className="text-sm text-muted-foreground">
                    Didn't receive the email? Check your spam folder or{' '}
                    <Button
                      variant="link"
                      className="h-auto p-0 text-primary hover:text-primary/80"
                      onClick={handleResendEmail}
                      disabled={isLoading}
                    >
                      resend the email
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleBackToLogin}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              <span className="text-foreground">Forgot </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Password?</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              No worries! Enter your email and we'll send you a reset link
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-foreground">
                Reset Password
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Enter the email address associated with your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email address"
                              className="pl-10 bg-background border-border focus:border-primary focus:ring-primary"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Reset Link...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-4 h-4 mr-2" />
                        Send Reset Link
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Remember your password?{' '}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Demo Mode:</strong> In a real application, this would send an actual email with a password reset link.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;