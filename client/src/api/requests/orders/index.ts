import { api } from 'api/axios/instance';

export type CreateOrdereRequestConfig = RequestConfig<CreateOrderDto>;

export const createOrder = ({ params, config }: CreateOrdereRequestConfig) =>
    api.post<CreateOrderResponse>(`/orders`, params, config);
