import { ApiClient, GotHttpClient, Network } from '@crypto-pay/sdk';
import { CRYPTOBOT_TOKEN_TEST } from './constants';
import got from 'got';

const httpClient = new GotHttpClient({ got });

export const cryptoBotClient = new ApiClient({
    appToken: CRYPTOBOT_TOKEN_TEST,
    network: Network.Testnet,
    httpClient,
    
});
