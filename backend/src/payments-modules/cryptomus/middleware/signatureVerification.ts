import { Context, Next } from 'hono';
import { OrderInfoWebhook } from '../types/cryptomus.interace';
import { prisma } from 'database/db';

export const signatureVerification = async (ctx: Context, next: Next) => {
    const { sign, uuid } = await ctx.req.json<OrderInfoWebhook>();

    const payment = await prisma.payment.findUnique({ where: { uuid } });

    if (sign !== payment?.sign) {
        ctx.status(401);
        ctx.json({ success: false, message: 'Некорректный ключ' });
    }
    return next();
};
