const CACHE_NAME = 'zaver-cache-v3';
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
    '/images/screenshot-1.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
