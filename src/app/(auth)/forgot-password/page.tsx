import type { Metadata } from 'next';

import { ForgotPassword } from '@/lib/components/auth/forgot-password.component';

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Request a password reset link for your account',
};

export default function ForgotPasswordPage() {
    return <ForgotPassword />;
}
