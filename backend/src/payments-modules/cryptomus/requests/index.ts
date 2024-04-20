import type { Order } from 'payments-modules/cryptomus/types';

export interface ResponseOrder {
    state: number;
    result: Order;
}

export const payment = async (amount: number, currency: string, order_id: string) => {};
