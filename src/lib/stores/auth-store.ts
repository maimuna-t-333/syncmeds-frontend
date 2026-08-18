import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { queryClient } from '../api/query-client';

export interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            login: (token, user) => {
                set({ token, user, isAuthenticated: true });
            },
            logout: () => {
                queryClient.clear();
                set({ token: null, user: null, isAuthenticated: false });
                window.location.href = '/login';
            },
        }),
        {
            name: 'syncmeds-auth-storage',
        }
    )
);
