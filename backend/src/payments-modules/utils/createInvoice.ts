import { CryptoCurrency, PaidBtnName } from '@crypto-pay/sdk';
import { prisma } from 'database/db';
import { CryptoCloud } from 'payments-modules/crypto-cloud';
import { cryptoBotClient } from 'payments-modules/cryptobot-pay';

interface InvoiceParams {
    amount: number;
    currency: string;
    orderId: number;
}

export const createInvoiceCryptoCloud = async (invoiceParams: InvoiceParams) => {
    const cryptoCloud = new CryptoCloud(process.env.CRYPTO_CLOUD_API_KEY!);

    const invoice = await cryptoCloud.createInvoice({
        amount: invoiceParams.amount,
        currency: 'USD',
        order_id: invoiceParams.orderId.toString(),
        shop_id: process.env.CRYPTO_CLOUD_SHOP_ID!,
    });

    await prisma.payment.create({
        data: {
            uuid: invoice.result.uuid,
            status: invoice.result.status,
            invoice_id: invoice.result.invoice_id,
            amount: invoice.result.amount,
            created: invoice.result.created,
            payment_link: invoice.result.link,
            orderId: invoiceParams.orderId,
        },
    });

    return invoice;
};
export const createInvoiceCryptoBot = async (invoiceParams: InvoiceParams) => {
    const invoice = await cryptoBotClient.createInvoice({
        amount: invoiceParams.amount,
        asset: CryptoCurrency.USDT,
        description: `Оплата заказа ${invoiceParams.orderId}`,
        paidBtnName: PaidBtnName.ViewItem,
        paidBtnUrl: `http://localhost:5173?orderId=${invoiceParams.orderId}`,
        payload: {
            orderId: invoiceParams.orderId,
        },
    });

    await prisma.payment.create({
        data: {
            uuid: invoice.invoiceId.toString(),
            status: invoice.status,
            invoice_id: invoice.invoiceId.toString(),
            amount: +invoice.amount,
            created: invoice.createdAt.toString(),
            payment_link: invoice.payUrl,
            orderId: invoiceParams.orderId,
        },
    });

    return invoice;
};
