self.addEventListener('load', e => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', e => {
  console.log(`intercepting ${e.request.method} to ${e.request.url}`);
});
