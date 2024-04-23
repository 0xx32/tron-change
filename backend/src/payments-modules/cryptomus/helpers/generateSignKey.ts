import crypto from 'crypto';
import { Buffer } from 'node:buffer';
import { CRYPTOMUS_API_KEY } from '../constants';

export const generateSignKey = <T>(data: T) =>
    crypto
        .createHash('md5')
        .update(Buffer.from(JSON.stringify(data)).toString('base64') + CRYPTOMUS_API_KEY)
        .digest('hex');
