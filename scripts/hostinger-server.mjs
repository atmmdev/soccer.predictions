import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { bootstrapApi } from './bootstrap-api.mjs';

const webDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'apps/web');
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '0.0.0.0';
const require = createRequire(path.join(webDir, 'package.json'));
const next = require('next');

const nextApp = next({ dev: false, dir: webDir });
const handle = nextApp.getRequestHandler();

await nextApp.prepare();

createServer((request, response) => {
  handle(request, response);
}).listen(port, host, () => {
  console.log(`Soccer Predictions ready on http://${host}:${port}`);
  void bootstrapApi().catch(error => {
    console.error('API bootstrap failed:', error);
  });
});
