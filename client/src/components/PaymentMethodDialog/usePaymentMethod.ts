import { getPaymentMethods } from '@/api/requests/payments/methods';
import { useQuery } from '@tanstack/react-query';

export const usePaymentMethod = () => {
    const paymentMethodQuery = useQuery({
        queryKey: ['payment-methods'],
        queryFn: () => getPaymentMethods({}),
        select: (data) => data.data.methods,
    });

    return {
        state: {
            paymentMethods: paymentMethodQuery.data,
        },
        query: paymentMethodQuery,
    };
};
