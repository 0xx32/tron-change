import { Hono } from 'hono';
import { vValidator } from '@hono/valibot-validator';

import { prisma } from 'database/db';
import { addressValidation } from 'tron-web/helpers/addressValidation';
import { createOrderShema } from 'valibot/order.shemas';

import CryptoCloudSDK from 'payments-modules/crypto-cloud/crypto-cloud-sdk';
import { CallbackResponse } from 'payments-modules/crypto-cloud/crypto-cloud.types';

const CRYPTOMUS_IP = '91.227.144.54';

const orders = new Hono();

const CryptoCloud = new CryptoCloudSDK(process.env.CRYPTO_CLOUD_API_KEY!);

orders.post('/', vValidator('json', createOrderShema), async (ctx) => {
    const orderDto = ctx.req.valid('json');

    if (!orderDto.amount) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Не указанно количество trx' });
    }
    if (!orderDto.address) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Не указан адрес' });
    }
    if (!addressValidation(orderDto.address)) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Некорректный адрес' });
    }

    const order = await prisma.order.create({
        data: {
            amount: orderDto.amount,
            address: orderDto.address,
            currency: orderDto.currency,
            network: orderDto.network,
            status: 'creating',
        },
    });

    const invoice = await CryptoCloud.createInvoice({
        amount: order.amount,
        currency: order.currency,
        order_id: order.id.toString(),
        shop_id: process.env.CRYPTO_CLOUD_SHOP_ID!,
    });

    await prisma.payment.create({
        data: {
            uuid: invoice.result.uuid,
            status: invoice.result.status,
            invoice_id: invoice.result.invoice_id,
            amount: invoice.result.amount,
            created: invoice.result.created,
            fee: invoice.result.fee,
            payment_link: invoice.result.link,
            orderId: order.id,
        },
    });

    const paymentUrl = invoice.result.link;

    return ctx.json({ success: true, message: 'Заказ успешно создан', paymentUrl: paymentUrl });
});

export { orders };
