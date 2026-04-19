const CACHE_NAME='solar-quote-layout-v1';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./service-worker.js'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch',event=>{
  event.respondWith(caches.match(event.request).then(resp=>resp||fetch(event.request)));
});
