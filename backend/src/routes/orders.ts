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

    const payment = await CryptoCloud.createInvoice({
        amount: order.amount,
        currency: order.currency,
        order_id: order.id.toString(),
        shop_id: process.env.CRYPTO_CLOUD_SHOP_ID!,
    });

    const paymentUrl = payment.result.link;

    return ctx.json({ success: true, message: 'Заказ успешно создан', paymentUrl: paymentUrl });
});

orders.post('/payment-callback', async (ctx) => {
    const paymentResponse = await ctx.req.json<CallbackResponse>();
    console.log(paymentResponse);

    // const paymentResponse = await ctx.req.json<OrderInfoWebhook>();

    // const payment = await prisma.payment.findUnique({ where: { uuid: paymentResponse.uuid } });
    // const order = await prisma.order.findUnique({ where: { id: payment?.orderId } });

    // if (payment?.isFinal && order) {
    //     tronWeb.trx.sendTransaction(order?.address, +order.amount);
    // }
});

export { orders };
