/* Landing page: carousel artwork, featured cards, marquee. */

document.addEventListener("DOMContentLoaded", () => {
  initLayout({
    active: "home",
    links: [
      { label: "Home", href: "#top", page: "home" },
      { label: "Featured", href: "#featured" },
      { label: "Shop", href: "shop.html" },
      { label: "FAQ", href: "#faq" },
    ],
  });

  // carousel slide artwork
  document.querySelectorAll("[data-art]").forEach((node) => {
    const product = findProduct(node.dataset.art);
    if (product) node.innerHTML = shoeArt(product.colors, { label: product.name });
  });

  // members banner artwork
  const bannerArt = document.getElementById("banner-art");
  const bannerProduct = findProduct("street-pulse");
  if (bannerArt && bannerProduct) {
    bannerArt.innerHTML = shoeArt(bannerProduct.colors, { label: bannerProduct.name });
  }

  // Bootstrap card grid
  const grid = document.getElementById("featured-cards");
  if (grid) {
    grid.innerHTML = CATALOG.slice(0, 6)
      .map(
        (product) => `
        <div class="col-sm-6 col-lg-4">
          <article class="card tpl-card h-100">
            <div class="card-img-top">${shoeArt(product.colors, { label: product.name })}</div>
            <div class="card-body d-flex flex-column">
              <p class="eyebrow mb-1">${product.category}</p>
              <h3 class="card-title h6 mb-1">${product.name}</h3>
              <p class="card-text small text-muted mb-3">${product.colorway}</p>
              <div class="d-flex justify-content-between align-items-center mt-auto">
                <span class="price">${money(product.price)}</span>
                <a class="btn btn-ink btn-sm" href="product.html?id=${product.id}">View</a>
              </div>
            </div>
          </article>
        </div>`
      )
      .join("");
  }

  // marquee strip
  const messages = [
    "Free shipping over $100",
    "30-day free returns",
    "Members get early access",
    "New drops every Thursday",
  ];
  const track = document.getElementById("marquee-track");
  if (track) {
    track.innerHTML = [...messages, ...messages].map((message) => `<span>${message}</span>`).join("");
  }
});
