import { cryptomusApi } from 'axios/cryptomus.instance';
import type { CryptomusBaseResponse, RateCurrency } from 'modules/cryptomus/types/cryptomus.interace';

interface GetRatesParams {
    currency: string;
}

export type GetRatesRequestConfig = RequestConfig<GetRatesParams>;

export const getRates = async ({ params, config }: GetRatesRequestConfig) =>
    cryptomusApi.get<CryptomusBaseResponse<RateCurrency[]>>(`/exchange-rate/${params.currency}/list`, config);
