import { Hono } from 'hono';
import { vValidator } from '@hono/valibot-validator';

import { prisma } from 'database/db';
import { addressValidation } from 'tron-web/helpers/addressValidation';
import { PaymentMethodTypes, createOrderShema } from 'valibot/order.shemas';

import { PAYMENT_METHOD_LIST } from 'constants/payments';
import { createInvoiceCryptoBot, createInvoiceCryptoCloud } from 'payments-modules/utils/createInvoice';

const orders = new Hono();

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
        return ctx.json({ success: false, message: 'Некорректный адрес кошелька' });
    }

    const order = await prisma.order.create({
        data: {
            amount: orderDto.paymentAmount,
            address: orderDto.address,
            currency: orderDto.currency,
            network: orderDto.network,
            status: 'creating',
        },
    });

    if (PaymentMethodTypes.cryptoCloud === orderDto.paymentMethod) {
        const invoice = await createInvoiceCryptoCloud({
            amount: orderDto.paymentAmount,
            currency: orderDto.currency,
            orderId: order.id,
        });

        return ctx.json({ success: true, message: 'Заказ успешно создан', paymentUrl: invoice.result.link });
    }

    if (PaymentMethodTypes.cryptoBot === orderDto.paymentMethod) {
        console.log(orderDto);

        const invoice = await createInvoiceCryptoBot({
            amount: orderDto.paymentAmount,
            currency: orderDto.currency,
            orderId: order.id,
        });

        return ctx.json({ success: true, message: 'Заказ успешно создан', paymentUrl: invoice.payUrl });
    }
});

export { orders };
