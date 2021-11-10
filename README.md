# PWA Workshop

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

## Useful links

1. `chrome://serviceworker-internals/`
2. `chrome://inspect/#devices` for real Android device Port forwarding
