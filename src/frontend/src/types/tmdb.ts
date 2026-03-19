export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
}

export interface MovieDetail extends Movie {
  tagline: string;
  runtime: number;
  genres: Genre[];
  status: string;
  budget: number;
  revenue: number;
  production_countries: { name: string }[];
  spoken_languages: { name: string }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Credits {
  cast: Cast[];
  crew: { id: number; name: string; job: string }[];
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
