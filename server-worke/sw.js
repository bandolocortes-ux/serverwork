const CACHE_NAME = 'pdm2-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icons/launchericon-192x192.png',
    './icons/launchericon-512x512.png'
];
self.addEventListener('install', (event) => {
    console.log('Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log(
                    'Armazenando arquivos no cache...'
                );
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('activate', (event) => {
    console.log('Service Worker ativado.');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter(
                            (name) => name !== CACHE_NAME)
                        .map(
                            (name) => caches.delete(name)
                        )
                );
            })
    );
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log(
                        'Cache:',
                        event.request.url
                    );
                    return response;
                }
                console.log(
                    'Rede:',
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});