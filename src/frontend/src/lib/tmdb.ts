const API_KEY = "20e2a2c847c0c57ac2e855218fd59c09";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const posterUrl = (path: string | null, size = "w342") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const backdropUrl = (path: string | null, size = "original") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "fr-FR");
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json() as Promise<T>;
}

export const tmdb = {
  getPopular: (page = 1) =>
    tmdbFetch<
      import("../types/tmdb").TMDBResponse<import("../types/tmdb").Movie>
    >("/movie/popular", { page: String(page) }),
  getNowPlaying: (page = 1) =>
    tmdbFetch<
      import("../types/tmdb").TMDBResponse<import("../types/tmdb").Movie>
    >("/movie/now_playing", { page: String(page) }),
  getDetail: (id: number) =>
    tmdbFetch<import("../types/tmdb").MovieDetail>(`/movie/${id}`),
  getCredits: (id: number) =>
    tmdbFetch<import("../types/tmdb").Credits>(`/movie/${id}/credits`),
};
