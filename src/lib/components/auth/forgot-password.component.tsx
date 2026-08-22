'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { forgotPasswordSchema, type TForgotPasswordFormData } from '@/lib/schemas/auth.schemas';
import { useForgotPassword } from '@/lib/services';
import { Button, Input } from '@/lib/ui';

import { AuthLayout } from './auth-layout.component';

export const ForgotPassword = () => {
    const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

    const form = useForm<TForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = async (data: TForgotPasswordFormData) => {
        await forgotPassword(data);
    };

    return (
        <AuthLayout
            title="Recover Your Account"
            description="We'll help you get back in with a quick password reset"
        >
            <header className="mb-12">
                <h2 className="font-bold text-[32px] leading-none text-foreground">
                    Forgot Password
                </h2>
                <p className="mt-2 text-body-m text-secondary-foreground">
                    Enter your email to receive a reset link
                </p>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <Input
                    control={form.control}
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    leftIcon={<Mail className="size-4" />}
                />
                <div className="flex flex-col gap-4">
                    <Button type="submit" label="Send Reset Link" loading={isPending} />
                    <p className="text-center text-body-m text-secondary-foreground">
                        <Link href="/login" className="font-medium text-primary">
                            Back to Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};
