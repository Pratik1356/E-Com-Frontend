import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, TowerControl, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Enter both an email and a password to continue.");
      return;
    }

    setSubmitting(true);
    // No backend is wired up yet — this simulates a request so the flow
    // (loading state, redirect) is in place for when one is connected.
    setTimeout(() => {
      setSubmitting(false);
      login({ email: form.email });
      toast.success("Signed in — welcome back.");
      navigate(from, { replace: true });
    }, 700);
  }

  return (
    <div className="relative mx-auto max-w-md px-4 sm:px-6 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center mb-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <TowerControl size={22} strokeWidth={1.6} className="text-sky-amber" />
          <span className="font-display text-lg font-semibold">SkyMart</span>
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl">Welcome back</h1>
        <p className="text-sky-muted text-sm mt-2">
          Sign in to check on your orders and saved gear.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-sky-border bg-sky-card p-6 sm:p-8"
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wide text-sky-muted">
            Email
          </span>
          <div className="flex items-center gap-2 rounded-xl border border-sky-border bg-sky-bg px-3 h-11 focus-within:border-sky-amber/60 transition-colors">
            <Mail size={16} className="text-sky-muted shrink-0" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="bg-transparent text-sm outline-none w-full placeholder:text-sky-muted"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wide text-sky-muted">
            Password
          </span>
          <div className="flex items-center gap-2 rounded-xl border border-sky-border bg-sky-bg px-3 h-11 focus-within:border-sky-amber/60 transition-colors">
            <Lock size={16} className="text-sky-muted shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className="bg-transparent text-sm outline-none w-full placeholder:text-sky-muted"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-sky-muted hover:text-sky-text shrink-0"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-sky-muted">
            <input type="checkbox" className="accent-sky-amber" />
            Remember me
          </label>
          <a href="#" className="text-sky-muted hover:text-sky-text transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-sky-amber text-sky-bg h-11 text-sm font-medium hover:brightness-110 transition disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-sky-muted mt-6">
        New to SkyMart?{" "}
        <Link to="/register" className="text-sky-text hover:text-sky-amber transition-colors">
          Create an account
        </Link>
      </p>
    </div>
  );
}
