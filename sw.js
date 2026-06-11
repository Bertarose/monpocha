// ══════════════════════════════════════════════════════════
//  POCHA MTL 2026 — Service Worker
//  Stratégie : Network First + Cache Fallback
// ══════════════════════════════════════════════════════════

const CACHE_VERSION = 'monpocha-2026-v36';

const ASSETS = [
  '/',
  '/index.html',
  '/webapp.html',
  '/manifest.json',
  '/img/mascot.jpg',
  '/img/pocha-logo.png',
];

const NETWORK_TIMEOUT_MS = 3000;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(networkFirstWithTimeout(req));
});

async function networkFirstWithTimeout(req) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const networkResponse = await Promise.race([
      fetch(req.clone()),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT_MS)
      )
    ]);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(req, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    return new Response(
      `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>POCHA MTL — Hors-ligne</title>
      <style>
        body { font-family: sans-serif; display: flex; flex-direction: column;
               align-items: center; justify-content: center; min-height: 100vh;
               margin: 0; background: #f0f4fa; color: #0D1B2A; text-align: center; padding: 24px; }
        h1 { font-size: 28px; margin-bottom: 8px; }
        p  { color: #37474F; margin-bottom: 24px; }
        button { background: #1976D2; color: #fff; border: none; border-radius: 24px;
                 padding: 14px 28px; font-size: 16px; font-weight: 800; cursor: pointer; }
      </style></head>
      <body>
        <h1>📡 Pas de connexion</h1>
        <p>Connecte-toi à Internet pour accéder à POCHA MTL 2026.</p>
        <button onclick="location.reload()">Réessayer</button>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
