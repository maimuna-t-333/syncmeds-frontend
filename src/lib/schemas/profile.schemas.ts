import { z } from 'zod';

export const editProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type TEditProfileFormData = z.infer<typeof editProfileSchema>;
