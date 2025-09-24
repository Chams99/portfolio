const CACHE_NAME = 'portfolio-v2.0.3';
const STATIC_CACHE = 'static-v2.0.3';
const DYNAMIC_CACHE = 'dynamic-v2.0.3';

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
    '/Images/optimized/chicken-small.webp',
    '/Images/optimized/chicken-medium.webp',
    '/Images/optimized/chicken-large.webp',
    '/Images/optimized/chicken-fallback.jpg',
    '/Images/optimized/white-small.webp',
    '/Images/optimized/white-medium.webp',
    '/Images/optimized/white-large.webp',
    '/Images/optimized/white-fallback.jpg',
    '/Images/optimized/restaurents-small.webp',
    '/Images/optimized/restaurents-medium.webp',
    '/Images/optimized/restaurents-large.webp',
    '/Images/optimized/restaurents-fallback.jpg',
    '/Images/optimized/sspace-small.webp',
    '/Images/optimized/sspace-medium.webp',
    '/Images/optimized/sspace-large.webp',
    '/Images/optimized/sspace-fallback.jpg',
    '/Images/optimized/typing-game-small.webp',
    '/Images/optimized/typing-game-medium.webp',
    '/Images/optimized/typing-game-large.webp',
    '/Images/optimized/typing-game-fallback.jpg',
    '/Images/optimized/wallpaper-small.webp',
    '/Images/optimized/wallpaper-medium.webp',
    '/Images/optimized/wallpaper-large.webp',
    '/Images/optimized/wallpaper-fallback.jpg',
    '/Images/optimized/lol-small.webp',
    '/Images/optimized/lol-medium.webp',
    '/Images/optimized/lol-large.webp',
    '/Images/optimized/lol-fallback.jpg',
    '/Images/optimized/ecommerce-small.webp',
    '/Images/optimized/ecommerce-medium.webp',
    '/Images/optimized/ecommerce-large.webp',
    '/Images/optimized/ecommerce-fallback.jpg',
    '/Images/optimized/chamsado_messenger-small.webp',
    '/Images/optimized/chamsado_messenger-medium.webp',
    '/Images/optimized/chamsado_messenger-large.webp',
    '/Images/optimized/chamsado_messenger-fallback.jpg',
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
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('Caching external resources');
                return cache.addAll(EXTERNAL_RESOURCES);
            })
        ])
        .then(() => {
            console.log('All assets cached successfully');
            return self.skipWaiting();
        })
        .catch(error => {
            console.error('Error caching assets:', error);
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

// Fetch event - Network-first for critical files, cache-first for assets
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and non-http requests
    if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
        return;
    }

    // Critical files that should always check network first
    const criticalFiles = ['/index.html', '/style.css', '/script.js'];
    const isCriticalFile = criticalFiles.some(file => url.pathname === file);

    if (isCriticalFile) {
        // Network-first strategy for critical files
        event.respondWith(
            fetch(request)
                .then(fetchResponse => {
                    // Update cache with fresh content
                    if (fetchResponse && fetchResponse.status === 200) {
                        const responseClone = fetchResponse.clone();
                        caches.open(STATIC_CACHE)
                            .then(cache => {
                                cache.put(request, responseClone);
                            });
                    }
                    return fetchResponse;
                })
                .catch(error => {
                    console.warn('Network failed for critical file:', request.url, error);
                    // Fallback to cache
                    return caches.match(request)
                        .then(cachedResponse => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            // Ultimate fallback
                            if (request.destination === 'document') {
                                return caches.match('/index.html');
                            }
                            return new Response('', { 
                                status: 404, 
                                statusText: 'Not Found' 
                            });
                        });
                })
        );
    } else {
        // Cache-first strategy for assets and external resources
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        // Return cached version immediately
                        return cachedResponse;
                    }

                    // Fetch from network and cache
                    return fetch(request)
                        .then(fetchResponse => {
                            // Only cache successful responses
                            if (fetchResponse && fetchResponse.status === 200) {
                                const responseClone = fetchResponse.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, responseClone);
                                        // Clean up old entries if cache gets too large
                                        return cleanupCache(cache);
                                    });
                            }
                            return fetchResponse;
                        })
                        .catch(error => {
                            console.warn('Network failed for:', request.url, error);
                            
                            // Return fallback for HTML requests
                            if (request.destination === 'document') {
                                return caches.match('/index.html');
                            }
                            
                            // Return empty response for failed requests
                            return new Response('', { 
                                status: 404, 
                                statusText: 'Not Found' 
                            });
                        });
                })
        );
    }
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

// Cache cleanup function to prevent unlimited growth
async function cleanupCache(cache) {
    const keys = await cache.keys();
    const maxCacheSize = 50; // Maximum number of cached items
    
    if (keys.length > maxCacheSize) {
        // Delete oldest entries (first in the list)
        const keysToDelete = keys.slice(0, keys.length - maxCacheSize);
        await Promise.all(keysToDelete.map(key => cache.delete(key)));
        console.log(`Cleaned up ${keysToDelete.length} old cache entries`);
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

// Message handler for cache updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        console.log('Clearing cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            })
        );
    }
}); 