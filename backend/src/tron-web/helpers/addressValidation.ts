import { tronWeb } from 'tron-web/index';

export const addressValidation = (address: string): boolean => tronWeb.isAddress(address);
