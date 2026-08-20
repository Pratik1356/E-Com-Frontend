const BASE_URL = "https://fakestoreapi.com";

// Fake Store API only gives us: id, title, price, description, category,
// image, rating: { rate, count }. These maps fill in the extra visual
// details (icon, accent color) our UI wants, keyed by category name.
const CATEGORY_ICON = {
  electronics: "Cpu",
  jewelery: "Gem",
  "men's clothing": "Shirt",
  "women's clothing": "Sparkles",
};

const CATEGORY_ACCENT = {
  electronics: "cyan",
  jewelery: "amber",
  "men's clothing": "violet",
  "women's clothing": "violet",
};

export function slugify(category) {
  return category
    .toLowerCase()
    .replace(/'/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function categoryLabel(category) {
  return category.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function categoryIcon(category) {
  return CATEGORY_ICON[category] || "Package";
}

export function categoryAccent(category) {
  return CATEGORY_ACCENT[category] || "amber";
}

// The API has no stock field — derive a stable, deterministic pseudo-stock
// per product id so "low stock" badges are consistent across renders.
function pseudoStock(id) {
  return 6 + ((id * 37) % 45);
}

function normalizeProduct(raw) {
  const description = raw.description || "";
  return {
    id: String(raw.id),
    name: raw.title,
    category: raw.category,
    categorySlug: slugify(raw.category),
    price: raw.price,
    rating: raw.rating?.rate ?? 0,
    reviews: raw.rating?.count ?? 0,
    image: raw.image,
    description,
    tagline:
      description.length > 110 ? `${description.slice(0, 110).trim()}…` : description,
    icon: categoryIcon(raw.category),
    accent: categoryAccent(raw.category),
    stock: pseudoStock(raw.id),
  };
}

async function getJSON(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Fake Store API request failed (${res.status})`);
  }
  return res.json();
}

export async function fetchAllProducts() {
  const data = await getJSON("/products");
  return data.map(normalizeProduct);
}

export async function fetchProductById(id) {
  const data = await getJSON(`/products/${id}`);
  return normalizeProduct(data);
}

export async function fetchCategories() {
  return getJSON("/products/categories");
}

export async function fetchProductsByCategory(category) {
  const data = await getJSON(`/products/category/${encodeURIComponent(category)}`);
  return data.map(normalizeProduct);
}
