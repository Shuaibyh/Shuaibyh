#!/usr/bin/env node
import { createServer as nodeCreateServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
};

export function publicPath(urlPath, base = root) {
  let pathname;
  try {
    pathname = decodeURIComponent(String(urlPath).split('?')[0]);
  } catch {
    return null;
  }
  if (!pathname.startsWith('/') || pathname.includes('\0') || pathname.includes('\\')) return null;
  if (pathname === '/') pathname = '/web/index.html';
  const allowed =
    /^\/web\/[A-Za-z0-9._/-]+\.(?:html|css|mjs|svg)$/.test(pathname) ||
    pathname === '/data/projects.json' ||
    /^\/docs\/[A-Za-z0-9._/-]+\.md$/.test(pathname) ||
    /^\/casos\/[A-Za-z0-9-]+\.md$/.test(pathname) ||
    /^\/[A-Za-z0-9_-]+\.md$/.test(pathname) ||
    /^\/assets\/[A-Za-z0-9._/-]+\.svg$/.test(pathname);
  if (!allowed) return null;
  const full = path.resolve(base, '.' + pathname);
  const relative = path.relative(base, full);
  if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) return null;
  return full;
}

export function createPortfolioServer(base = root) {
  return nodeCreateServer(async (req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      return res.end();
    }
    const target = publicPath(req.url, base);
    if (!target) {
      res.writeHead(404);
      return res.end();
    }
    try {
      const actualRoot = await realpath(base);
      const actualFile = await realpath(target);
      const relative = path.relative(actualRoot, actualFile);
      if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
        res.writeHead(404);
        return res.end();
      }
      const bytes = await readFile(actualFile);
      const headers = {
        'Content-Type': types[path.extname(target)] ?? 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store',
        'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'none'",
      };
      res.writeHead(200, headers);
      res.end(req.method === 'HEAD' ? undefined : bytes);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('PORT debe ser un entero entre 1 y 65535.');
    process.exitCode = 1;
  } else {
    createPortfolioServer().listen(port, '127.0.0.1', () => {
      console.log('Vista local: http://127.0.0.1:' + port + '/');
    });
  }
}
