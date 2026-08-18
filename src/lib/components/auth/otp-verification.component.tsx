'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { RESEND_SECONDS } from '@/lib/constants/settings.constants';
import { otpVerificationSchema, type TOtpVerificationFormData } from '@/lib/schemas/auth.schemas';
import { useResendOtp, useVerifyOtp } from '@/lib/services';
import { Button, OtpInput } from '@/lib/ui';

import { AuthLayout } from './auth-layout.component';

export const OtpVerification = () => {
    const searchParams = useSearchParams();
    const { mutateAsync: verifyOtp, isPending } = useVerifyOtp(searchParams.get('email'));
    const { mutate: resendOtp, isPending: isResending } = useResendOtp();

    const form = useForm<TOtpVerificationFormData>({
        resolver: zodResolver(otpVerificationSchema),
        defaultValues: { otp: '' },
    });

    const [countdown, setCountdown] = useState(RESEND_SECONDS);

    useEffect(() => {
        if (countdown === 0) return;
        const id = setInterval(() => setCountdown((c) => c - 1), 1000);
        return () => clearInterval(id);
    }, [countdown]);

    const onSubmit = async (data: TOtpVerificationFormData) => {
        await verifyOtp(data);
    };

    const handleResend = () => {
        resendOtp();
        setCountdown(RESEND_SECONDS);
    };

    return (
        <AuthLayout
            title="One Step Away"
            description="Verify your email to activate your account and get started"
        >
            <header className="mb-12">
                <h2 className="font-bold text-[32px] leading-none text-foreground">Verify Email</h2>
                <p className="mt-2 text-body-m text-secondary-foreground">
                    Enter the code we sent to your email
                </p>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <OtpInput control={form.control} name="otp" />
                <div className="flex flex-col gap-4">
                    <Button type="submit" label="Verify" loading={isPending} />
                    <div className="flex justify-center">
                        {countdown > 0 ? (
                            <p className="text-body-m text-secondary-foreground">
                                Resend in {countdown}s
                            </p>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isResending}
                                className="text-body-m font-medium text-primary"
                            >
                                Resend code
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};
