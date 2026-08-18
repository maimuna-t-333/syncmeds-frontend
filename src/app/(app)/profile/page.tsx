import type { Metadata } from 'next';

import { EditProfileForm } from '@/lib/components/profile/edit-profile.component';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Manage your profile information',
};

export default function ProfilePage() {
    return (
        <div className="max-w-lg">
            <div className="mb-8">
                <h1 className="font-bold text-title-l text-foreground">Profile</h1>
                <p className="mt-2 text-body-m text-muted-foreground">
                    Manage your account information.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
                <EditProfileForm />
            </div>
        </div>
    );
}
