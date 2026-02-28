const CACHE_NAME = 'zaver-cache-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/index-084125b5.css',
    '/assets/index-7f5c52d7.js',
    '/images/hero_banner.png',
    '/images/ring_diamond_solitaire.png',
    '/images/ring_emerald_halo.png',
    '/images/necklace_diamond.png',
    '/images/necklace_pearl.png',
    '/images/earring_diamond_drop.png',
    '/images/icon-512.png',
    '/images/icon-192.png',
    '/images/shortcut-necklace.png',
    '/images/shortcut-emerald.png',
    '/images/screenshot-1.png',
    '/images/screenshot-mobile.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Log and continue even if some assets fail (helps during partial uploads)
                return Promise.allSettled(urlsToCache.map(url =>
                    cache.add(url).catch(err => console.warn('Failed to cache:', url, err))
                ));
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('periodicsync', event => {
    if (event.tag === 'zaver-sync') {
        event.waitUntil(Promise.resolve());
    }
});

self.addEventListener('sync', event => {
    if (event.tag === 'zaver-sync') {
        event.waitUntil(Promise.resolve());
    }
});

self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Push message',
    };
    event.waitUntil(
        self.registration.showNotification('Zaver', options)
    );
});
