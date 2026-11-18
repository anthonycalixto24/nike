# NIKE — Bootstrap landing page template

A responsive, reusable landing page template built with plain **HTML, CSS, Bootstrap 5
and vanilla JavaScript**. No build step, no framework, no server-side code.

Palette: black, white and vivid orange (`--ink`, `--paper`, `--orange` in
`assets/css/styles.css`).

## Bootstrap components used

| Component    | Where                                                              |
| ------------ | ------------------------------------------------------------------ |
| **Navbar**   | Sticky dark navbar with a collapsible menu on mobile                |
| **Carousel** | Three-slide hero with indicators, prev/next controls and autoplay   |
| **Cards**    | `Featured styles` grid — Bootstrap `.card` markup with vector art   |
| **Collapse** | FAQ section — independent collapsible panels                        |
| Offcanvas    | Slide-out shopping bag (bonus, used by the store pages)             |

## Pages

| File           | What it does                                                          |
| -------------- | --------------------------------------------------------------------- |
| `index.html`   | The template: carousel, cards, banner and FAQ collapse                 |
| `shop.html`    | Full catalogue with category filters, search and sorting               |
| `product.html` | Product detail (`?id=<product-id>`), size picker, quantity, add to bag |

## Structure

```
assets/
  css/styles.css      design tokens + custom layer on top of Bootstrap
  js/art.js           inline vector sneaker artwork, driven by colourways
  js/data.js          product catalogue (prices, specs, colourways)
  js/store.js         cart state in localStorage + the shared bag panel
  js/layout.js        navbar, bag panel, footer, toast host
  js/cards.js         product card markup for the shop grid
  js/template.js      landing page: carousel art, cards, marquee
  js/shop.js          filter / search / sort
  js/product.js       product detail interactions
  vendor/             Bootstrap 5.3.3 (CSS + bundle), vendored so the site
                      works offline
```

## Customising

- **Palette** — edit the CSS variables at the top of `assets/css/styles.css`.
- **Copy** — everything is static HTML in `index.html`.
- **Products** — edit `assets/js/data.js`; the cards, carousel art and shop grid
  all read from it.

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
