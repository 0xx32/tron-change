import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { showRoutes } from 'hono/dev';

import { prisma } from 'database/db';
import { orders, rates, payments } from 'routes/index';

// init hono
const app = new Hono().basePath('/api');

// constants

// middlewares
app.use('*', cors());
app.use(logger());
app.use(prettyJSON());

// routes
app.route('orders', orders);
app.route('rates', rates);
app.route('payments', payments);

const port = 4000;
console.log(`Server is running on port ${port}`);

async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();

serve({
    fetch: app.fetch,
    port,
});

showRoutes(app, {
    colorize: true,
});
