import { useNavigate } from "react-router-dom";
import { UserCircle2, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast("Signed out", { icon: "👋" });
    navigate("/login", { replace: true });
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-16 sm:py-24 text-center">
      <UserCircle2 size={48} strokeWidth={1.2} className="text-sky-amber mx-auto mb-5" />
      <h1 className="font-display text-2xl sm:text-3xl mb-1">
        {user?.name || "Signed in"}
      </h1>
      <p className="text-sky-muted text-sm mb-8">{user?.email}</p>

      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-full border border-sky-border px-5 py-2.5 text-sm font-medium text-sky-text hover:border-red-400/50 hover:text-red-400 transition-colors"
      >
        <LogOut size={15} />
        Sign out
      </button>
    </div>
  );
}
