import type { Metadata } from 'next';
import { Suspense } from 'react';

import { OtpVerification } from '@/lib/components/auth/otp-verification.component';

export const metadata: Metadata = {
    title: 'Verify Email',
    description: 'Enter the verification code sent to your email',
};

export default function OtpVerificationPage() {
    return (
        <Suspense>
            <OtpVerification />
        </Suspense>
    );
}
