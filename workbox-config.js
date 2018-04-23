module.exports = {
  "globDirectory": "assets/",
  "globPatterns": [
    "**/manifest.json"
  ],
  "swDest": "assets-src/js/modules/iframe/local-sw-cache.js",
  "runtimeCaching": [
    {
      urlPattern: /^https:\/\/vaithuhay\.com\//,
      // Apply a network-first strategy.
      handler: 'networkFirst',
      options: {
        // Fall back to the cache after 10 seconds.
        networkTimeoutSeconds: 6,
        // Use a custom cache name for this route.
        cacheName: 'doc',
        // Configure custom cache expiration.
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [0, 200],
          headers: {
            'Content-Type': 'text/html'
          }
        }
      }
    },
    {
      urlPattern: /^https:\/\/static\.vaithuhay\.com\//,
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: "resource",
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
};
