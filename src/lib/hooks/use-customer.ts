import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import type { TCustomerFormData } from '../validators/customer.schema';

export interface Customer {
    customer_id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    created_at: string;
}

export function useCustomers(search?: string, page?: string) {
    const queryParams = new URLSearchParams();
    if (search) queryParams.set('search', search);
    if (page) queryParams.set('page', page.toString());

    const query = queryParams.toString();

    return useQuery<{ customers: Customer[]; total: number }>({
        queryKey: ['customers', search, page],
        queryFn: () => api.get(`/customers${query ? `?${query}` : ''}`),
    });
}

export function useCreateCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TCustomerFormData) => api.post<Customer>('/customers', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
}
