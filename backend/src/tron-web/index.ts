import TronWeb from '@sterliakov/tstron';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const tronWeb = new TronWeb({
    fullHost: process.env.TRON_GRID_HOST!,
    headers: { 'TRON-PRO-API-KEY': process.env.TRON_GRID_API_KEY! },
    privateKey: process.env.PRIVATE_KEY!,
});

export default tronWeb;
