self.addEventListener('install', function(event) {
  // تثبيت Service Worker وتخزين الملفات الأساسية
  event.waitUntil(
    caches.open('tnwork-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'offline.html', // تأكد من وجود ملف offline.html
        'image/app-icon-512x512.png'
        // أضف باقي الملفات الأساسية التي تحتاج لتعمل بدون اتصال هنا
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // إذا كان الملف موجودًا في الـ Cache، يتم عرضه مباشرة
      return response || fetch(event.request).catch(function() {
        // عند عدم توفر الملف في الـ Cache وعدم وجود اتصال بالإنترنت، يتم عرض offline.html
        return caches.match('offline.html');
      });
    })
  );
});
