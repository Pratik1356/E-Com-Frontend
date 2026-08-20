import { createContext, useContext } from "react";
import { fetchCategories, slugify, categoryLabel, categoryIcon } from "../lib/api";
import { useAsync } from "../hooks/useAsync";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const { data, error, loading } = useAsync(fetchCategories, []);

  const categories = (data || []).map((name) => ({
    name,
    slug: slugify(name),
    label: categoryLabel(name),
    icon: categoryIcon(name),
  }));

  return (
    <CatalogContext.Provider value={{ categories, loading, error }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within a CatalogProvider");
  return ctx;
}
