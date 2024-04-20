import tronWeb from '../';

export const addressValidation = (address: string): boolean => tronWeb.isAddress(address);
