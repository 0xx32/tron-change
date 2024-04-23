import { prisma } from 'database/db';
import { Hono } from 'hono';
import { CallbackResponse } from 'payments-modules/crypto-cloud/crypto-cloud.types';
import { tronWeb } from 'tron-web/index';

const payments = new Hono();

payments.post('/callback', async (ctx) => {
    const body = await ctx.req.parseBody();
    const res = body as unknown as CallbackResponse;

    if (res.status !== 'success') return;

    const payment = await prisma.payment.update({
        where: { uuid: res.invoice_id },
        data: {
            status: res.status,
        },
    });
    const order = await prisma.order.update({
        where: { id: payment.orderId },
        data: {
            status: res.status,
        },
    });

    console.log('address', order.address);
    console.log('amount trx', order.amount);

    // tronWeb.trx.sendTransaction(order?.address, +order.amount);
});
