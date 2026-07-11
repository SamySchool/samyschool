// SamySchool Service Worker — نسخة بسيطة آمنة
// بيخلي المنصة قابلة للتثبيت كتطبيق، وبيعرض المحتوى من الشبكة دايماً
// (عشان أي تعديل على GitHub يظهر فوراً للطلاب)

const CACHE_NAME = 'samyschool-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// Network-first: يجيب من النت الأول، ولو النت قاطع يجيب من الكاش
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          try { cache.put(e.request, clone); } catch (err) {}
        });
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
