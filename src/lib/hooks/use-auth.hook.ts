'use client';

import { useAuthStore } from '@/lib/stores/auth-store';

export const useAuth = () => ({
    user: useAuthStore((s) => s.user),
    isAuthenticated: useAuthStore((s) => s.isAuthenticated),
    isLoading: !useAuthStore((s) => s.isHydrated),
});
