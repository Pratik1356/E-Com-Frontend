import { TowerControl } from "lucide-react";
import { Link } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";

export default function Footer() {
  const { categories } = useCatalog();

  return (
    <footer className="border-t border-sky-border mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row sm:items-start justify-between gap-8">
        <div className="flex items-start gap-2">
          <TowerControl size={20} strokeWidth={1.6} className="text-sky-amber mt-0.5" />
          <div>
            <p className="font-display text-sm">SkyMart</p>
            <p className="text-xs text-sky-muted mt-1 max-w-[220px]">
              A storefront powered by live data from the Fake Store API.
            </p>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-sky-muted font-mono mb-2">
                Shop
              </p>
              <ul className="flex flex-col gap-1.5 text-sm">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/category/${c.slug}`}
                      className="text-sky-muted hover:text-sky-text transition-colors"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-sky-border">
        <p className="text-center text-xs text-sky-muted py-4">
          © {new Date().getFullYear()} SkyMart. Built with React &amp; React Router.
        </p>
      </div>
    </footer>
  );
}
