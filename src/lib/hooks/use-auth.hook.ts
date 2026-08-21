import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/stores/auth-store';
import { api } from '../api/client';
import type { TLoginFormData } from '../validators/auth.schema';

interface LoginResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export function useLogin() {
    const { login: storeLogin } = useAuthStore();
    return useMutation({
        mutationKey: ['auth', 'login'],
        mutationFn: async (data: TLoginFormData) => {
            const response = await api.post<LoginResponse>('/auth/login', data);
            return response;
        },
        onSuccess: (data) => {
            storeLogin(data.access_token, data.user);
        },
    });
}

export function useLogout() {
    const { logout } = useAuthStore();
    return logout;
}
