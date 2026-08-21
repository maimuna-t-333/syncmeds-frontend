import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { queryClient } from '../api/query-client';

function setCookies(name:string, value:string, days:number=1){
    const expires=new Date();
    expires.setTime(expires.getTime()+days * 24 * 60 * 60 * 1000);
    document.cookie=`${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function deleteCookie(name:string){
    document.cookie=`${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

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
                setCookies('syncmeds-auth-token',token,1);
                set({ token, user, isAuthenticated: true });
            },
            logout: () => {
                deleteCookie('syncmeds-auth-token');
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
