/* Product card markup shared by the home and shop grids. */

function productCard(product) {
  return `
  <article class="product-card h-100 d-flex flex-column" data-product="${product.id}">
    <a href="product.html?id=${product.id}" class="text-reset text-decoration-none flex-grow-1">
      <div class="product-art">
        ${shoeArt(product.colors, { label: product.name })}
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      </div>
      <div class="product-meta px-3 px-lg-4 pt-1">
        <p class="eyebrow mb-1">${product.category}</p>
        <div class="d-flex justify-content-between align-items-start gap-2">
          <div>
            <h3 class="h6 fw-bold mb-0">${product.name}</h3>
            <p class="small text-muted mb-0">${product.colorway}</p>
          </div>
          <span class="price">${money(product.price)}</span>
        </div>
      </div>
    </a>
    <div class="px-3 px-lg-4 pb-3 pb-lg-4 pt-3">
      <button class="btn btn-outline-ink btn-sm w-100" type="button" data-quickadd="${product.id}">Quick add</button>
    </div>
  </article>`;
}

function renderGrid(target, products, columnClass = "col-6 col-lg-3") {
  if (!target) return;
  target.innerHTML = products
    .map((product) => `<div class="${columnClass}">${productCard(product)}</div>`)
    .join("");
}
