import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Info,
  Play,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import MovieCard from "../components/MovieCard";
import { SkeletonCarousel, SkeletonGrid } from "../components/SkeletonGrid";
import { useNowPlayingMovies, usePopularMovies } from "../hooks/useTMDB";
import { backdropUrl, posterUrl } from "../lib/tmdb";
import type { Movie } from "../types/tmdb";

function HeroSection({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  const backdrop = backdropUrl(movie.backdrop_path);
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const rating = movie.vote_average.toFixed(1);

  return (
    <section
      className="relative w-full min-h-[90vh] flex items-end pb-16 overflow-hidden"
      data-ocid="hero.section"
    >
      {backdrop && (
        <div className="absolute inset-0">
          <img
            src={backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-48 hero-gradient-bottom" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl"
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-white"
            style={{ background: "oklch(0.54 0.24 15)" }}
          >
            À l&apos;affiche
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-4">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {year}
            </span>
            <span
              className="flex items-center gap-1 font-semibold"
              style={{ color: "oklch(0.83 0.15 80)" }}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              {rating}
            </span>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 mb-8">
            {movie.overview || "Aucune description disponible."}
          </p>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="lg"
              className="gap-2 font-semibold text-white border-0 hover:opacity-90 gradient-cta"
              onClick={() =>
                navigate({ to: "/movie/$id", params: { id: String(movie.id) } })
              }
              data-ocid="hero.primary_button"
            >
              <Play className="w-5 h-5 fill-white" />
              Regarder
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="gap-2 font-semibold border-white/20 hover:bg-white/10 hover:border-white/30 text-white"
              onClick={() =>
                navigate({ to: "/movie/$id", params: { id: String(movie.id) } })
              }
              data-ocid="hero.secondary_button"
              style={{ background: "oklch(0.18 0.022 252 / 0.8)" }}
            >
              <Info className="w-5 h-5" />
              Plus d&apos;infos
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CarouselSection({
  title,
  movies,
  id,
}: { title: string; movies: Movie[]; id?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className="relative py-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg sm:text-xl font-black uppercase tracking-widest"
            style={{ color: "oklch(0.96 0.008 252)" }}
          >
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "oklch(0.18 0.022 252)",
                border: "1px solid oklch(0.26 0.03 252)",
              }}
              data-ocid="carousel.pagination_prev"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "oklch(0.18 0.022 252)",
                border: "1px solid oklch(0.26 0.03 252)",
              }}
              data-ocid="carousel.pagination_next"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {movies.map((movie, i) => (
            <div
              key={movie.id}
              className="shrink-0 w-36 sm:w-44 md:w-48"
              style={{ scrollSnapAlign: "start" }}
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <button
                  type="button"
                  className="w-full text-left group block rounded-xl overflow-hidden"
                  onClick={() =>
                    navigate({
                      to: "/movie/$id",
                      params: { id: String(movie.id) },
                    })
                  }
                  style={{
                    background: "oklch(0.15 0.018 252)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                  }}
                  data-ocid={`carousel.item.${i + 1}`}
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    {movie.poster_path ? (
                      <img
                        src={posterUrl(movie.poster_path, "w342") ?? ""}
                        alt={movie.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ background: "oklch(0.18 0.022 252)" }}
                      />
                    )}
                    <div
                      className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: "oklch(0.1 0.01 252 / 0.85)" }}
                    >
                      <Star
                        className="w-2.5 h-2.5 fill-current"
                        style={{ color: "oklch(0.83 0.15 80)" }}
                      />
                      <span style={{ color: "oklch(0.83 0.15 80)" }}>
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-foreground truncate">
                      {movie.title}
                    </p>
                  </div>
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { data: popularData, isLoading: loadingPopular } = usePopularMovies();
  const { data: nowPlayingData, isLoading: loadingNowPlaying } =
    useNowPlayingMovies();

  const popularMovies = popularData?.results ?? [];
  const nowPlayingMovies = nowPlayingData?.results ?? [];
  const heroMovie = popularMovies[0];

  return (
    <main>
      {/* App Title Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full py-6 px-4 md:px-8 flex items-center justify-center gap-3"
        style={{ background: "oklch(0.10 0.018 252)" }}
      >
        <Clapperboard
          className="w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0"
          style={{ color: "oklch(0.70 0.18 270)" }}
        />
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.18 210), oklch(0.62 0.22 290))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Njh-said Movie
        </h1>
      </motion.div>

      {loadingPopular ? (
        <div
          className="w-full min-h-[90vh] animate-pulse"
          style={{ background: "oklch(0.14 0.018 252)" }}
          data-ocid="hero.loading_state"
        />
      ) : heroMovie ? (
        <HeroSection movie={heroMovie} />
      ) : null}

      <section className="py-10" id="popular">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <h2
            className="text-lg sm:text-xl font-black uppercase tracking-widest mb-8"
            style={{ color: "oklch(0.96 0.008 252)" }}
          >
            Films Populaires
          </h2>

          {loadingPopular ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              data-ocid="movies.loading_state"
            >
              <SkeletonGrid />
            </div>
          ) : popularMovies.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="movies.empty_state"
            >
              Aucun film disponible.
            </div>
          ) : (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              data-ocid="movies.table"
            >
              {popularMovies.slice(1).map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {loadingNowPlaying ? (
        <div className="py-10">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8">
            <div
              className="h-6 w-48 rounded animate-pulse mb-6"
              style={{ background: "oklch(0.18 0.022 252)" }}
            />
            <div className="flex gap-4 overflow-hidden">
              <SkeletonCarousel />
            </div>
          </div>
        </div>
      ) : nowPlayingMovies.length > 0 ? (
        <CarouselSection
          title="Nouveautés"
          movies={nowPlayingMovies}
          id="new-releases"
        />
      ) : null}
    </main>
  );
}
