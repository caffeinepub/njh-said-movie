import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Info, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import { posterUrl } from "../lib/tmdb";
import type { Movie } from "../types/tmdb";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const navigate = useNavigate();
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const rating = movie.vote_average.toFixed(1);
  const poster = posterUrl(movie.poster_path, "w342");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col"
    >
      <Link
        to="/movie/$id"
        params={{ id: String(movie.id) }}
        data-ocid={`movies.item.${index + 1}`}
        className="group block rounded-t-xl overflow-hidden flex-1"
        style={{
          background: "oklch(0.15 0.018 252)",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.5)",
        }}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {poster ? (
            <img
              src={poster}
              alt={movie.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "oklch(0.18 0.022 252)" }}
            >
              <Play
                className="w-12 h-12"
                style={{ color: "oklch(0.4 0.05 260)" }}
              />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.57 0.19 260), oklch(0.52 0.22 290))",
              }}
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Rating badge */}
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
            style={{ background: "oklch(0.1 0.01 252 / 0.85)" }}
          >
            <Star
              className="w-3 h-3 fill-current"
              style={{ color: "oklch(0.83 0.15 80)" }}
            />
            <span style={{ color: "oklch(0.83 0.15 80)" }}>{rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm text-foreground truncate mb-1 group-hover:text-white transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="w-3 h-3" />
            <span>{year}</span>
          </div>
        </div>
      </Link>

      {/* Détails button */}
      <div
        className="px-3 pb-3 pt-2 rounded-b-xl"
        style={{
          background: "oklch(0.15 0.018 252)",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.5)",
        }}
      >
        <Button
          type="button"
          size="sm"
          className="w-full gap-1.5 font-semibold text-white border-0 hover:opacity-90 text-xs gradient-cta"
          onClick={() =>
            navigate({ to: "/movie/$id", params: { id: String(movie.id) } })
          }
          data-ocid={`movies.button.${index + 1}`}
        >
          <Info className="w-3.5 h-3.5" />
          Détails
        </Button>
      </div>
    </motion.div>
  );
}
