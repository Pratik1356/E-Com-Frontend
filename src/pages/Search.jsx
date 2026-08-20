import { useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../lib/api";
import { useAsync } from "../hooks/useAsync";
import ProductCard from "../components/ProductCard";
import { LoadingState, ErrorState } from "../components/AsyncState";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();
  const { data: products, error, loading, reload } = useAsync(fetchAllProducts, []);

  const results = q && products
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-2xl sm:text-3xl mb-2">
        Search results for "{q}"
      </h1>
      {!loading && !error && (
        <p className="text-sky-muted text-sm mb-8">
          {results.length} {results.length === 1 ? "match" : "matches"}
        </p>
      )}

      {loading && <LoadingState label="Searching…" />}
      {!loading && error && <ErrorState message={error} onRetry={reload} />}
      {!loading && !error && results.length === 0 && (
        <p className="text-sky-muted text-sm">
          Nothing matched that search. Try a category name like{" "}
          <span className="text-sky-text">electronics</span> or{" "}
          <span className="text-sky-text">jewelery</span>.
        </p>
      )}
      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
