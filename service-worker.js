const APP_VERSION = 'v38.1.0';
const CACHE_NAME = `ptw2027-secure-exam-${APP_VERSION}`;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './version.json',
  './score-report-export.html',
  './certificate-export.html',
  './ptw-report-launcher.js',
  './ptw-v38-official-verify.js',
  './ptw-v38-1-verify-code.js',
  './ptw-v38-fixes.css',
  './assets/index-PTWv38.js',
  './assets/index-PTWv38.css',
  './ptw-icon-192.png',
  './ptw-icon-512.png',
  './ptw-official-score-qr.png',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => undefined));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('ptw2027-secure-exam-') && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CLEAR_PTW_CACHES') {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.includes('ptw2027')).map(k => caches.delete(k)))));
  }
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin || url.hostname.includes('supabase.co')) {
    return;
  }

  const isFreshResource = url.pathname.endsWith('/version.json') || url.pathname.endsWith('/service-worker.js') || url.pathname.endsWith('/manifest.webmanifest');

  if (isFreshResource) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => undefined);
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  if (isNavigationRequest(request)) {
    const fallbackPage = url.pathname.endsWith('/score-report-export.html') ? './score-report-export.html' : (url.pathname.endsWith('/certificate-export.html') ? './certificate-export.html' : './index.html');
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(fallbackPage, copy)).catch(() => undefined);
          return response;
        })
        .catch(() => caches.match(fallbackPage))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => undefined);
        }
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
