const CACHE_NAME = 'headless_pwa';
const STATIC_CACHE_URL = [
    '/index.html',
    '/pwa.js',
    'images/*',
    'js/*',
];
self.addEventListener('install', function (e) {
    e.waitUntil(
        //Dateien aus STATIC_CACHE_URL in Cache Storage laden
        caches.open(CACHE_NAME).then(function (cache) {
            //console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(STATIC_CACHE_URL).then(() => console.log('Assets added to cache'))
                .catch(err => console.log('Error while fetching assets', err));
        })
    );
});
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => keys.filter(key => key !== CACHE_NAME))
            .then(keys => Promise.all(
                keys.map(key => {
                    return caches.delete(key);
                })
            ))
    )
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response)
                    return response; //Dieser Response kommt aus dem Cache.

                let fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        if (!response || response.status != 200)
                            return response;

                        let responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            })
                        return response;
                    })
            })
    );
});

//Push Notification
self.addEventListener("push", event => {
    const title = "KWM Push Notification";
    const options = {
        body: event.data.text,
    }
    event.waitUntil(
        self.registration.showNotification(title, options)
    )
});