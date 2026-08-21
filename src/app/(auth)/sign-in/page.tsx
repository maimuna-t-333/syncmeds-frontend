'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useLogin } from '@/lib/hooks/use-auth.hook';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/form';
import { Input } from '@/lib/ui/input';
import { loginSchema, type TLoginFormData } from '@/lib/validators/auth.schema';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const expired = searchParams.get('expired');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutate: login } = useLogin();

    const form = useForm<TLoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: TLoginFormData) {
        setIsSubmitting(true);

        login(data, {
            onSuccess: () => {
                toast.success('Welcome back!');
                router.push('/dashboard');
            },
            onError: (error) => {
                console.error('Login error:', error);
            },
            onSettled: () => {
                setIsSubmitting(false);
            },
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">SyncMeds Admin</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access the pharmacy management system
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {expired && (
                        <div className="mb-4 p-3 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-md">
                            Your session has expired. Please log in again.
                        </div>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="admin@syncmeds.com"
                                                type="email"
                                                autoComplete="email"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="••••••••"
                                                type="password"
                                                autoComplete="current-password"
                                                disabled={isSubmitting}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
