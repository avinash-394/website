import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { signupSchema, type SignupFormData } from '@/lib/validations/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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

  const onSubmit = async (data: SignupFormData) => {
    if (!acceptTerms) {
      return;
    }
    
    try {
      await signup(data.name, data.email, data.password);
      navigate('/');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
              <span className="text-foreground">Join </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">ZenYukti</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your account and start your journey
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-foreground">
                Create Account
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Fill in your information to get started
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              placeholder="Enter your full name"
                              className="pl-10 bg-background border-border focus:border-primary focus:ring-primary"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10 bg-background border-border focus:border-primary focus:ring-primary"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a strong password"
                              className="pl-10 pr-10 bg-background border-border focus:border-primary focus:ring-primary"
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10 bg-background border-border focus:border-primary focus:ring-primary"
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              disabled={isLoading}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={setAcceptTerms}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      I agree to the{' '}
                      <Link
                        to="/termsofservice"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        to="/privacy"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all"
                    disabled={isLoading || !acceptTerms}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Account
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  By creating an account, you'll be able to join our community,
                  contribute to projects, and access exclusive content.
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

export default Signup;