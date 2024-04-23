import { cryptomusApi } from 'axios/cryptomus.instance';
import type { PaymentResponse } from 'payments-modules/cryptomus/types';

interface SendPaymentParams extends CreateOrderDto {
    order_id: string;
    url_callback: string;
}

export type PostAuthOptRequestConfig = RequestConfig<SendPaymentParams>;

export const sendPayment = async ({ params, config }: PostAuthOptRequestConfig) => {
    const { data } = await cryptomusApi.post<PaymentResponse>('/payment', params, config);

    return data;
};


