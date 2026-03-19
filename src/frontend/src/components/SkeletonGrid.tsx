import MovieCardSkeleton from "./MovieCardSkeleton";

const SKELETON_KEYS_10 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const SKELETON_KEYS_6 = ["a", "b", "c", "d", "e", "f"];

export function SkeletonGrid() {
  return (
    <>
      {SKELETON_KEYS_10.map((k) => (
        <MovieCardSkeleton key={k} />
      ))}
    </>
  );
}

export function SkeletonCarousel() {
  return (
    <>
      {SKELETON_KEYS_6.map((k) => (
        <div key={k} className="shrink-0 w-44">
          <MovieCardSkeleton />
        </div>
      ))}
    </>
  );
}
