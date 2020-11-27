const workerVersion = 5;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(`cache-v${workerVersion}`).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './main.css',
                './main.js',
                'https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css',
                './favicons/apple-touch-icon.png',
                './favicons/favicon-32x32.png',
                './favicons/favicon-16x16.png',
                './favicons/manifest.webmanifest',
                './favicons/safari-pinned-tab.svg',
                './favicons/favicon.ico',
                './favicons/browserconfig.xml',
                './favicons/android-chrome-512x512.png',
                './favicons/android-chrome-192x192.png',
            ]);
        }),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== `cache-v${workerVersion}`) {
                        return caches.delete(key);
                    }
                }),
            );
        }),
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request).then((response) => {
                    return caches
                        .open(`cache-v${workerVersion}`)
                        .then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                })
            );
        }),
    );
});
