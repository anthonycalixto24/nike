/* Product detail page: size selection, quantity, add to bag. */

document.addEventListener("DOMContentLoaded", () => {
  initLayout("shop");

  const product = findProduct(new URLSearchParams(window.location.search).get("id"));

  if (!product) {
    document.getElementById("product-view").classList.add("d-none");
    document.getElementById("related-section").classList.add("d-none");
    document.getElementById("not-found").classList.remove("d-none");
    return;
  }

  document.title = `${product.name} — NIKE`;
  document.getElementById("crumb-name").textContent = product.name;
  document.getElementById("product-art").innerHTML = shoeArt(product.colors, { label: product.name });
  document.getElementById("product-category").textContent = product.category;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-stars").textContent = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));
  document.getElementById("product-reviews").textContent = `${product.rating} · ${product.reviews} reviews`;
  document.getElementById("product-price").textContent = money(product.price);
  document.getElementById("product-blurb").textContent = product.blurb;
  document.getElementById("product-colorway").textContent = product.colorway;
  document.getElementById("product-swatch").style.background = product.colors.upper;
  document.getElementById("product-details").textContent = product.blurb;
  document.getElementById("product-specs").innerHTML = Object.entries(product.specs)
    .map(
      ([label, value]) =>
        `<div class="d-flex justify-content-between border-bottom py-2"><span>${label}</span><strong class="text-dark">${value}</strong></div>`
    )
    .join("");

  const sizeGrid = document.getElementById("size-grid");
  sizeGrid.innerHTML = product.sizes
    .map((size) => `<button type="button" class="size-btn" data-size="${size}">US ${size}</button>`)
    .join("");

  const addButton = document.getElementById("add-to-cart");
  const hint = document.getElementById("size-hint");
  let selectedSize = null;
  let quantity = 1;

  sizeGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button) return;
    selectedSize = Number(button.dataset.size);
    sizeGrid.querySelectorAll(".size-btn").forEach((element) => {
      element.classList.toggle("active", element === button);
    });
    addButton.disabled = false;
    hint.textContent = `US ${selectedSize} selected — ready to add.`;
  });

  const qtyValue = document.getElementById("qty-value");
  document.getElementById("qty-inc").addEventListener("click", () => {
    quantity = Math.min(quantity + 1, 10);
    qtyValue.textContent = String(quantity);
  });
  document.getElementById("qty-dec").addEventListener("click", () => {
    quantity = Math.max(quantity - 1, 1);
    qtyValue.textContent = String(quantity);
  });

  document.getElementById("size-guide").addEventListener("click", () => {
    showToast("This style runs true to size — take your usual US size");
  });

  addButton.addEventListener("click", () => {
    if (selectedSize === null) {
      showToast("Select a size first");
      return;
    }
    addToCart(product.id, selectedSize, quantity);
    showToast(`${product.name} · US ${selectedSize} added to your bag`);
    bootstrap.Offcanvas.getOrCreateInstance(document.getElementById("cartPanel")).show();
  });

  const related = CATALOG.filter((item) => item.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);
  renderGrid(document.getElementById("related-grid"), related, "col-6 col-lg-4");
});
