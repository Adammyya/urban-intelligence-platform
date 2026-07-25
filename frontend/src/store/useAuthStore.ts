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
        
        // Simulate network latency for a realistic loading state
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email === 'admin@synapse.os' && password === 'admin') {
          set({
            isAuthenticated: true,
            user: mockUser,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token.signature',
            isLoading: false,
          });
        } else {
          set({
            error: 'Invalid credentials. Access denied.',
            isLoading: false,
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
