import { movieGenres, tvGenres } from "./api";

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export const getMovieGenreNames = (ids: number[]) => {
  return ids
    .map((id) => {
      const genre = movieGenres.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .join(", ");
};

export const getTvGenreNames = (ids: number[]) => {
  return ids
    .map((id) => {
      const genre = tvGenres.find((g) => g.id === id);
      return genre ? genre.name : "";
    })
    .join(", ");
};
