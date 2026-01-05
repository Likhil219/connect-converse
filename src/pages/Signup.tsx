import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Instagram, Eye, EyeOff, Loader2, Check, ArrowLeft, Mail, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type SignupStep = 'details' | 'verification' | 'welcome';

export default function Signup() {
  const navigate = useNavigate();
  const { sendSignupOtp, verifySignupOtp, signInWithInstagram, user, isLoading: authLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<SignupStep>('details');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if already authenticated (but not during welcome step)
  useEffect(() => {
    if (user && !authLoading && step !== 'welcome') {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate, step]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const passwordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate input
    const validation = signupSchema.safeParse({ name, email, password });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    const { error } = await sendSignupOtp(email);
    setIsSubmitting(false);

    if (error) {
      setError(error);
    } else {
      setStep('verification');
      setResendCooldown(60);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otpCode.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setIsSubmitting(true);
    const { error } = await verifySignupOtp(email, otpCode, password, name);
    setIsSubmitting(false);

    if (error) {
      setError(error);
    } else {
      setStep('welcome');
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    
    setError('');
    setIsSubmitting(true);
    const { error } = await sendSignupOtp(email);
    setIsSubmitting(false);

    if (error) {
      setError(error);
    } else {
      setResendCooldown(60);
      setOtpCode('');
    }
  };

  const handleInstagramSignup = async () => {
    setIsSubmitting(true);
    const { error } = await signInWithInstagram();
    setIsSubmitting(false);

    if (error) {
      setError(error);
    }
  };

  const handleBackToDetails = () => {
    setStep('details');
    setOtpCode('');
    setError('');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Graphic */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 max-w-lg"
        >
          <h2 className="text-4xl font-black mb-6">Start growing on autopilot</h2>
          <ul className="space-y-4">
            {[
              'Automate DMs and capture leads 24/7',
              'Connect multiple Instagram accounts',
              'Build workflows without coding',
              'Track performance with analytics',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Join <span className="text-foreground font-medium">50,000+</span> creators
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md"
            >
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">InstaFlow</span>
              </Link>

              <h1 className="text-3xl font-black mb-2">Create your account</h1>
              <p className="text-muted-foreground mb-8">
                Start your 14-day free trial. No credit card required.
              </p>

              {/* Instagram OAuth */}
              <Button
                variant="outline"
                className="w-full mb-4 h-12"
                onClick={handleInstagramSignup}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Instagram className="w-5 h-5 mr-2" />
                )}
                Sign up with Instagram
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmitDetails} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Full name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            passwordStrength() >= level
                              ? level <= 1
                                ? 'bg-destructive'
                                : level <= 2
                                ? 'bg-warning'
                                : 'bg-success'
                              : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By signing up, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </motion.div>
          )}

          {step === 'verification' && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md"
            >
              {/* Back button */}
              <button
                onClick={handleBackToDetails}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {/* Email icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>

              <h1 className="text-3xl font-black mb-2">Verify your email</h1>
              <p className="text-muted-foreground mb-8">
                We've sent a 6-digit verification code to{' '}
                <span className="font-medium text-foreground">{email}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={(value) => setOtpCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full h-12"
                  disabled={isSubmitting || otpCode.length !== 6}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Verify Email'
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Didn't receive the code?{' '}
                {resendCooldown > 0 ? (
                  <span className="text-muted-foreground">
                    Resend in {resendCooldown}s
                  </span>
                ) : (
                  <button
                    onClick={handleResendCode}
                    disabled={isSubmitting}
                    className="text-primary font-medium hover:underline disabled:opacity-50"
                  >
                    Resend code
                  </button>
                )}
              </p>
            </motion.div>
          )}

          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md text-center"
            >
              {/* Celebration icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow"
              >
                <PartyPopper className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-black mb-2"
              >
                Welcome to InstaFlow!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-8"
              >
                Your account is ready. Let's start automating your Instagram!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="gradient"
                  className="w-full h-12"
                  onClick={handleGoToDashboard}
                >
                  Go to Dashboard
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
