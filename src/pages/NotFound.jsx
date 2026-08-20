import { Link } from "react-router-dom";
import { Telescope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-28 text-center">
      <Telescope size={40} strokeWidth={1.2} className="text-sky-amber mx-auto mb-6" />
      <h1 className="font-display text-3xl mb-3">Nothing in view out here</h1>
      <p className="text-sky-muted mb-8">
        That page isn't in the catalog. It may have been moved, or the link
        might be off by a degree or two.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-sky-amber text-sky-bg px-5 py-2.5 text-sm font-medium hover:brightness-110 transition"
      >
        Back to SkyMart
      </Link>
    </div>
  );
}
