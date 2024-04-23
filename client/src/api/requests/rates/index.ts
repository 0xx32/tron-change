import { api } from 'api/axios/instance';

interface GetRatesParams {
    currency: string;
}

export type GetRateRequestConfig = RequestConfig<GetRatesParams>;

export const getRate = ({ params, config }: GetRateRequestConfig) =>
    api.get<RateCurrencyResponse>(`/rates/${params.currency}`, config);
