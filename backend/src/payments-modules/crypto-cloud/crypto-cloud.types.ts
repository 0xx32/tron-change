export interface InvoiceData {
    amount: number;
    shop_id: string;
    currency: string;
    order_id: string;
    email?: string;
    time_to_pay?: number;
}

export interface CreateInvoiceResponse {
    status: string;
    result: InvoiceResult;
}

interface InvoiceResult {
    uuid: string;
    created: string;
    address: string;
    expiry_date: string;
    side_commission: string;
    side_commission_cc: string;
    amount: number;
    amount_usd: number;
    amount_in_fiat: number;
    fee: number;
    fee_usd: number;
    service_fee: number;
    service_fee_usd: number;
    type_payments: string;
    fiat_currency: string;
    status: string;
    is_email_required: boolean;
    link: string;
    invoice_id: any;
    currency: Currency;
    project: Project;
    test_mode: boolean;
}

interface Currency {
    id: number;
    code: string;
    fullcode: string;
    network: Network;
    name: string;
    is_email_required: boolean;
    stablecoin: boolean;
    icon_base: string;
    icon_network: string;
    icon_qr: string;
    order: number;
}

interface Network {
    code: string;
    id: number;
    icon: string;
    fullname: string;
}

interface Project {
    id: number;
    name: string;
    fail: string;
    success: string;
    logo: string;
}

export interface CallbackResponse {
    status: string;
    invoice_id: string;
    amount_crypto: number;
    currency: string;
}

