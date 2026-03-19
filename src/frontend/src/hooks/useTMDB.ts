import { useQuery } from "@tanstack/react-query";
import { tmdb } from "../lib/tmdb";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => tmdb.getPopular(page),
    staleTime: 5 * 60 * 1000,
  });
}

export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: ["movies", "now_playing", page],
    queryFn: () => tmdb.getNowPlaying(page),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => tmdb.getDetail(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: ["movie", id, "credits"],
    queryFn: () => tmdb.getCredits(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
