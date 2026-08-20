import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Sun, Moon, Menu, X, TowerControl, ShoppingBag, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCatalog } from "../context/CatalogContext";

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(params.get("q") || "");
  const { count } = useCart();
  const { user } = useAuth();
  const { categories } = useCatalog();

  function handleSearch(e) {
    e.preventDefault();
    setOpen(false);
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/");
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-sky-border bg-sky-bg/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <TowerControl
              size={22}
              strokeWidth={1.6}
              className="text-sky-amber transition-transform group-hover:-rotate-6"
            />
            <span className="font-display text-lg font-semibold tracking-tight">
              SkyMart
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {categories.slice(0, 5).map((c) => (
              <NavLink
                key={c.slug}
                to={`/category/${c.slug}`}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-sky-card text-sky-text"
                      : "text-sky-muted hover:text-sky-text"
                  }`
                }
              >
                {c.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex items-center gap-2 bg-sky-card border border-sky-border rounded-full pl-3 pr-1 h-9 w-52 focus-within:border-sky-amber/60 transition-colors"
            >
              <Search size={15} className="text-sky-muted shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gear…"
                className="bg-transparent text-sm outline-none w-full placeholder:text-sky-muted"
              />
            </form>

            <Link
              to="/account"
              aria-label={user ? `Account: ${user.name}` : "Account"}
              title={user?.name}
              className="h-9 w-9 hidden sm:flex items-center justify-center rounded-full border border-sky-border text-sky-muted hover:text-sky-amber hover:border-sky-amber/50 transition-colors"
            >
              <User size={16} />
            </Link>

            <Link
              to="/cart"
              aria-label="View cart"
              className="relative h-9 w-9 flex items-center justify-center rounded-full border border-sky-border text-sky-muted hover:text-sky-amber hover:border-sky-amber/50 transition-colors"
            >
              <ShoppingBag size={16} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full bg-sky-amber text-sky-bg text-[10px] font-mono font-medium flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-sky-border text-sky-muted hover:text-sky-amber hover:border-sky-amber/50 transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-full border border-sky-border text-sky-muted"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-sky-card border border-sky-border rounded-full pl-3 pr-1 h-10">
              <Search size={15} className="text-sky-muted shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gear…"
                className="bg-transparent text-sm outline-none w-full placeholder:text-sky-muted"
              />
            </form>
            <div className="flex flex-col gap-1">
              {categories.map((c) => (
                <NavLink
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm ${
                      isActive ? "bg-sky-card text-sky-text" : "text-sky-muted"
                    }`
                  }
                >
                  {c.label}
                </NavLink>
              ))}
              <NavLink
                to="/account"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm ${
                    isActive ? "bg-sky-card text-sky-text" : "text-sky-muted"
                  }`
                }
              >
                Account
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
