export interface CryptomusBaseResponse<ResultType> {
    state: number;
    result: ResultType;
}

export interface RateCurrency {
    from: string;
    to: string;
    course: string;
}

export interface Order {
    uuid: string;
    order_id: string;
    amount: string;
    payment_amount: any;
    payer_amount: any;
    discount_percent: any;
    discount: string;
    payer_currency: any;
    currency: string;
    merchant_amount: any;
    network: any;
    address: any;
    from: any;
    txid: any;
    payment_status: string;
    url: string;
    expired_at: number;
    status: string;
    is_final: boolean;
    additional_data: any;
    created_at: string;
    updated_at: string;
}

export interface OrderInfoWebhook {
    type: string;
    uuid: string;
    order_id: string;
    amount: string;
    payment_amount: string;
    payment_amount_usd: string;
    merchant_amount: string;
    commission: string;
    is_final: boolean;
    status: string;
    from: string;
    wallet_address_uuid: any;
    network: string;
    currency: string;
    payer_currency: string;
    additional_data: any;
    convert: Convert;
    txid: string;
    sign: string;
}

interface Convert {
    to_currency: string;
    commission: any;
    rate: string;
    amount: string;
}
