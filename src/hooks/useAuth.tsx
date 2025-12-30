import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithInstagram: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to store Instagram account after OAuth
const storeInstagramAccount = async (user: User) => {
  const metadata = user.user_metadata;
  const identities = user.identities || [];
  
  // Find Facebook/Instagram identity
  const fbIdentity = identities.find(i => i.provider === 'facebook');
  
  if (!fbIdentity) return;

  const instagramData = {
    user_id: user.id,
    instagram_id: fbIdentity.id,
    username: metadata.name || metadata.full_name || metadata.preferred_username || 'unknown',
    profile_picture_url: metadata.avatar_url || metadata.picture || null,
    access_token: null, // We don't store OAuth tokens for security
    is_connected: true,
  };

  // Check if account already exists
  const { data: existing } = await supabase
    .from('instagram_accounts')
    .select('id')
    .eq('user_id', user.id)
    .eq('instagram_id', fbIdentity.id)
    .single();

  if (existing) {
    // Update existing account
    await supabase
      .from('instagram_accounts')
      .update({
        username: instagramData.username,
        profile_picture_url: instagramData.profile_picture_url,
        is_connected: true,
        last_synced_at: new Date().toISOString(),
      })
      .eq('id', existing.id);
  } else {
    // Insert new account
    await supabase
      .from('instagram_accounts')
      .insert(instagramData);
  }
};

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

        // Store Instagram data after successful OAuth login
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            storeInstagramAccount(session.user);
          }, 0);
        }
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
