import { Hono } from 'hono';
import tronWeb from '../tron-web';

import crypto from 'crypto';
import { Buffer } from 'node:buffer';
import { addressValidation } from 'tron-web/helpers/addressValidation';

// const toHash_md5 = (data: string) => crypto.createHash('md5').update(data).digest('hex');
// const buf1 = Buffer.from(toHash_md5('wadawd'), 'base64').toString('base64');
// console.log(toHash_md5(buf1));

const orders = new Hono();

orders.post('/create', async (ctx) => {
    const { amount, address } = await ctx.req.json<CreateTransactionDto>();

    if (!amount) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Не указанно количество trx' });
    }
    if (!address) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Не указанн адрес' });
    }
    if (!addressValidation(address)) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Некорректный адрес' });
    }

    // const responseTransaction = await tronWeb.trx.sendTransaction(address, amount);

    // Create payment link

    const paymentUrl = 'https://tronscan.org';

    ctx.status(401);

    return ctx.json({ success: true, message: 'Transaction created successfully', paymentUrl });
});

export { orders };
