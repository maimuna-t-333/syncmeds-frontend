'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { signUpSchema, type TSignUpFormData } from '@/lib/schemas/auth.schemas';
import { useSignUp } from '@/lib/services';
import { Button, GoogleIcon, Input } from '@/lib/ui';

import { AuthLayout } from './auth-layout.component';

export const SignUp = () => {
    const { mutateAsync: signUp, isPending } = useSignUp();

    const form = useForm<TSignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: '', email: '', password: '' },
    });

    const onSubmit = async (data: TSignUpFormData) => {
        await signUp(data);
    };

    return (
        <AuthLayout
            title="Join Us Today & Get Started"
            description="Create your account and start building something great"
        >
            <header className="mb-12">
                <h2 className="font-bold text-[32px] leading-none text-foreground">
                    Create Account
                </h2>
                <p className="mt-2 text-body-m text-secondary-foreground">Sign up to get started</p>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <Input
                        control={form.control}
                        name="name"
                        label="Full Name"
                        placeholder="John Doe"
                        leftIcon={<User className="size-4" />}
                    />
                    <Input
                        control={form.control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="you@example.com"
                        leftIcon={<Mail className="size-4" />}
                    />
                    <Input
                        control={form.control}
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Create a password"
                        leftIcon={<Lock className="size-4" />}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <Button type="submit" label="Create Account" loading={isPending} />
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-body-m text-secondary-foreground">or</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        label="Sign up with Google"
                        leftIcon={<GoogleIcon />}
                    />
                </div>

                <p className="text-center text-body-m text-secondary-foreground">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="font-medium text-primary">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
