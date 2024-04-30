import { prisma } from 'database/db';
import { Hono } from 'hono';

import * as jwt from 'jsonwebtoken';

export const payments = new Hono();

payments.get('/methods', async (ctx) => {
    const methods = [
        {
            id: 1,
            name: 'Крипто клауд',
            logo: '/assets/images/crypto-cloud.svg',
            type: 'crypto-cloud',
            enabled: false,
        },
        {
            id: 2,
            name: 'Криптобот',
            logo: '/assets/images/crypto-bot.jpg',
            type: 'crypto-bot',
            enabled: true,
        },
    ];

    return ctx.json({ methods });
});

payments.post('/crypto-bot', async (ctx) => {
    const body = await ctx.req.json()

    console.log(ctx.req);
});

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

        return ctx.json({ success: true });
    } catch (error) {}
});
