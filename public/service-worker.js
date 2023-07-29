var CACHE_NAME = "gih-cache-v1";

// Define the array of URLs to cache
var CACHED_URLS = [
    "/offline-vue/",
    "/offline-vue/index.html",
    "/offline-vue/app.f5b81c4a.js", // Use a specific file with a content-based hash (example)
    '/offline-vue/manifest.json'
    // Add more URLs here that you want to cache
];

function getCacheKey(url) {
    // Check if the URL matches the pattern for the app.js file with the content-based hash
    if (url.match(/\/app\..*\.js$/)) {
        // Extract the original filename from the URL using a capturing group in the regular expression
        const filename = url.match(/\/app\..*\.js$/)[0];
        return filename;
    } else {
        // For other URLs, use the original URL as the cache key
        return url;
    }
}

self.addEventListener("install", function (event) {
    console.log("Installing service worker...");
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return Promise.all(
                CACHED_URLS.map(function (url) {
                    return fetch(url)
                        .then(function (response) {
                            // Get the cache key based on the URL type
                            const cacheKey = getCacheKey(url);
                            // Cache the response with the appropriate cache key
                            cache.put(cacheKey, response.clone());
                        })
                        .catch(function (err) {
                            console.error("Failed to cache:", url, err);
                        });
                })
            );
        })
    );
});


self.addEventListener("fetch", function (event) {
    console.log("Fetch event:", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                console.log("Cached response found:", response.url);
                return response;
            }

            console.log("Fetching from network:", event.request.url);
            return fetch(event.request);
        })

    );
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("gih-cache")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
