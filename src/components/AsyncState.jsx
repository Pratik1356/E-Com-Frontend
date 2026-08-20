import { Loader2, AlertTriangle } from "lucide-react";

export function LoadingState({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-sky-muted">
      <Loader2 size={22} className="animate-spin text-sky-amber" />
      <p className="text-sm font-mono">{label}</p>
    </div>
  );
}

export function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center px-4">
      <AlertTriangle size={22} className="text-red-400" />
      <p className="text-sm text-sky-muted max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 rounded-full border border-sky-border px-4 py-1.5 text-xs text-sky-text hover:border-sky-amber/50 hover:text-sky-amber transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
