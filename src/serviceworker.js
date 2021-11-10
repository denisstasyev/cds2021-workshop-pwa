const assetsName = "PWA_ASSETS";
const urls = ["/", "/js/app.js", "/js/handlers.js", "/data/activities.json",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"];

// Install the assets
self.addEventListener('install', event => {
    caches.open(assetsName).then(cache => {
        cache.addAll(urls);
    });
});

// Serve the assets
self.addEventListener('fetch', event => {
    // console.log(`fetching ${event.request.url}`);
    const response = new Response(`Service Worker responding for ${event.request.url}`);

    event.respondWith(response); // HTTP response or a promise of an HTTP request
});