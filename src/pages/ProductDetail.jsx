import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import toast from "react-hot-toast";
import { fetchProductById, fetchProductsByCategory } from "../lib/api";
import { useAsync } from "../hooks/useAsync";
import { useCatalog } from "../context/CatalogContext";
import CategoryIcon from "../components/CategoryIcon";
import RatingStars from "../components/RatingStars";
import ProductCard from "../components/ProductCard";
import { LoadingState, ErrorState } from "../components/AsyncState";
import { useCart } from "../context/CartContext";

const ACCENTS = {
  amber: "from-sky-amber/25 via-sky-amber/5",
  violet: "from-sky-violet/25 via-sky-violet/5",
  cyan: "from-sky-cyan/25 via-sky-cyan/5",
};
const ACCENT_TEXT = {
  amber: "text-sky-amber",
  violet: "text-sky-violet",
  cyan: "text-sky-cyan",
};
const ACCENT_BTN = {
  amber: "bg-sky-amber text-sky-bg",
  violet: "bg-sky-violet text-sky-bg",
  cyan: "bg-sky-cyan text-sky-bg",
};

export default function ProductDetail() {
  const { id } = useParams();
  const { categories } = useCatalog();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const {
    data: product,
    error,
    loading,
    reload,
  } = useAsync(() => fetchProductById(id), [id]);

  const { data: related } = useAsync(
    () => (product ? fetchProductsByCategory(product.category) : Promise.resolve([])),
    [product?.category]
  );

  if (loading) return <LoadingState label="Fetching product…" />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!product) return <Navigate to="/404" replace />;

  const category = categories.find((c) => c.slug === product.categorySlug);
  const relatedItems = (related || []).filter((p) => p.id !== product.id).slice(0, 3);

  const specs = [
    { label: "Category", value: category?.label || product.category },
    { label: "Rating", value: `${product.rating.toFixed(1)} / 5` },
    { label: "Reviews", value: `${product.reviews}` },
    { label: "Product ID", value: `#${product.id}` },
  ];

  function handleAddToCart() {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <nav className="text-xs text-sky-muted font-mono mb-8 flex flex-wrap items-center gap-1">
        <Link to="/" className="hover:text-sky-text">
          Home
        </Link>
        <span>/</span>
        <Link to={`/category/${product.categorySlug}`} className="hover:text-sky-text">
          {category?.label || product.category}
        </Link>
        <span>/</span>
        <span className="text-sky-text line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div
          className={`relative aspect-square rounded-3xl overflow-hidden border border-sky-border bg-gradient-to-br ${ACCENTS[product.accent]} to-transparent flex items-center justify-center p-10`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 h-full w-full object-contain drop-shadow-xl"
          />

          <div
            className={`absolute bottom-5 left-5 h-11 w-11 rounded-full flex items-center justify-center bg-sky-bg/80 border border-sky-border ${ACCENT_TEXT[product.accent]}`}
          >
            <CategoryIcon name={product.icon} size={20} strokeWidth={1.6} />
          </div>

          {product.stock <= 8 && (
            <span className="absolute top-5 left-5 rounded-full bg-sky-bg/80 border border-sky-border px-3 py-1 text-[11px] font-mono uppercase tracking-wide text-sky-muted">
              Only {product.stock} left
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-sky-muted font-mono mb-3">
            {category?.label || product.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight">
            {product.name}
          </h1>
          <div className="mt-3">
            <RatingStars rating={product.rating} reviews={product.reviews} size={16} />
          </div>

          <p className="text-sky-muted mt-5 leading-relaxed">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-sky-border bg-sky-card px-3 py-2.5"
              >
                <p className="text-[10px] uppercase tracking-wide text-sky-muted font-mono">
                  {s.label}
                </p>
                <p className="text-sm font-mono mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-end justify-between border-t border-sky-border pt-6">
            <div>
              <p className="text-[11px] text-sky-muted font-mono uppercase tracking-wide">
                Price
              </p>
              <p className="font-display text-3xl mt-1">${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${
                added
                  ? "bg-sky-card border border-sky-border text-sky-text"
                  : `${ACCENT_BTN[product.accent]} hover:brightness-110`
              }`}
            >
              {added ? (
                <>
                  <CheckCircle2 size={16} /> Added
                </>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 text-sm text-sky-muted">
            <div className="flex items-center gap-2">
              <Truck size={15} /> Ships in 2–4 business days
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} /> 2-year manufacturer warranty
            </div>
          </div>
        </div>
      </div>

      {relatedItems.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-xl mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
