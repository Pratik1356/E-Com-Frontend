import { useParams, Link, Navigate } from "react-router-dom";
import { fetchProductsByCategory } from "../lib/api";
import { useAsync } from "../hooks/useAsync";
import { useCatalog } from "../context/CatalogContext";
import CategoryIcon from "../components/CategoryIcon";
import ProductCard from "../components/ProductCard";
import { LoadingState, ErrorState } from "../components/AsyncState";

export default function Category() {
  const { slug } = useParams();
  const { categories, loading: catalogLoading } = useCatalog();
  const category = categories.find((c) => c.slug === slug);

  const {
    data: items,
    error,
    loading,
    reload,
  } = useAsync(
    () => (category ? fetchProductsByCategory(category.name) : Promise.resolve([])),
    [category?.name]
  );

  if (!catalogLoading && categories.length > 0 && !category) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <nav className="text-xs text-sky-muted font-mono mb-6">
        <Link to="/" className="hover:text-sky-text">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-sky-text">{category?.label || "…"}</span>
      </nav>

      {category && (
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-sky-card border border-sky-border flex items-center justify-center text-sky-amber">
            <CategoryIcon name={category.icon} size={20} strokeWidth={1.6} />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl">{category.label}</h1>
        </div>
      )}
      {items && (
        <p className="text-sky-muted text-sm mb-8">
          {items.length} {items.length === 1 ? "product" : "products"} available
        </p>
      )}

      {(catalogLoading || loading) && <LoadingState label="Fetching category…" />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && items && items.length === 0 && (
        <p className="text-sky-muted text-sm">
          Nothing in this category yet — check back soon.
        </p>
      )}
      {!loading && !error && items && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
