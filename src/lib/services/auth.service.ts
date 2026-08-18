'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { api } from '@/lib/config/api.config';
import { ENDPOINTS } from '@/lib/constants/endpoints.constants';
import type {
    TForgotPasswordFormData,
    TOtpVerificationFormData,
    TResetPasswordFormData,
    TSignInFormData,
    TSignUpFormData,
} from '@/lib/schemas/auth.schemas';
import { useAuthStore } from '@/lib/stores/auth.store';
import type { TOtpVerifyResponse, TSignInResponse, TSignUpResponse, TUser } from '@/lib/types';
import { clearAuthCookies, writeAuthCookies } from '@/lib/utils';

export const useSignIn = () => {
    const router = useRouter();
    const { setUser } = useAuthStore();
    return useMutation({
        mutationFn: (payload: TSignInFormData) =>
            api.post<TSignInResponse>(ENDPOINTS.auth.signIn, payload),
        onSuccess: ({ data, message }) => {
            writeAuthCookies(data);
            setUser(data.user);
            toast.success(message);
            router.replace('/dashboard');
        },
        onError: (error) => toast.error(error.message),
    });
};

export const useSignUp = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (payload: TSignUpFormData) => api.post<TUser>(ENDPOINTS.auth.signUp, payload),
        onSuccess: ({ data, message }) => {
            toast.success(message);
            console.log(data);
            router.replace(`/otp-verification?email=${encodeURIComponent(data.email)}`);
        },
        onError: (error) => toast.error(error.message),
    });
};

export const useVerifyOtp = (email: string | null) => {
    const router = useRouter();
    const { setUser } = useAuthStore();
    return useMutation({
        mutationFn: (payload: TOtpVerificationFormData) =>
            api.post<TOtpVerifyResponse>(ENDPOINTS.auth.verifyOtp, { ...payload, email }),
        onSuccess: ({ data, message }) => {
            writeAuthCookies(data);
            setUser(data.user);
            toast.success(message);
            router.replace('/dashboard');
        },
        onError: (error) => toast.error(error.message),
    });
};

export const useResendOtp = () =>
    useMutation({
        mutationFn: () => api.post(ENDPOINTS.auth.resendOtp, {}),
        onSuccess: ({ message }) => toast.success(message),
        onError: (error) => toast.error(error.message),
    });

export const useForgotPassword = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (payload: TForgotPasswordFormData) =>
            api.post(ENDPOINTS.auth.forgotPassword, payload),
        onSuccess: ({ message }) => {
            toast.success(message);
            router.replace('/sign-in');
        },
        onError: (error) => toast.error(error.message),
    });
};

export const useResetPassword = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: (payload: TResetPasswordFormData) =>
            api.post(ENDPOINTS.auth.resetPassword, payload),
        onSuccess: ({ message }) => {
            toast.success(message);
            router.replace('/sign-in');
        },
        onError: (error) => toast.error(error.message),
    });
};

export const useSignOut = () => {
    const router = useRouter();
    const { signOut } = useAuthStore();
    return () => {
        clearAuthCookies();
        signOut();
        router.replace('/sign-in');
    };
};
