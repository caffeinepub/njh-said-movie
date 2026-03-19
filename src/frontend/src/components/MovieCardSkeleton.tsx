export default function MovieCardSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "oklch(0.15 0.018 252)" }}
    >
      <div
        className="aspect-[2/3] animate-pulse"
        style={{ background: "oklch(0.2 0.02 252)" }}
      />
      <div className="p-3 space-y-2">
        <div
          className="h-4 rounded animate-pulse"
          style={{ background: "oklch(0.2 0.02 252)", width: "80%" }}
        />
        <div
          className="h-3 rounded animate-pulse"
          style={{ background: "oklch(0.18 0.02 252)", width: "40%" }}
        />
      </div>
    </div>
  );
}
