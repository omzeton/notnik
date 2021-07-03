const staticCacheName = "notnik-v1";
const assets = ["/assets"];

self.addEventListener("install", event => {
    // console.log("%cservice worker has been installed!", "color: yellow;");
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("Caching shell assets...");
            cache.addAll(assets);
        })
    );
});
self.addEventListener("activate", event => {
    // console.log("%cservice worker has been activated!", "color: blue;");
});
self.addEventListener("fetch", event => {
    // console.log("fetch event", event);
});

export default self;
