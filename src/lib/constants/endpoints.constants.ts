export const ENDPOINTS = {
    auth: {
        signUp: '/auth/sign-up',
        signIn: '/auth/login',
        verifyOtp: '/auth/otp/verify',
        resendOtp: '/auth/otp/resend',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
    },
} as const;
