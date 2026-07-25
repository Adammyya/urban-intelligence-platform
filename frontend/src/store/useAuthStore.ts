import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'Operator' | 'Analyst' | 'Dispatcher' | 'Administrator';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  avatarUrl: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const mockUser: User = {
  id: 'usr_synapse_001',
  name: 'Alex Mercer',
  email: 'admin@synapse.os',
  role: 'Administrator',
  department: 'Central Command',
  avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Mercer&background=00f0ff&color=050505'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const API_URL = import.meta.env.VITE_CORE_API_URL || 'http://localhost:8080';
          const res = await fetch(`${API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          
          const data = await res.json();
          
          if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
          }

          set({ 
            isAuthenticated: true, 
            user: data.user, 
            isLoading: false,
            token: data.token
          });
        } catch (err: any) {
          set({ 
            error: err.message,
            isLoading: false 
          });
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'synapse-auth-storage',
    }
  )
);
