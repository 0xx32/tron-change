import { Hono } from 'hono';
import { getRates } from 'shared/getRates';

const MIN_AMOUNT_TRX = 100;
const DEFAULT_CURRENCY = 'TRX';
const serviceFee = 20; // 10%

export const rates = new Hono();

rates.get(':currency', async (ctx) => {
    const currency = ctx.req.param('currency');

    if (!currency) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Not specifed parameter currency' });
    }

    const {
        data: { result: rates },
    } = await getRates({ params: { currency: DEFAULT_CURRENCY } });

    const rateCurrency = rates.find((rate) => rate.to.toUpperCase() === currency.toUpperCase());

    if (!rateCurrency) {
        ctx.status(400);
        return ctx.json({ success: false, message: 'Not found currency' });
    }

    const newRate = (+rateCurrency.course + (+rateCurrency.course * serviceFee) / 100).toFixed(2);

    return ctx.json({
        success: true,
        rate: {
            ...rateCurrency,
            course: newRate,
            minTrx: MIN_AMOUNT_TRX,
        },
    });
});
