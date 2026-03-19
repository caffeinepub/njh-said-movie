import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Globe, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import { useMovieCredits, useMovieDetail } from "../hooks/useTMDB";
import { backdropUrl, posterUrl } from "../lib/tmdb";

export default function MovieDetailPage() {
  const { id } = useParams({ from: "/movie/$id" });
  const navigate = useNavigate();
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useMovieDetail(movieId);
  const { data: credits } = useMovieCredits(movieId);

  const topCast = credits?.cast.slice(0, 6) ?? [];
  const director = credits?.crew.find((c) => c.job === "Director");

  if (isLoading) {
    return (
      <div
        className="min-h-screen pt-16"
        data-ocid="movie-detail.loading_state"
      >
        <div
          className="w-full h-[60vh] animate-pulse"
          style={{ background: "oklch(0.15 0.018 252)" }}
        />
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div
        className="min-h-screen pt-16 flex items-center justify-center"
        data-ocid="movie-detail.error_state"
      >
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Film introuvable.</p>
          <Button
            type="button"
            onClick={() => navigate({ to: "/" })}
            variant="outline"
          >
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    );
  }

  const backdrop = backdropUrl(movie.backdrop_path);
  const poster = posterUrl(movie.poster_path, "w500");
  const rating = movie.vote_average.toFixed(1);
  const releaseFormatted = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const runtimeH = movie.runtime ? Math.floor(movie.runtime / 60) : null;
  const runtimeM = movie.runtime ? movie.runtime % 60 : null;
  const runtimeStr = runtimeH !== null ? `${runtimeH}h ${runtimeM}min` : null;

  return (
    <main className="min-h-screen" data-ocid="movie-detail.panel">
      <div className="relative w-full h-[70vh] overflow-hidden">
        {backdrop && (
          <img
            src={backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.108 0.012 252 / 0.3) 0%, oklch(0.108 0.012 252 / 0.7) 60%, oklch(0.108 0.012 252) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.108 0.012 252 / 0.9) 0%, transparent 50%)",
          }}
        />

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="absolute top-20 left-4 md:left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          data-ocid="movie-detail.cancel_button"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background: "oklch(0.15 0.018 252 / 0.8)" }}
          >
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="hidden sm:block">Retour</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-40 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {poster && (
            <div className="shrink-0 hidden md:block">
              <img
                src={poster}
                alt={movie.title}
                className="w-56 lg:w-64 rounded-2xl"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.7)" }}
              />
            </div>
          )}

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p
                  className="text-base italic"
                  style={{ color: "oklch(0.82 0.14 210)" }}
                >
                  &quot;{movie.tagline}&quot;
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span
                className="flex items-center gap-1.5 font-bold text-base"
                style={{ color: "oklch(0.83 0.15 80)" }}
              >
                <Star className="w-4 h-4 fill-current" />
                {rating}
                <span className="text-xs font-normal text-muted-foreground">
                  / 10
                </span>
              </span>
              {runtimeStr && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {runtimeStr}
                </span>
              )}
              {releaseFormatted && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {releaseFormatted}
                </span>
              )}
              {movie.original_language && (
                <span className="flex items-center gap-1.5 text-muted-foreground uppercase">
                  <Globe className="w-4 h-4" />
                  {movie.original_language}
                </span>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <Badge
                    key={g.id}
                    variant="outline"
                    className="text-xs font-medium border-white/20 text-muted-foreground"
                  >
                    {g.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Synopsis
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {movie.overview || "Aucune description disponible."}
              </p>
            </div>

            {director && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Réalisateur:{" "}
                </span>
                <span className="text-sm text-foreground">{director.name}</span>
              </div>
            )}

            {topCast.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Casting principal
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topCast.map((actor) => (
                    <span
                      key={actor.id}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "oklch(0.18 0.022 252)",
                        border: "1px solid oklch(0.26 0.03 252)",
                        color: "oklch(0.72 0.018 252)",
                      }}
                    >
                      {actor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                size="lg"
                className="gap-2 font-bold text-white border-0 hover:opacity-90 gradient-cta"
                data-ocid="movie-detail.primary_button"
              >
                <Play className="w-5 h-5 fill-white" />
                Regarder maintenant
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
