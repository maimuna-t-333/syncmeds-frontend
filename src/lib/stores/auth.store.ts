'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AUTH_COOKIE_KEYS, AUTH_STORAGE_KEYS } from '@/lib/constants/auth.constants';
import { cookieStorage } from '@/lib/storages/cookie.storage';
import type { TUser } from '@/lib/types';

type TAuthStore = {
    user: TUser | null;
    isAuthenticated: boolean;
    isHydrated: boolean;

    setUser: (user: TUser | null) => void;
    signOut: () => void;
};

export const useAuthStore = create<TAuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isHydrated: false,

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            signOut: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: AUTH_STORAGE_KEYS.USER,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                state.isHydrated = true;
                if (state.isAuthenticated && !cookieStorage.has(AUTH_COOKIE_KEYS.ACCESS_TOKEN)) {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            },
        }
    )
);
