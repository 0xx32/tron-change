import { useQuery } from '@tanstack/react-query';

export const useSuccessPayment = (orderId: string) => {
    const successPaymentQuery = useQuery({
        queryKey: ['success-payment', orderId],
        queryFn: async () => {},
    });

    return {
        state: successPaymentQuery.data,
    };
};
