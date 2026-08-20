import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { CatalogProvider } from "./context/CatalogContext";
import RequireAuth from "./components/RequireAuth";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SiteLayout({ theme, onToggleTheme, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-sky-bg text-sky-text font-body">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("skymart-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("skymart-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <AuthProvider>
      <CatalogProvider>
        <CartProvider>
          <div className="min-h-screen bg-sky-bg text-sky-text font-body">
            <ScrollToTop />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "var(--color-sky-card)",
                  color: "var(--color-sky-text)",
                  border: "1px solid var(--color-sky-border)",
                  borderRadius: "9999px",
                  padding: "10px 18px",
                  fontSize: "0.8125rem",
                  fontFamily: '"Inter", system-ui, sans-serif',
                  boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)",
                },
                success: {
                  iconTheme: {
                    primary: "var(--color-sky-amber)",
                    secondary: "var(--color-sky-bg)",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#f87171",
                    secondary: "var(--color-sky-bg)",
                  },
                },
              }}
            />
            <Routes>
            {/* Public auth pages — no shop navbar/footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Everything else requires signing in first */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                    <Home />
                  </SiteLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/category/:slug"
              element={
                <RequireAuth>
                  <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                    <Category />
                  </SiteLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/product/:id"
              element={
                <RequireAuth>
                  <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                    <ProductDetail />
                  </SiteLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/search"
              element={
                <RequireAuth>
                  <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                    <Search />
                  </SiteLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/cart"
              element={
                <RequireAuth>
                  <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                    <Cart />
                  </SiteLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/account"
              element={
                <RequireAuth>
                  <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                    <Account />
                  </SiteLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/404"
              element={
                <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                  <NotFound />
                </SiteLayout>
              }
            />
            <Route
              path="*"
              element={
                <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
                  <NotFound />
                </SiteLayout>
              }
            />
          </Routes>
          </div>
        </CartProvider>
      </CatalogProvider>
    </AuthProvider>
  );
}
