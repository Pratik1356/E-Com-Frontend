import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User, TowerControl, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Fill in your name, email, and a password to continue.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password needs to be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    // No backend is wired up yet — this simulates a request so the flow
    // (loading state, redirect) is in place for when one is connected.
    setTimeout(() => {
      setSubmitting(false);
      login({ name: form.name, email: form.email });
      toast.success(`Welcome to SkyMart, ${form.name.split(" ")[0]}.`);
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
        <h1 className="font-display text-2xl sm:text-3xl">Create your account</h1>
        <p className="text-sky-muted text-sm mt-2">
          Track orders and save gear to come back to later.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-sky-border bg-sky-card p-6 sm:p-8"
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wide text-sky-muted">
            Full name
          </span>
          <div className="flex items-center gap-2 rounded-xl border border-sky-border bg-sky-bg px-3 h-11 focus-within:border-sky-amber/60 transition-colors">
            <User size={16} className="text-sky-muted shrink-0" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ada Lovelace"
              autoComplete="name"
              className="bg-transparent text-sm outline-none w-full placeholder:text-sky-muted"
            />
          </div>
        </label>

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
              placeholder="At least 8 characters"
              autoComplete="new-password"
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

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wide text-sky-muted">
            Confirm password
          </span>
          <div className="flex items-center gap-2 rounded-xl border border-sky-border bg-sky-bg px-3 h-11 focus-within:border-sky-amber/60 transition-colors">
            <Lock size={16} className="text-sky-muted shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
              className="bg-transparent text-sm outline-none w-full placeholder:text-sky-muted"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-sky-amber text-sky-bg h-11 text-sm font-medium hover:brightness-110 transition disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-sky-muted mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-sky-text hover:text-sky-amber transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
