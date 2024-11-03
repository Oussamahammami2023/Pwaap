self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('offline-cache').then(function(cache) {
      return cache.addAll([
        'offline.html',
        // أضف باقي الملفات التي تريد تخزينها في الذاكرة المؤقتة هنا
      ]);
    })
  );
  self.skipWaiting(); // تفعيل Service Worker مباشرةً دون انتظار إغلاق النسخة القديمة
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== 'offline-cache') {
            // حذف الكاش القديم
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // تفعيل Service Worker على جميع التبويبات المفتوحة
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).catch(function() {
        return caches.match('offline.html');
      });
    })
  );
});
