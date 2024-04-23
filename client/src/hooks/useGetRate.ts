import { useQuery } from '@tanstack/react-query';

import { getRate } from '@/api/requests/rates';

interface UseRateParams {
    currency: string;
}

export const useGetRate = ({ currency }: UseRateParams) => {
    const rateQuery = useQuery({
        queryKey: ['rate', currency],
        queryFn: async () => await getRate({ params: { currency } }),
    });

    return {
        state: rateQuery.data?.data.rate,
        query: rateQuery,
    };
};
