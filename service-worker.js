// Service Worker

self.addEventListener('install', function(event) {
  // إضافة صفحة offline.html إلى الذاكرة المؤقتة
  event.waitUntil(
    caches.open('offline-cache').then(function(cache) {
      return cache.addAll([
        'offline.html', // تأكد من أن المسار صحيح ويشير إلى ملف offline.html
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // إذا كان الطلب موجودًا في الذاكرة المؤقتة، قم بإرجاعه
      return response || fetch(event.request).catch(function() {
        // إذا لم يكن هناك اتصال، قم بإرجاع صفحة offline.html من الذاكرة المؤقتة
        return caches.match('offline.html');
      });
    })
  );
});
