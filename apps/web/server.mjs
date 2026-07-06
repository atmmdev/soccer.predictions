import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import next from 'next';

import { startApi } from '../../scripts/start-api.mjs';

const webDir = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const hostname = '0.0.0.0';

startApi();

const app = next({ dev: false, dir: webDir });
const handle = app.getRequestHandler();

await app.prepare();

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    await handle(req, res, {
      pathname: url.pathname,
      query: Object.fromEntries(url.searchParams),
    });
  } catch (error) {
    console.error('Request error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}).listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
