import type { Metadata } from 'next';

import { SignUp } from '@/lib/components/auth/sign-up.component';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create a new account to get started',
};

export default function SignUpPage() {
    return <SignUp />;
}
