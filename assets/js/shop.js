/* Shop page: category filter, search and sort. */

const shopState = { category: "All", sort: "featured", query: "" };

document.addEventListener("DOMContentLoaded", () => {
  initLayout("shop");

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");
  if (requestedCategory && CATEGORIES.includes(requestedCategory)) {
    shopState.category = requestedCategory;
  }
  if (params.get("q")) {
    shopState.query = params.get("q");
  }

  const chips = document.getElementById("chips");
  chips.innerHTML = ["All", ...CATEGORIES]
    .map(
      (category) =>
        `<button type="button" class="chip ${shopState.category === category ? "active" : ""}" data-category="${category}">${category}</button>`
    )
    .join("");

  const search = document.getElementById("search-input");
  search.value = shopState.query;

  const sort = document.getElementById("sort-select");
  sort.value = shopState.sort;

  chips.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-category]");
    if (!chip) return;
    shopState.category = chip.dataset.category;
    chips.querySelectorAll(".chip").forEach((element) => {
      element.classList.toggle("active", element === chip);
    });
    renderShop();
  });

  search.addEventListener("input", () => {
    shopState.query = search.value;
    renderShop();
  });

  sort.addEventListener("change", () => {
    shopState.sort = sort.value;
    renderShop();
  });

  document.getElementById("reset-filters").addEventListener("click", () => {
    shopState.category = "All";
    shopState.sort = "featured";
    shopState.query = "";
    search.value = "";
    sort.value = "featured";
    chips.querySelectorAll(".chip").forEach((element) => {
      element.classList.toggle("active", element.dataset.category === "All");
    });
    renderShop();
  });

  renderShop();
});

function renderShop() {
  const grid = document.getElementById("shop-grid");
  const empty = document.getElementById("empty-state");
  const query = shopState.query.trim().toLowerCase();

  let items = CATALOG.filter(
    (product) => shopState.category === "All" || product.category === shopState.category
  );

  if (query) {
    items = items.filter((product) =>
      `${product.name} ${product.category} ${product.colorway}`.toLowerCase().includes(query)
    );
  }

  const sorted = [...items];
  if (shopState.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (shopState.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (shopState.sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

  renderGrid(grid, sorted);
  grid.classList.toggle("d-none", sorted.length === 0);
  empty.classList.toggle("d-none", sorted.length > 0);

  document.getElementById("results-count").textContent =
    sorted.length + (sorted.length === 1 ? " style" : " styles") +
    (shopState.category === "All" ? "" : " · " + shopState.category);
  document.getElementById("empty-query").textContent = shopState.query || shopState.category;

  const params = new URLSearchParams();
  if (shopState.category !== "All") params.set("category", shopState.category);
  if (shopState.query) params.set("q", shopState.query);
  const suffix = params.toString();
  window.history.replaceState({}, "", "shop.html" + (suffix ? "?" + suffix : ""));
}
