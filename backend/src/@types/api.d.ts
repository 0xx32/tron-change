type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
    ? { config?: ApiRequestConfig }
    : { params: Params; config?: ApiRequestConfig };

type BaseResponse = {
    message: string;
    success: boolean;
};
interface CreateOrderDto {
    amount: string;
    address: string;
    currency: string;
    network: string;
}
