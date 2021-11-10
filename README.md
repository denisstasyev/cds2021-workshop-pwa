# PWA Workshop

## How to start?

To run use static server

```bash
npx serve ./src
```

## Some notes

Cool notes:

1. Change Theme Color with JS (works only in PWA-mode)

```js
document.querySelector("meta[name=theme-color").content = "blue";
```

2. Theme Color can be adjusted to support light/dark themes with CSS Media

```html
<meta name="theme-color" content="#bb7162" media="..." />
```
