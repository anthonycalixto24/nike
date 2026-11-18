/* Product catalogue. Colourways drive the vector artwork in art.js. */

const CATALOG = [
  {
    id: "aero-flux-1",
    name: "Aero Flux 1",
    category: "Running",
    price: 139,
    badge: "New",
    rating: 4.8,
    reviews: 214,
    colorway: "Volt / Black",
    colors: { upper: "#1b1b1b", accent: "#c9f227", sole: "#f4f4f4", detail: "#3a3a3a", outsole: "#111111" },
    blurb: "A featherweight daily trainer with a springy foam midsole and a breathable knit upper.",
    specs: { Weight: "246 g (US M9)", Drop: "8 mm", Upper: "Engineered knit", Cushioning: "AeroFoam" },
    featured: true,
  },
  {
    id: "court-legacy-82",
    name: "Court Legacy 82",
    category: "Basketball",
    price: 159,
    badge: "",
    rating: 4.6,
    reviews: 168,
    colorway: "Sail / University Red",
    colors: { upper: "#f7f5f0", accent: "#e23b3b", sole: "#ffffff", detail: "#d8d3c9", outsole: "#c2bcb1" },
    blurb: "A hardwood classic rebuilt with a padded collar, full-grain leather and a gum-tinted outsole.",
    specs: { Weight: "382 g (US M9)", Drop: "10 mm", Upper: "Full-grain leather", Cushioning: "Air-Sole unit" },
    featured: true,
  },
  {
    id: "terra-trail-gtx",
    name: "Terra Trail GTX",
    category: "Trail",
    price: 179,
    badge: "Limited",
    rating: 4.9,
    reviews: 96,
    colorway: "Sand / Olive",
    colors: { upper: "#d9cdb8", accent: "#6b7a4a", sole: "#efe9dd", detail: "#b8ab93", outsole: "#6f6752" },
    blurb: "Waterproof trail armour with a rock plate, aggressive lugs and a locked-in heel.",
    specs: { Weight: "312 g (US M9)", Drop: "6 mm", Upper: "Waterproof ripstop", Cushioning: "TrailFoam" },
    featured: true,
  },
  {
    id: "street-pulse",
    name: "Street Pulse",
    category: "Lifestyle",
    price: 124,
    badge: "",
    rating: 4.4,
    reviews: 302,
    colorway: "Wolf Grey / Royal",
    colors: { upper: "#cfd4da", accent: "#2f6bff", sole: "#f4f4f4", detail: "#a9b1ba", outsole: "#8b939c" },
    blurb: "Everyday comfort with a chunky foam wedge and a suede-and-mesh upper that goes with everything.",
    specs: { Weight: "298 g (US M9)", Drop: "9 mm", Upper: "Suede and mesh", Cushioning: "SoftFoam" },
    featured: true,
  },
  {
    id: "blaze-court-pro",
    name: "Blaze Court Pro",
    category: "Basketball",
    price: 189,
    badge: "New",
    rating: 4.7,
    reviews: 74,
    colorway: "Black / Metallic Gold",
    colors: { upper: "#16161a", accent: "#e8b23a", sole: "#f6f6f6", detail: "#2f2f37", outsole: "#0c0c0f" },
    blurb: "Court-ready responsiveness with a carbon plate, herringbone traction and a locked-down fit.",
    specs: { Weight: "364 g (US M9)", Drop: "9 mm", Upper: "Woven textile", Cushioning: "Zoom-style unit" },
    featured: false,
  },
  {
    id: "drift-knit",
    name: "Drift Knit",
    category: "Lifestyle",
    price: 129,
    badge: "",
    rating: 4.5,
    reviews: 189,
    colorway: "Cream / Pine",
    colors: { upper: "#f0ece4", accent: "#3f8f6b", sole: "#fffdf8", detail: "#d5cfc4", outsole: "#bdb6a9" },
    blurb: "A sock-like knit slip-on with a cushioned footbed — made for long days on your feet.",
    specs: { Weight: "238 g (US M9)", Drop: "7 mm", Upper: "Recycled knit", Cushioning: "CloudFoam" },
    featured: false,
  },
  {
    id: "velocity-runner-2",
    name: "Velocity Runner 2",
    category: "Running",
    price: 149,
    badge: "",
    rating: 4.6,
    reviews: 431,
    colorway: "Pink Foam / Black",
    colors: { upper: "#f2b8c6", accent: "#1a1a1a", sole: "#ffffff", detail: "#e2a1b1", outsole: "#cfc7c9" },
    blurb: "Tempo-day speed with a nylon plate, a rocker geometry and a breathable race-day upper.",
    specs: { Weight: "221 g (US M9)", Drop: "8 mm", Upper: "Mesh", Cushioning: "SpeedFoam" },
    featured: false,
  },
  {
    id: "apex-trainer",
    name: "Apex Trainer",
    category: "Training",
    price: 119,
    badge: "",
    rating: 4.3,
    reviews: 128,
    colorway: "Navy / Orange",
    colors: { upper: "#1f2a44", accent: "#ff7a2f", sole: "#f0f0f0", detail: "#2c3a5c", outsole: "#131a2b" },
    blurb: "A flat, stable platform for lifting with a rope-guard upper and grippy rubber wrap.",
    specs: { Weight: "342 g (US M9)", Drop: "4 mm", Upper: "Abrasion-resistant mesh", Cushioning: "FirmFoam" },
    featured: false,
  },
];

const SIZES = [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12];
CATALOG.forEach((product) => {
  product.sizes = SIZES;
});

const CATEGORIES = ["Running", "Basketball", "Lifestyle", "Training", "Trail"];

function findProduct(id) {
  return CATALOG.find((p) => p.id === id) || null;
}

function money(value) {
  const rounded = Math.round(value * 100) / 100;
  return "$" + (Number.isInteger(rounded) ? rounded : rounded.toFixed(2));
}
