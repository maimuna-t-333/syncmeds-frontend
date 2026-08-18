'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuth } from '@/lib/hooks';
import { editProfileSchema, type TEditProfileFormData } from '@/lib/schemas';
import { useAuthStore } from '@/lib/stores';
import { Avatar, Button, Input } from '@/lib/ui';

export const EditProfileForm = () => {
    const { user } = useAuth();
    const setUser = useAuthStore((s) => s.setUser);

    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm<TEditProfileFormData>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
        },
    });

    const onSubmit = (data: TEditProfileFormData) => {
        if (!user) return;
        setUser({ ...user, ...data });
        toast.success('Profile updated');
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Avatar name={user?.name ?? 'User'} size="xl" />
                <div>
                    <p className="font-semibold text-body-l text-foreground">
                        {user?.name ?? 'User'}
                    </p>
                    <p className="text-body-m text-muted-foreground">{user?.email ?? ''}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    control={control}
                    name="name"
                    label="Full name"
                    placeholder="Your full name"
                    leftIcon={<User className="size-4" />}
                />
                <Input
                    control={control}
                    name="email"
                    label="Email address"
                    placeholder="your@email.com"
                    leftIcon={<Mail className="size-4" />}
                />
                <div className="pt-2">
                    <Button
                        type="submit"
                        label="Save changes"
                        size="md"
                        fullWidth={false}
                        disabled={!isDirty}
                    />
                </div>
            </form>
        </div>
    );
};
