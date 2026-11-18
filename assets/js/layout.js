/* Shared chrome: header, bag panel and footer. */

const STORE_LINKS = [
  { label: "Home", href: "index.html", page: "home" },
  { label: "Shop all", href: "shop.html", page: "shop" },
  { label: "Running", href: "shop.html?category=Running" },
  { label: "Basketball", href: "shop.html?category=Basketball" },
  { label: "Lifestyle", href: "shop.html?category=Lifestyle" },
];

function headerMarkup({ active, links = STORE_LINKS }) {
  const items = links
    .map(
      ({ label, href, page }) =>
        `<li class="nav-item"><a class="nav-link ${page && page === active ? "active" : ""}" href="${href}">${label}</a></li>`
    )
    .join("");

  return `
  <nav class="navbar navbar-expand-lg navbar-ink" data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand brand-mark" href="index.html">NIKE</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
        aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto gap-lg-4 py-2 py-lg-0">${items}</ul>
        <button class="btn btn-orange btn-sm cart-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartPanel" aria-controls="cartPanel">
          Bag
          <span id="cart-count" class="cart-count is-empty">0</span>
        </button>
      </div>
    </div>
  </nav>`;
}

function cartMarkup() {
  return `
  <div class="offcanvas offcanvas-end cart-panel" tabindex="-1" id="cartPanel" aria-labelledby="cartTitle">
    <div class="offcanvas-header border-bottom">
      <h2 class="h6 fw-bold text-uppercase mb-0" id="cartTitle">Your bag</h2>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column p-0">
      <div id="cart-body" class="flex-grow-1 px-3"></div>
      <div class="border-top p-3 mt-auto">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="text-muted small text-uppercase">Subtotal</span>
          <strong id="cart-subtotal" class="h5 mb-0">$0</strong>
        </div>
        <p class="small text-muted mb-3">Shipping and taxes calculated at checkout.</p>
        <button class="btn btn-ink w-100" id="checkout-btn">Checkout</button>
      </div>
    </div>
  </div>`;
}

function footerMarkup() {
  return `
  <footer class="site-footer">
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-lg-4">
          <a class="brand-mark text-white text-decoration-none" href="index.html">NIKE</a>
          <p class="text-white-50 small mt-3 mb-0" style="max-width: 22rem">
            A landing page template built with HTML, CSS, Bootstrap 5 and vanilla JavaScript.
          </p>
        </div>
        <div class="col-6 col-lg-2">
          <p class="footer-title">Shop</p>
          <ul class="list-unstyled small">
            <li><a href="shop.html">All products</a></li>
            <li><a href="shop.html?category=Running">Running</a></li>
            <li><a href="shop.html?category=Basketball">Basketball</a></li>
            <li><a href="shop.html?category=Lifestyle">Lifestyle</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-2">
          <p class="footer-title">Help</p>
          <ul class="list-unstyled small">
            <li><a href="#faq">FAQ</a></li>
            <li><a href="shop.html">Shipping</a></li>
            <li><a href="shop.html">Returns</a></li>
            <li><a href="shop.html">Size guide</a></li>
          </ul>
        </div>
        <div class="col-lg-4">
          <p class="footer-title">Join the list</p>
          <p class="text-white-50 small">Early access to drops, and 10% off your first pair.</p>
          <form class="d-flex gap-2" id="newsletter-form">
            <input type="email" class="form-control" placeholder="you@email.com" required aria-label="Email address" />
            <button class="btn btn-orange" type="submit">Join</button>
          </form>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-between gap-2 border-top border-secondary-subtle mt-4 pt-4">
        <p class="small text-white-50 mb-0">© ${new Date().getFullYear()} NIKE demo template. Not affiliated with any brand.</p>
        <p class="small text-white-50 mb-0">Built with Bootstrap 5</p>
      </div>
    </div>
  </footer>`;
}

function initLayout(options = {}) {
  const config = typeof options === "string" ? { active: options } : options;

  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) header.innerHTML = headerMarkup(config);
  if (footer) footer.innerHTML = footerMarkup();

  document.body.insertAdjacentHTML("beforeend", cartMarkup());

  const toastHost = document.createElement("div");
  toastHost.id = "toast-host";
  toastHost.className = "toast-host";
  document.body.appendChild(toastHost);

  bindCartUi();
  renderCart();

  const newsletter = document.getElementById("newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("You're on the list — welcome aboard");
      newsletter.reset();
    });
  }
}
