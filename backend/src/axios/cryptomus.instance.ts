import axios from 'axios';

export const cryptomusApi = axios.create({
    baseURL: 'https://api.cryptomus.com/v1/',
});
