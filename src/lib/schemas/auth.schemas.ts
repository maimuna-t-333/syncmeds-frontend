import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export type TSignInFormData = z.infer<typeof signInSchema>;

export const signInFormSchema = signInSchema.extend({
    rememberMe: z.boolean(),
});

export type TSignInForm = z.infer<typeof signInFormSchema>;

export const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type TSignUpFormData = z.infer<typeof signUpSchema>;

export const otpVerificationSchema = z.object({
    otp: z.string().min(4, 'OTP is required').max(6, 'Invalid OTP'),
});

export type TOtpVerificationFormData = z.infer<typeof otpVerificationSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type TForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type TResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
