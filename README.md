# NIKE — demo storefront

A small e-commerce storefront built with plain **HTML, CSS, Bootstrap 5 and vanilla
JavaScript**. No build step, no framework, no server-side code.

## Pages

| File           | What it does                                                              |
| -------------- | ------------------------------------------------------------------------- |
| `index.html`   | Hero, featured products, category tiles, members section                   |
| `shop.html`    | Full catalogue with category filters, search and sorting                   |
| `product.html` | Product detail (`?id=<product-id>`), size picker, quantity, add to bag     |

## Structure

```
assets/
  css/styles.css      custom design layer on top of Bootstrap
  js/art.js           inline vector sneaker artwork, driven by colourways
  js/data.js          product catalogue (prices, specs, colourways)
  js/store.js         cart state in localStorage + the shared bag panel
  js/layout.js        header, bag panel, footer, toast host
  js/cards.js         product card markup
  js/home.js          home page composition
  js/shop.js          filter / search / sort
  js/product.js       product detail interactions
  vendor/             Bootstrap 5.3.3 (CSS + bundle), vendored so the site
                      works offline
```

## Running it

It is a static site, so any static file server works. From the repository root:

```sh
python3 -m http.server 3000
```

Then open <http://localhost:3000>. Editing any HTML/CSS/JS file is picked up on
reload — there is nothing to compile.

## Cart

The bag lives in `localStorage` under `nike.cart.v1`, so items survive reloads
and page navigation. Checkout is intentionally a demo — it shows a toast rather
than posting an order.
