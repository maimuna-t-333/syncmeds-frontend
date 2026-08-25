import z from "zod";

export const customerSchema=z.object({
    name:z.string().min(1,'Name is required'),
    email:z.string().email('Invalid email address'),
    phone:z.string().min(10, 'Phone number must be at least 10 digits'),
    address:z.string().optional(),
});

export type TCustomerFormData=z.infer<typeof customerSchema>;