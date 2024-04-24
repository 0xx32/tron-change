type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
    ? { config?: ApiRequestConfig }
    : { params: Params; config?: ApiRequestConfig };

interface BaseResponse {
    message: string;
    success: boolean;
}

interface CreateOrderDto {
    amount: number;
    address: string;
    currency: string;
    network: string;
    paymentAmount: number;
}

interface CreateOrderResponse extends BaseResponse {
    paymentUrl: string;
}

interface RateCurrency {
    from: string;
    to: string;
    course: string;
    minTrx: string;
}
interface RateCurrencyResponse extends BaseResponse {
    rate: RateCurrency;
}
