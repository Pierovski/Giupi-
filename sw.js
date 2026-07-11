// sw.js - El motor de Giupi (Actualizado para Auto-Updates y Galería)
const CACHE_NAME = 'giupi-v4.3'; // Incrementa este número cuando lances grandes cambios

const assets = [
  '/',
  '/index.html',
  '/muro.html',
  '/categoria.html',
  '/registro.html',
  '/galeria.html',
  '/app.js',
  '/firebase-config.js',
  '/giupi.mp3',
  '/giupi.png',
  '/giupi-viajero.png',
  '/giupi-chef.png',
  '/giupi-elegante.png',
  '/giupi-explorador.png',
  '/giupi-icon.png'
];

// 1. INSTALACIÓN: Forzamos la instalación inmediata del nuevo Service Worker
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// 2. ACTIVACIÓN: Borramos cachés viejas automáticamente al actualizar la versión
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. ESTRATEGIA FETCH: Network-First (Primero internet para ver cambios al instante)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
