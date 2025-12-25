import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  connectedAccounts: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginWithInstagram: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (email && password) {
          set({
            user: {
              id: '1',
              name: email.split('@')[0],
              email,
              plan: 'pro',
              connectedAccounts: 2,
            },
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (name && email && password) {
          set({
            user: {
              id: '1',
              name,
              email,
              plan: 'free',
              connectedAccounts: 0,
            },
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      loginWithInstagram: async () => {
        set({ isLoading: true });
        
        // Simulate OAuth flow
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        set({
          user: {
            id: '1',
            name: 'Instagram User',
            email: 'user@instagram.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=instagram',
            plan: 'pro',
            connectedAccounts: 1,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
