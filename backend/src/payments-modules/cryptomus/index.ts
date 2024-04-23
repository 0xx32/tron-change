import { prisma } from 'database/db';
import { sendPayment } from './requests';
import { CRYPTOMUS_MERCHANT_ID } from './constants';
import { generateSignKey } from './helpers/generateSignKey';

interface CreatePayment extends CreateOrderDto {}

class Cryptomus {
    constructor() {}

    async createPayment(orderId: number, paymentParams: CreatePayment) {
        const data = { order_id: orderId.toString(), url_callback: 'https://example.com', ...paymentParams };
        const sign = generateSignKey(data);
        const responsePayment = await sendPayment({
            params: data,
            config: {
                headers: {
                    merchant: CRYPTOMUS_MERCHANT_ID,
                    sign,
                },
            },
        });
        if (!responsePayment) return;

        await prisma.payment.create({
            data: {
                orderId,
                amount: responsePayment.result.amount,
                status: responsePayment.result.payment_status,
                cryptomus_orderId: responsePayment.result.order_id,
                isFinal: responsePayment.result.is_final,
                uuid: responsePayment.result.uuid,
                sign,
            },
        });

        return responsePayment.result;
    }
}

export default new Cryptomus();
