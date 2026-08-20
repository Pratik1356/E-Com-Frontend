import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

const ACCENTS = {
  amber: "from-sky-amber/25 via-sky-amber/5",
  violet: "from-sky-violet/25 via-sky-violet/5",
  cyan: "from-sky-cyan/25 via-sky-cyan/5",
};

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, clearCart } = useCart();

  function handleRemove(item) {
    removeFromCart(item.id);
    toast(`${item.name} removed from cart`, { icon: "🗑️" });
  }

  function handleClear() {
    clearCart();
    toast(`Cart cleared`, { icon: "🗑️" });
  }

  function handleCheckout() {
    toast("Checkout isn't wired up in this demo yet", { icon: "🚧" });
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 py-28 text-center">
        <ShoppingBag size={40} strokeWidth={1.2} className="text-sky-amber mx-auto mb-6" />
        <h1 className="font-display text-3xl mb-3">Your cart is empty</h1>
        <p className="text-sky-muted mb-8">
          Nothing added yet — browse the catalog and find something worth
          waiting up for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-sky-amber text-sky-bg px-5 py-2.5 text-sm font-medium hover:brightness-110 transition"
        >
          Browse SkyMart
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="font-display text-2xl sm:text-3xl">Your cart</h1>
        <button
          onClick={handleClear}
          className="text-xs font-mono text-sky-muted hover:text-sky-text transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-sky-border bg-sky-card p-4"
          >
            <Link
              to={`/product/${item.id}`}
              className={`relative shrink-0 h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br ${ACCENTS[item.accent]} to-transparent p-2`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="relative z-10 h-full w-full object-contain"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                to={`/product/${item.id}`}
                className="font-display text-sm sm:text-base hover:text-sky-amber transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-xs text-sky-muted font-mono mt-0.5 capitalize">
                {item.category}
              </p>
            </div>

            <div className="flex items-center gap-2 border border-sky-border rounded-full px-1 py-1">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                aria-label="Decrease quantity"
                className="h-7 w-7 flex items-center justify-center rounded-full text-sky-muted hover:text-sky-text"
              >
                <Minus size={13} />
              </button>
              <span className="w-6 text-center font-mono text-sm">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                aria-label="Increase quantity"
                className="h-7 w-7 flex items-center justify-center rounded-full text-sky-muted hover:text-sky-text"
              >
                <Plus size={13} />
              </button>
            </div>

            <p className="w-20 text-right font-mono text-sm shrink-0">
              ${(item.price * item.qty).toFixed(2)}
            </p>

            <button
              onClick={() => handleRemove(item)}
              aria-label={`Remove ${item.name}`}
              className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full text-sky-muted hover:text-sky-amber transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-end gap-4 border-t border-sky-border pt-6">
        <div className="flex items-baseline gap-3">
          <span className="text-sm text-sky-muted">Subtotal</span>
          <span className="font-display text-2xl">${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="inline-flex items-center gap-2 rounded-full bg-sky-amber text-sky-bg px-6 py-3 text-sm font-medium hover:brightness-110 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
