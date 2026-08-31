# Corrupted Memory

Static storefront for **Corrupted Memory** — handmade jewellery with a cyberpunk /
glitch aesthetic. Built as a plain HTML + CSS + JavaScript site, no build step and no
framework.

**Live:** https://ktrotek.github.io/CorruptedMemoryWebsite/index.html

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page with the glitch hero and loading overlay |
| `products.html` | All products plus the image carousel |
| `necklaces.html` `earings.html` `bracelets.html` `keyrings.html` `patches.html` | Category listings |
| `shoppingCart.html` | Cart contents and totals |
| `about.html` `contact.html` `shipping.html` | Info pages |

## Scripts

- `shoppingCart.js` — cart state in `localStorage`, add/remove items, quantity and
  total updates, cart badge count.
- `loader.js` — hides the page behind `.loadingOverlay` until load completes, with a
  3 second minimum so the animation is always seen.

## Styling

Everything lives in `stylesheet.css`, including the mobile breakpoints. Fonts are
Orbitron and Exo 2 from Google Fonts.

## Running it

No tooling required — open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Notes

Fourth website project. Things picked up along the way: mobile optimisation, a proper
dive into Firefox's developer tools, and a much better handle on Git and GitHub.

An earlier experiment wired this site up to WordPress as a headless CMS. That has been
removed — the site is fully static again. The experiment is still in the history if it
is ever needed.
