/* Cart state, persisted in localStorage, plus the shared bag panel. */

const CART_KEY = "nike.cart.v1";

function readCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((l) => l && l.id && l.qty > 0) : [];
  } catch (error) {
    return [];
  }
}

function writeCart(lines) {
  localStorage.setItem(CART_KEY, JSON.stringify(lines));
  document.dispatchEvent(new CustomEvent("cart:change"));
}

function lineKey(id, size) {
  return id + "|" + size;
}

function addToCart(id, size, qty = 1) {
  const lines = readCart();
  const key = lineKey(id, size);
  const existing = lines.find((l) => lineKey(l.id, l.size) === key);
  if (existing) {
    existing.qty += qty;
  } else {
    lines.push({ id: id, size: size, qty: qty });
  }
  writeCart(lines);
}

function changeQty(key, delta) {
  const lines = readCart();
  const line = lines.find((l) => lineKey(l.id, l.size) === key);
  if (!line) return;
  line.qty += delta;
  writeCart(lines.filter((l) => l.qty > 0));
}

function removeLine(key) {
  writeCart(readCart().filter((l) => lineKey(l.id, l.size) !== key));
}

function cartCount() {
  return readCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartSubtotal() {
  return readCart().reduce((sum, l) => {
    const product = findProduct(l.id);
    return product ? sum + product.price * l.qty : sum;
  }, 0);
}

function cartLines() {
  return readCart()
    .map((l) => ({ ...l, key: lineKey(l.id, l.size), product: findProduct(l.id) }))
    .filter((l) => l.product);
}

function renderCart() {
  const badge = document.getElementById("cart-count");
  const body = document.getElementById("cart-body");
  const subtotal = document.getElementById("cart-subtotal");
  const checkout = document.getElementById("checkout-btn");
  const lines = cartLines();
  const count = cartCount();

  if (badge) {
    badge.textContent = String(count);
    badge.classList.toggle("is-empty", count === 0);
  }
  if (subtotal) subtotal.textContent = money(cartSubtotal());
  if (checkout) checkout.disabled = lines.length === 0;
  if (!body) return;

  if (lines.length === 0) {
    body.innerHTML = `
      <div class="cart-empty text-center py-5">
        <p class="fw-bold text-uppercase mb-1">Your bag is empty</p>
        <p class="text-muted small mb-3">Add a pair and it will show up here.</p>
        <a class="btn btn-outline-ink btn-sm" href="shop.html" data-bs-dismiss="offcanvas">Shop the collection</a>
      </div>`;
    return;
  }

  body.innerHTML = lines
    .map(
      (line) => `
      <div class="cart-line d-flex gap-3 py-3 border-bottom">
        <a href="product.html?id=${line.product.id}" class="cart-thumb flex-shrink-0">
          ${shoeArt(line.product.colors, { label: line.product.name })}
        </a>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between gap-2">
            <div>
              <a href="product.html?id=${line.product.id}" class="fw-bold text-reset text-decoration-none d-block">${line.product.name}</a>
              <p class="small text-muted mb-1">US ${line.size} · ${line.product.colorway}</p>
            </div>
            <button class="cart-remove" data-cart-action="remove" data-key="${line.key}" aria-label="Remove ${line.product.name}">×</button>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="qty-stepper">
              <button data-cart-action="dec" data-key="${line.key}" aria-label="Decrease quantity">−</button>
              <span>${line.qty}</span>
              <button data-cart-action="inc" data-key="${line.key}" aria-label="Increase quantity">+</button>
            </div>
            <span class="fw-bold">${money(line.product.price * line.qty)}</span>
          </div>
        </div>
      </div>`
    )
    .join("");
}

function showToast(message) {
  const host = document.getElementById("toast-host");
  if (!host) return;
  const toast = document.createElement("div");
  toast.className = "toast-ink";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  host.appendChild(toast);
  setTimeout(() => toast.classList.add("is-out"), 1800);
  setTimeout(() => toast.remove(), 2300);
}

function bindCartUi() {
  document.addEventListener("cart:change", renderCart);

  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-cart-action]");
    if (control) {
      const key = control.dataset.key;
      const action = control.dataset.cartAction;
      if (action === "inc") changeQty(key, 1);
      if (action === "dec") changeQty(key, -1);
      if (action === "remove") removeLine(key);
      return;
    }

    const quickAdd = event.target.closest("[data-quickadd]");
    if (quickAdd) {
      const product = findProduct(quickAdd.dataset.quickadd);
      if (!product) return;
      const size = product.sizes[Math.floor(product.sizes.length / 2)];
      addToCart(product.id, size, 1);
      showToast(`${product.name} · US ${size} added to your bag`);
      return;
    }

    if (event.target.closest("#checkout-btn")) {
      showToast("Demo store — checkout is not connected yet");
    }
  });
}
