'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { signInFormSchema, type TSignInForm } from '@/lib/schemas/auth.schemas';
import { useSignIn } from '@/lib/services';
import { Button, Checkbox, GoogleIcon, Input } from '@/lib/ui';

import { AuthLayout } from './auth-layout.component';

export const SignIn = () => {
    const { mutateAsync: signIn, isPending } = useSignIn();

    const form = useForm<TSignInForm>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: { email: '', password: '', rememberMe: false },
    });

    const onSubmit = async ({ email, password }: TSignInForm) => {
        await signIn({ email, password });
    };

    return (
        <AuthLayout
            title="Start Your Journey with Us"
            description="We're crafting an attractive UI UX Design that can solve problems"
        >
            <header className="mb-12">
                <h2 className="font-bold text-[32px] leading-none text-foreground">Welcome Back</h2>
                <p className="mt-2 text-body-m text-secondary-foreground">
                    Sign in to your account
                </p>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <Input
                        control={form.control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="domat@example.com"
                        leftIcon={<Mail className="size-4" />}
                    />
                    <Input
                        control={form.control}
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        leftIcon={<Lock className="size-4" />}
                    />
                    <div className="flex items-center justify-between">
                        <Checkbox control={form.control} name="rememberMe" label="Remember me" />
                        <Link
                            href="/forgot-password"
                            className="text-body-m font-medium text-primary"
                        >
                            Forgot Password
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Button type="submit" label="Sign in" loading={isPending} />
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-body-m text-secondary-foreground">or</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        label="Sign in with Google"
                        leftIcon={<GoogleIcon />}
                    />
                </div>

                <p className="text-center text-body-m text-secondary-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up" className="font-medium text-primary">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
