import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import toast from "react-hot-toast";
import CategoryIcon from "./CategoryIcon";
import RatingStars from "./RatingStars";
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

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col rounded-2xl border border-sky-border bg-sky-card overflow-hidden transition-all hover:border-sky-amber/50 hover:-translate-y-0.5"
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${ACCENTS[product.accent]} to-transparent p-6`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
        />

        <div
          className={`absolute bottom-3 left-3 h-8 w-8 rounded-full flex items-center justify-center bg-sky-bg/80 border border-sky-border ${ACCENT_TEXT[product.accent]}`}
        >
          <CategoryIcon name={product.icon} size={15} strokeWidth={1.6} />
        </div>

        {product.stock <= 8 && (
          <span className="absolute top-3 left-3 rounded-full bg-sky-bg/80 border border-sky-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-sky-muted">
            Low stock
          </span>
        )}
        <button
          onClick={handleQuickAdd}
          aria-label={`Add ${product.name} to cart`}
          className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center border transition-colors ${
            added
              ? "bg-sky-amber border-sky-amber text-sky-bg"
              : "bg-sky-bg/80 border-sky-border text-sky-muted hover:text-sky-text hover:border-sky-amber/50"
          }`}
        >
          {added ? <Check size={14} /> : <Plus size={14} />}
        </button>
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <span className="text-[11px] uppercase tracking-wide text-sky-muted font-mono">
          {product.category}
        </span>
        <h3 className="font-display text-base leading-snug">{product.name}</h3>
        <p className="text-sm text-sky-muted line-clamp-2">{product.tagline}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <RatingStars rating={product.rating} reviews={product.reviews} />
          <span className="font-mono text-sm font-medium">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
