import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  sendSignupOtp: (email: string) => Promise<{ error: string | null }>;
  verifySignupOtp: (email: string, token: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithOtp: (email: string) => Promise<{ error: string | null }>;
  verifyOtp: (email: string, token: string) => Promise<{ error: string | null }>;
  signInWithInstagram: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name,
          full_name: name,
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { error: 'This email is already registered. Please log in instead.' };
      }
      return { error: error.message };
    }

    return { error: null };
  };

  const sendSignupOtp = async (email: string) => {
    // Send OTP to email for verification before signup
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Allow creating user via OTP
      }
    });

    if (error) {
      if (error.message.includes('rate limit')) {
        return { error: 'Too many requests. Please wait a moment and try again.' };
      }
      return { error: error.message };
    }

    return { error: null };
  };

  const verifySignupOtp = async (email: string, token: string, password: string, name: string) => {
    // Verify the OTP first
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (verifyError) {
      if (verifyError.message.includes('Token has expired')) {
        return { error: 'Verification code has expired. Please request a new one.' };
      }
      if (verifyError.message.includes('Invalid')) {
        return { error: 'Invalid verification code. Please try again.' };
      }
      return { error: verifyError.message };
    }

    // OTP verified, now update the user with password and metadata
    if (data.user) {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
        data: {
          name,
          full_name: name,
        }
      });

      if (updateError) {
        return { error: updateError.message };
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Directly sign in with password - no OTP step needed for password login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Invalid email or password. Please try again.' };
      }
      return { error: error.message };
    }

    return { error: null };
  };

  const signInWithOtp = async (email: string) => {
    // Send OTP email using Supabase's built-in email service
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Don't create user, just send OTP for existing user
      }
    });

    if (error) {
      if (error.message.includes('rate limit')) {
        return { error: 'Too many requests. Please wait a moment and try again.' };
      }
      return { error: error.message };
    }

    return { error: null };
  };

  const verifyOtp = async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      if (error.message.includes('Token has expired')) {
        return { error: 'Verification code has expired. Please request a new one.' };
      }
      if (error.message.includes('Invalid')) {
        return { error: 'Invalid verification code. Please try again.' };
      }
      return { error: error.message };
    }

    return { error: null };
  };

  const signInWithInstagram = async () => {
    // Note: Instagram OAuth requires configuration in Supabase dashboard
    // For now, we'll use a placeholder that shows the user needs to configure it
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook', // Instagram uses Facebook OAuth
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        scopes: 'instagram_basic,instagram_content_publish,instagram_manage_messages',
      }
    });

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      signUp,
      sendSignupOtp,
      verifySignupOtp,
      signIn,
      signInWithOtp,
      verifyOtp,
      signInWithInstagram,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
