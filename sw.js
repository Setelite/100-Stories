const CACHE='100-days-v1-20261026';
const FILES=['./','./index.html','./styles.css','./app.js','./data.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./icons/favicon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));});
