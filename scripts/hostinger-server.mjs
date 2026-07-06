import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { bootstrapApi } from './bootstrap-api.mjs';

const webDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'apps/web');
const port = Number(process.env.PORT ?? 3000);
const require = createRequire(path.join(webDir, 'package.json'));
const next = require('next');

await bootstrapApi();

const nextApp = next({ dev: false, dir: webDir });
const handle = nextApp.getRequestHandler();

await nextApp.prepare();

createServer((request, response) => {
  handle(request, response);
}).listen(port, () => {
  console.log(`Soccer Predictions ready on port ${port}`);
});
