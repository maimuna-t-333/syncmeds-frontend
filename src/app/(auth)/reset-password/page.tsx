import type { Metadata } from 'next';

import { ResetPassword } from '@/lib/components/auth/reset-password.component';

export const metadata: Metadata = {
    title: 'Reset Password',
    description: 'Set a new password for your account',
};

export default function ResetPasswordPage() {
    return <ResetPassword />;
}
