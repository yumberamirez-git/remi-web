const CACHE_NAME = 'Utenze'
const urlsToCache = [
    './',
    '/',
    '/favicon.ico',
    '/dist/app.css',
    '/dist/main.js',
    '/dist/img/',
    '/dist/logo/',
    '/sw.js',
    '/script.js',
    '/manifest.json',
    '/index.html'
]
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            //console.log('ok cache')
            return cache.addAll(urlsToCache)
        })
        .catch(err => console.log(err))
    )
})

self.addEventListener('activate', event =>{
    const cacheList = [CACHE_NAME]
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if( cacheList.indexOf(cacheName) === -1 ){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(() => {
             return self.clients.claim()
            })    
    )
})

self.addEventListener('fetch', event => {
    let dataURL = 'http://localhost:8080/'
    if(event.request.url.indexOf(dataURL) > -1){
        event.respondWith(
            caches.open(CACHE_NAME)
            .then(cache=>{
                return fetch(event.request).then(response =>{
                    cache.put(event.request.url, response.clone())
                    return response
                })
            })
        )
    }else{
        event.respondWith(
            caches.match(event.request)
            .then(response =>{
                return response || fetch(event.request)
            })
        )
    }
   
})