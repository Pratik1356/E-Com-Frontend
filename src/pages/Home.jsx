import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchAllProducts } from "../lib/api";
import { useAsync } from "../hooks/useAsync";
import { useCatalog } from "../context/CatalogContext";
import CategoryIcon from "../components/CategoryIcon";
import ProductCard from "../components/ProductCard";
import { LoadingState, ErrorState } from "../components/AsyncState";

export default function Home() {
  const { categories } = useCatalog();
  const { data: products, error, loading, reload } = useAsync(fetchAllProducts, []);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-sky-border">
        <div className="starfield" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-amber mb-4">
            Live catalog · Fake Store API
          </p>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-2xl">
            A storefront that pulls real product data, live.
          </h1>
          <p className="text-sky-muted mt-5 max-w-lg text-base sm:text-lg">
            Every card, price, and rating on this page is fetched from
            fakestoreapi.com — nothing here is hardcoded.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-full bg-sky-amber text-sky-bg px-5 py-2.5 text-sm font-medium hover:brightness-110 transition"
            >
              Browse catalog
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className="shrink-0 flex items-center gap-2 rounded-full border border-sky-border bg-sky-card px-4 py-2 text-sm text-sky-muted hover:text-sky-text hover:border-sky-amber/50 transition-colors"
              >
                <CategoryIcon name={c.icon} size={16} strokeWidth={1.6} />
                {c.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="catalog" className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 scroll-mt-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-xl">Full catalog</h2>
          {products && (
            <span className="text-xs font-mono text-sky-muted">
              {products.length} items
            </span>
          )}
        </div>

        {loading && <LoadingState label="Fetching products…" />}
        {!loading && error && (
          <ErrorState message={error} onRetry={reload} />
        )}
        {!loading && !error && products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
