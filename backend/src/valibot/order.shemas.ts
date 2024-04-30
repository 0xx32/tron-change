import * as v from 'valibot';

export enum PaymentMethodTypes {
    cryptoCloud = 'crypto-cloud',
    cryptoBot = 'crypto-bot',
}

export const createOrderShema = v.object({
    amount: v.number([
        v.minValue(5, 'Минимальное количество trx - 5'),
        v.maxValue(1000, 'Максимальное количество trx - 100'),
    ]),
    address: v.string(),
    currency: v.string(),
    network: v.string(),
    paymentAmount: v.number(),
    paymentMethod: v.enum_(PaymentMethodTypes),
});
