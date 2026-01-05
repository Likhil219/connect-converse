import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
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

  const signIn = async (email: string, password: string) => {
    // First verify credentials with password
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
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false, // Don't create user, just verify existing
      }
    });

    if (error) {
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
