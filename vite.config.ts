import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEXTS_PATH = path.join(__dirname, 'src/content/site-texts.json');
const KEY_RE = /^[a-zA-Z0-9._]+$/;
const MAX_BODY = 64 * 1024;

const devCmsPlugin = (): Plugin => ({
  name: 'dev-cms',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/__edit', (req, res, next) => {
      if (req.method !== 'POST') return next();

      // localhost-only guard: this plugin only runs in dev (apply: 'serve'),
      // but block remote callers if dev server is exposed via --host.
      const remote = req.socket.remoteAddress ?? '';
      const isLocal = remote === '127.0.0.1' || remote === '::1' || remote === '::ffff:127.0.0.1';
      if (!isLocal) {
        res.statusCode = 403;
        res.end('forbidden');
        return;
      }

      let body = '';
      let aborted = false;
      req.on('data', (chunk: Buffer) => {
        if (aborted) return;
        body += chunk.toString('utf-8');
        if (body.length > MAX_BODY) {
          aborted = true;
          res.statusCode = 413;
          res.end('payload too large');
          req.destroy();
        }
      });
      req.on('end', () => {
        if (aborted) return;
        try {
          const payload = JSON.parse(body);
          const { key, value } = payload as { key?: unknown; value?: unknown };

          if (typeof key !== 'string' || typeof value !== 'string') {
            res.statusCode = 400;
            return res.end('invalid payload');
          }
          if (!KEY_RE.test(key)) {
            res.statusCode = 400;
            return res.end('invalid key');
          }

          const raw = fs.readFileSync(TEXTS_PATH, 'utf-8');
          const json = JSON.parse(raw) as Record<string, unknown>;

          const segments = key.split('.');
          let cur: Record<string, unknown> = json;
          for (let i = 0; i < segments.length - 1; i++) {
            const seg = segments[i];
            if (!cur || typeof cur !== 'object' || !(seg in cur)) {
              res.statusCode = 400;
              return res.end(`unknown key path at "${seg}"`);
            }
            cur = cur[seg] as Record<string, unknown>;
          }
          const leaf = segments[segments.length - 1];
          if (!(leaf in cur)) {
            res.statusCode = 400;
            return res.end(`unknown key path at "${leaf}"`);
          }
          cur[leaf] = value;

          fs.writeFileSync(TEXTS_PATH, JSON.stringify(json, null, 2) + '\n', 'utf-8');

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, key }));
        } catch (err) {
          res.statusCode = 500;
          res.end(String(err instanceof Error ? err.message : err));
        }
      });
    });
  },
});

export default defineConfig({
  plugins: [react(), devCmsPlugin()],
});
