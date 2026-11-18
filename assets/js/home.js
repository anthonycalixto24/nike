/* Home page composition. */

document.addEventListener("DOMContentLoaded", () => {
  initLayout("home");

  document.getElementById("hero-shoe").innerHTML = shoeArt(CATALOG[0].colors, { label: "Aero Flux 1" });
  document.getElementById("promo-shoe").innerHTML = shoeArt(CATALOG[4].colors, { label: "Blaze Court Pro" });

  renderGrid(
    document.getElementById("featured-grid"),
    CATALOG.filter((product) => product.featured)
  );

  const messages = [
    "Free shipping over $100",
    "30-day free returns",
    "Members get early access",
    "New drops every Thursday",
  ];
  document.getElementById("marquee-track").innerHTML = [...messages, ...messages]
    .map((message) => `<span>${message}</span>`)
    .join("");

  const tiles = [
    { category: "Running", art: "aero-flux-1", copy: "Daily miles to race day", bg: "linear-gradient(135deg,#1b1b1b,#3f4d12)" },
    { category: "Basketball", art: "court-legacy-82", copy: "Court-ready traction", bg: "linear-gradient(135deg,#6f1b1b,#1b1b1b)" },
    { category: "Lifestyle", art: "street-pulse", copy: "Everyday comfort", bg: "linear-gradient(135deg,#1f3559,#0f1626)" },
  ];

  document.getElementById("category-tiles").innerHTML = tiles
    .map((tile) => {
      const product = findProduct(tile.art);
      return `
        <div class="col-md-4">
          <a class="cat-tile" href="shop.html?category=${tile.category}" style="background: ${tile.bg}">
            <div class="cat-art">${shoeArt(product.colors, { label: tile.category })}</div>
            <h3 class="h4 mb-0">${tile.category}</h3>
            <span class="cat-cta">${tile.copy} →</span>
          </a>
        </div>`;
    })
    .join("");
});
