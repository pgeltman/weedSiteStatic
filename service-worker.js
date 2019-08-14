'use strict';
var precacheConfig = [
    ['/index.html', '75d13d87ad79de66175a6dc8a7df31d5'],
    ['/static/css/main.c0ec9460.css', '2ba8f4308f3b5db2c1d29a0363bb83ab'],
    ['/static/js/main.8ddb0889.js', '17b2c55aade851ef8468d18a5f006362'],
    ['/static/media/1.50daee30.png', '50daee303ba3760115aa70a96b59a64e'],
    ['/static/media/Contact.8f361613.png', '8f36161376ce6af7011c402efbdeda06'],
    [
      '/static/media/Testimonial.1d138656.png',
      '1d138656ce80f62fc1c168289be9bc3c'
    ],
    ['/static/media/about-bg.422e0378.png', '422e0378637eab69704be4b52719f8c2'],
    ['/static/media/auth-bg.be350ff8.jpg', 'be350ff8b632851a5e2a99fe2c8aac87'],
    [
      '/static/media/feature-bg.81d842ef.png',
      '81d842ef3fe1930c955be998cb8ffe55'
    ],
    [
      '/static/media/fontawesome-webfont.674f50d2.eot',
      '674f50d287a8c48dc19ba404d20fe713'
    ],
    [
      '/static/media/fontawesome-webfont.912ec66d.svg',
      '912ec66d7572ff821749319396470bde'
    ],
    [
      '/static/media/fontawesome-webfont.af7ae505.woff2',
      'af7ae505a9eed503f8b8e6982036873e'
    ],
    [
      '/static/media/fontawesome-webfont.b06871f2.ttf',
      'b06871f281fee6b241d60582ae9369b9'
    ],
    [
      '/static/media/fontawesome-webfont.fee66e71.woff',
      'fee66e712a8a08eef5805a46892932ad'
    ],
    [
      '/static/media/home2-slider.bd92fad6.png',
      'bd92fad67070357f992002e329497f5b'
    ],
    [
      '/static/media/home3-slider.abeeb270.png',
      'abeeb270b316e50bec74e615e57d2534'
    ],
    ['/static/media/lannd-bg.8138381b.png', '8138381b208ce18ccf187adc55eb14a0'],
    ['/static/media/price-bg.b824d3fb.png', 'b824d3fba07722a2eb83f52439c7377d'],
    ['/static/media/price.f43c7496.png', 'f43c74964f73acc849a69de8e8978c43'],
    ['/static/media/screen1.a0946348.png', 'a0946348eb9069b102624dfb07efa0bb'],
    [
      '/static/media/screenshot-bg.a7bc3d56.png',
      'a7bc3d5685c7846ba2ba0a18a1d629ec'
    ],
    ['/static/media/team-bg.489b89c5.png', '489b89c5d00222eabcba422fb0983559'],
    [
      '/static/media/team-img-bg.995db0cd.png',
      '995db0cdb0e99cfd39eb33eb5ca2a75e'
    ],
    [
      '/static/media/testimonial-bg.87684073.png',
      '87684073c2e9f618302fb106309b3149'
    ]
  ],
  cacheName =
    'sw-precache-v3-sw-precache-webpack-plugin-' +
    (self.registration ? self.registration.scope : ''),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, t) {
    var a = new URL(e);
    return '/' === a.pathname.slice(-1) && (a.pathname += t), a.toString();
  },
  cleanResponse = function(t) {
    return t.redirected
      ? ('body' in t ? Promise.resolve(t.body) : t.blob()).then(function(e) {
          return new Response(e, {
            headers: t.headers,
            status: t.status,
            statusText: t.statusText
          });
        })
      : Promise.resolve(t);
  },
  createCacheKey = function(e, t, a, n) {
    var c = new URL(e);
    return (
      (n && c.pathname.match(n)) ||
        (c.search +=
          (c.search ? '&' : '') +
          encodeURIComponent(t) +
          '=' +
          encodeURIComponent(a)),
      c.toString()
    );
  },
  isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0;
    var a = new URL(t).pathname;
    return e.some(function(e) {
      return a.match(e);
    });
  },
  stripIgnoredUrlParameters = function(e, a) {
    var t = new URL(e);
    return (
      (t.hash = ''),
      (t.search = t.search
        .slice(1)
        .split('&')
        .map(function(e) {
          return e.split('=');
        })
        .filter(function(t) {
          return a.every(function(e) {
            return !e.test(t[0]);
          });
        })
        .map(function(e) {
          return e.join('=');
        })
        .join('&')),
      t.toString()
    );
  },
  hashParamName = '_sw-precache',
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var t = e[0],
        a = e[1],
        n = new URL(t, self.location),
        c = createCacheKey(n, hashParamName, a, /\.\w{8}\./);
      return [n.toString(), c];
    })
  );
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url;
      });
    })
    .then(function(e) {
      return new Set(e);
    });
}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(n) {
        return setOfCachedUrls(n).then(function(a) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(t) {
              if (!a.has(t)) {
                var e = new Request(t, { credentials: 'same-origin' });
                return fetch(e).then(function(e) {
                  if (!e.ok)
                    throw new Error(
                      'Request for ' +
                        t +
                        ' returned a response with status ' +
                        e.status
                    );
                  return cleanResponse(e).then(function(e) {
                    return n.put(t, e);
                  });
                });
              }
            })
          );
        });
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
}),
  self.addEventListener('activate', function(e) {
    var a = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(t) {
          return t.keys().then(function(e) {
            return Promise.all(
              e.map(function(e) {
                if (!a.has(e.url)) return t.delete(e);
              })
            );
          });
        })
        .then(function() {
          return self.clients.claim();
        })
    );
  }),
  self.addEventListener('fetch', function(t) {
    if ('GET' === t.request.method) {
      var e,
        a = stripIgnoredUrlParameters(
          t.request.url,
          ignoreUrlParametersMatching
        ),
        n = 'index.html';
      (e = urlsToCacheKeys.has(a)) ||
        ((a = addDirectoryIndex(a, n)), (e = urlsToCacheKeys.has(a)));
      var c = '/index.html';
      !e &&
        'navigate' === t.request.mode &&
        isPathWhitelisted(['^(?!\\/__).*'], t.request.url) &&
        ((a = new URL(c, self.location).toString()),
        (e = urlsToCacheKeys.has(a))),
        e &&
          t.respondWith(
            caches
              .open(cacheName)
              .then(function(e) {
                return e.match(urlsToCacheKeys.get(a)).then(function(e) {
                  if (e) return e;
                  throw Error(
                    'The cached response that was expected is missing.'
                  );
                });
              })
              .catch(function(e) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    t.request.url,
                    e
                  ),
                  fetch(t.request)
                );
              })
          );
    }
  });
