'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { resetPasswordSchema, type TResetPasswordFormData } from '@/lib/schemas/auth.schemas';
import { useResetPassword } from '@/lib/services';
import { Button, Input } from '@/lib/ui';

import { AuthLayout } from './auth-layout.component';

export const ResetPassword = () => {
    const { mutateAsync: resetPassword, isPending } = useResetPassword();

    const form = useForm<TResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: '', confirmPassword: '' },
    });

    const onSubmit = async (data: TResetPasswordFormData) => {
        await resetPassword(data);
    };

    return (
        <AuthLayout
            title="Set a New Password"
            description="Choose a strong password to keep your account secure"
        >
            <header className="mb-12">
                <h2 className="font-bold text-[32px] leading-none text-foreground">
                    Reset Password
                </h2>
                <p className="mt-2 text-body-m text-secondary-foreground">
                    Enter your new password
                </p>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <Input
                        control={form.control}
                        name="password"
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                        leftIcon={<Lock className="size-4" />}
                    />
                    <Input
                        control={form.control}
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm new password"
                        leftIcon={<Lock className="size-4" />}
                    />
                </div>
                <Button type="submit" label="Reset Password" loading={isPending} />
            </form>
        </AuthLayout>
    );
};
