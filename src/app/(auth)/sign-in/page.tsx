import type { Metadata } from 'next';
import { SignIn } from '@/lib/components/auth/sign-in.component';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account',
};

export default function SignInPage() {
    return <SignIn />;
}
