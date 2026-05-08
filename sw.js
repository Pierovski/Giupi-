// sw.js - El motor de Giupi
const CACHE_NAME = 'giupi-v1.2.2';
const assets = [
  '/',
  '/index.html',
  '/muro.html',
  '/categoria.html',
  '/registro.html',
  '/app.js',
  '/firebase-config.js',
  '/giupi.mp3',
  '/giupi-viajero.png',
  '/giupi-chef.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
