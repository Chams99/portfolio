const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/Images/optimized/chams-small.webp',
    '/Images/optimized/chams-medium.webp',
    '/Images/optimized/chams-large.webp',
    '/Images/optimized/chams-fallback.jpg',
    '/Images/optimized/energy-small.webp',
    '/Images/optimized/energy-medium.webp',
    '/Images/optimized/energy-large.webp',
    '/Images/optimized/energy-fallback.jpg',
    '/Images/optimized/Fitness-small.webp',
    '/Images/optimized/Fitness-medium.webp',
    '/Images/optimized/Fitness-large.webp',
    '/Images/optimized/Fitness-fallback.jpg',
    '/fa/favicon.ico',
    '/fa/apple-touch-icon.png',
    '/fa/favicon-32x32.png',
    '/fa/favicon-16x16.png',
    '/fa/site.webmanifest'
];

// External resources to cache
const EXTERNAL_RESOURCES = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Error caching static assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Handle external resources (CDN, fonts, etc.)
    if (url.origin !== location.origin) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(request)
                        .then(fetchResponse => {
                            // Cache successful responses for external resources
                            if (fetchResponse && fetchResponse.status === 200) {
                                const responseClone = fetchResponse.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return fetchResponse;
                        })
                        .catch(() => {
                            // Return a fallback for failed external requests
                            return new Response('', { status: 404 });
                        });
                })
        );
        return;
    }

    // Handle internal resources
    event.respondWith(
        caches.match(request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(request)
                    .then(fetchResponse => {
                        // Cache successful responses
                        if (fetchResponse && fetchResponse.status === 200) {
                            const responseClone = fetchResponse.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then(cache => {
                                    cache.put(request, responseClone);
                                });
                        }
                        return fetchResponse;
                    })
                    .catch(error => {
                        console.error('Fetch failed:', error);
                        // Return a fallback for HTML requests
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        return new Response('', { status: 404 });
                    });
            })
    );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Handle any pending background tasks
        console.log('Background sync completed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/fa/favicon-32x32.png',
        badge: '/fa/favicon-16x16.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Portfolio',
                icon: '/fa/favicon-16x16.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/fa/favicon-16x16.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Portfolio Update', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 