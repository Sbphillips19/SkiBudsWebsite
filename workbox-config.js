/**
 * Workbox configuration — generateSW mode.
 * Produces _site/sw.js as a self-contained classic script (no ESM imports,
 * precache manifest injected at build time). Wired into build via `npm run build:sw`.
 */
module.exports = {
  globDirectory: '_site/',
  globPatterns: ['**/*.{html,css,js,png,webp,avif,jpg,jpeg,svg,ico,json,xml,txt}'],
  swDest: '_site/sw.js',
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  skipWaiting: true,
  // Serve the offline page when a navigation fails (build emits /offline/index.html).
  navigateFallback: '/offline.html',
  runtimeCaching: [
    {
      urlPattern: ({ request, sameOrigin }) =>
        sameOrigin &&
        (request.destination === 'image' ||
          /\.(avif|webp|jpe?g|png|gif|svg)$/i.test(new URL(request.url).pathname)),
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 120,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: ({ request, sameOrigin }) =>
        sameOrigin && ['style', 'script'].includes(request.destination),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};
