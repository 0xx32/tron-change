import { CreateInvoiceResponse, InvoiceData } from './crypto-cloud.types';

class CryptoCloud {
    apiKey: string;
    baseUrl: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.cryptocloud.plus/v2/';
    }

    async sendRequest<Payload>(endpoint: string, method = 'POST', payload: Payload | null = null) {
        const headers = {
            Authorization: `Token ${this.apiKey}`,
            'Content-Type': 'application/json',
        };
        const url = this.baseUrl + endpoint;

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: payload ? JSON.stringify(payload) : null,
        });

        return response.json();
    }

    createInvoice(invoiceData: InvoiceData): Promise<CreateInvoiceResponse> {
        return this.sendRequest<InvoiceData>('invoice/create', 'POST', invoiceData);
    }

    cancelInvoice(uuid: string) {
        return this.sendRequest('invoice/merchant/canceled', 'POST', { uuid });
    }

    listInvoices(startDate: string, endDate: string, offset = 0, limit = 10) {
        return this.sendRequest('invoice/merchant/list', 'POST', {
            start: startDate,
            end: endDate,
            offset,
            limit,
        });
    }

    getInvoiceInfo(uuids: string[]) {
        return this.sendRequest('invoice/merchant/info', 'POST', { uuids });
    }

    getBalance() {
        return this.sendRequest('merchant/wallet/balance/all', 'POST');
    }

    getStatistics(startDate: string, endDate: string) {
        return this.sendRequest('invoice/merchant/statistics', 'POST', {
            start: startDate,
            end: endDate,
        });
    }
}

export { CryptoCloud };
