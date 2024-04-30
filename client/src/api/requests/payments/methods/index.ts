import { api } from 'api/axios/instance';

export type GetPaymentMethodsRequestConfig = RequestConfig;

export const getPaymentMethods = ({ config }: GetPaymentMethodsRequestConfig) =>
    api.get<PaymentMethodsResponse>(`/payments/methods`, config);
