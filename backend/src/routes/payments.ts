import { prisma } from 'database/db';
import { Hono } from 'hono';
import { CallbackResponse } from 'payments-modules/crypto-cloud/crypto-cloud.types';
import { tronWeb } from 'tron-web/index';
import * as jwt from 'jsonwebtoken';

export const payments = new Hono();

payments.post('/callback', async (ctx) => {
    try {
        const body = await ctx.req.parseBody();
        const { status, invoice_id, token } = body;

        if (!status || !token || status !== 'success' || !invoice_id) return ctx.json({ success: false });

        const tokenVerify = jwt.decode(token as string) as {
            id: string;
        };

        if (tokenVerify && tokenVerify.id !== invoice_id) return ctx.json({ success: false });

        const payment = await prisma.payment.update({
            where: { uuid: invoice_id as string },
            data: {
                status: status as string,
            },
        });
        await prisma.order.update({
            where: { id: payment.orderId },
            data: {
                status: status as string,
            },
        });

        // tronWeb.trx.sendTransaction(order?.address, +order.amount);

        console.log('Успех');

        return ctx.json({ success: true });
    } catch (error) {}
});
