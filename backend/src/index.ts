import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import dotenv from 'dotenv';

import { cors } from 'hono/cors';
import { orders } from 'routes/orders';
dotenv.config({ path: '.env.development' });

// init hono
const app = new Hono().basePath('/api');

// constants

// routes
app.route('orders', orders);

// middlewares
app.use('*', cors({ origin: '*' }));

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});
