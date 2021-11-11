# Progressive Web Apps Workshop

> Chrome Dev Summit 2021

Trainer: [Maximiliano Firtman](https://github.com/firtman) firt.dev @firt

In this hands-on workshop, you will code a Progressive Web App, an app that will be installable on Windows, Mac, Linux, ChromeOS, Android, iOS, and iPadOS with offline capabilities and integration with the device. We will start creating icons and installable metadata for mobile and desktop with the Web App Manifest. After that, we will enhance the user interface with CSS before adding a Service Worker for offline support. Finally, we will work on distribution, generating an "Install" dialog from the browser and PWA Launchers for listing the PWA through the app stores.

Inspired by [original repo](https://github.com/firtman/cds21)

## How to start?

Follow link on [Firt.dev](https://firt.dev/cds)

To run use static server

```bash
npx serve ./src
```

## Some notes

Cool notes:

0. All HTML-pages should include link to Manifest

```html
<link rel="manifest" href="app.webmanifest" />
```

1. Due to [Web Application Manifest by W3C](https://www.w3.org/TR/appmanifest/) it's better to use **.webmanifest** extension over **.json** for Manifest
2. `scope` in Manifest is responsible for folder to be PWA
3. `icons` in Manifest should be PNG (SVG supports only in Chrome since summer 2021)
4. Change Theme Color with JS (works only in PWA-mode)

```js
document.querySelector("meta[name=theme-color").content = "blue";
```

5. Theme Color can be adjusted to support light/dark themes with CSS Media (and could be different for different HTML-pages)

```html
<meta name="theme-color" content="#bb7162" media="..." />
```

6. Only one Service Worker for Scope in `chrome://serviceworker-internals/` possible
7. After closing tab Service Worker still exists for 40s in Chrome
8. Service Worker folder is important
9. Get rid of HTTPS-only for ip:port (instead of localhost:port)

```
chrome:flags -> "Insecure origins treated as secure"  let's you additional sites where HTTP will work.
```

10. Look at [Workbox](https://developers.google.com/web/tools/workbox)
11. To publish into any App Stores use [PWABuilder](https://www.pwabuilder.com/). It'll wrap web-app into classic proprietary mobile or desktop app format. But remember about deeplinks (PWABuilder supports them)
12. To emulate different devices use Xcode (for iOS), Android Studio or [Vysor](https://www.vysor.io/) (for Android)

## Useful links

1. `chrome://serviceworker-internals/`
2. `chrome://inspect/#devices` for real Android device Port forwarding

Soon this course will be available at [web.dev](https://web.dev/learn/pwa/)

## Tools

- PWA Stats: https://www.pwastats.com/
- Material Icons Search: https://material.io/resources/icons/
- App Scope (Guide of PWA) https://appsco.pe/
- W3C App Manifest https://www.w3.org/TR/appmanifest/
- Icon Resizers: https://resizeappicon.com/ https://makeappicon.com/
- PWACompat https://github.com/GoogleChromeLabs/pwacompat
- Maskable Icons https://maskable.app/
- Chrome Service Worker List chrome://serviceworker-internals/
- Workbox: https://developers.google.com/web/tools/workbox
- PWA online: https://firtman.github.io/cds-pwa/
- PWA Builder: https://www.pwabuilder.com/
- BubbleWrap CLI (for Play Store) https://github.com/GoogleChromeLabs/bubblewrap
- Service Workers Recipes https://serviceworke.rs/

## Service Workers Snippets

1. Registration

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceworker.js")
    .then(function (registration) {
      // Worker is registered
    })
    .catch(function (error) {
      // There was an error registering the SW
    });
}
```

2. Basic Add to Cache

```js
var urls = [];

self.addEventListener("install", (event) => {
  console.log("The SW is now installed");
  event.waitUntil(
    caches.open("myAppCache").then(function (cache) {
      return cache.addAll(urls);
    })
  );
});
```

3. Fetch: Cache First

```js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        // The request is in the cache
        return response;
      } else {
        // We need to go to the network
        return fetch(event.request);
      }
    })
  );
});
```

4. Fetch: Network first (server or connection errors)

```js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(function (error) {
      return caches.open(myAppCache).then(function (cache) {
        return cache.match(request);
      });
    })
  );
});
```

5. Fetch: Stale while Revalidate

```js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      var fetchPromise = fetch(event.request).then(function (networkResponse) {
        caches.open("activityLauncher").then(function (cache) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return response || fetchPromise;
    })
  );
});
```
