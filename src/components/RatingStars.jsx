import { Star } from "lucide-react";

export default function RatingStars({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={
              i < Math.round(rating)
                ? "fill-sky-amber text-sky-amber"
                : "fill-transparent text-sky-border"
            }
          />
        ))}
      </div>
      <span className="text-xs text-sky-muted font-mono">
        {rating.toFixed(1)}
        {reviews != null && <span> · {reviews}</span>}
      </span>
    </div>
  );
}
