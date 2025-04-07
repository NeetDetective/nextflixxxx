import { options } from "./options";

const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  first_air_date: string;
  vote_average: number;
}

export interface IMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const movieGenres = [
  {
    id: 28,
    name: "액션",
  },
  {
    id: 12,
    name: "모험",
  },
  {
    id: 16,
    name: "애니메이션",
  },
  {
    id: 35,
    name: "코미디",
  },
  {
    id: 80,
    name: "범죄",
  },
  {
    id: 99,
    name: "다큐멘터리",
  },
  {
    id: 18,
    name: "드라마",
  },
  {
    id: 10751,
    name: "가족",
  },
  {
    id: 14,
    name: "판타지",
  },
  {
    id: 36,
    name: "역사",
  },
  {
    id: 27,
    name: "공포",
  },
  {
    id: 10402,
    name: "음악",
  },
  {
    id: 9648,
    name: "미스터리",
  },
  {
    id: 10749,
    name: "로맨스",
  },
  {
    id: 878,
    name: "SF",
  },
  {
    id: 10770,
    name: "TV 영화",
  },
  {
    id: 53,
    name: "스릴러",
  },
  {
    id: 10752,
    name: "전쟁",
  },
  {
    id: 37,
    name: "서부",
  },
];

export const tvGenres = [
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "애니메이션",
  },
  {
    id: 35,
    name: "코미디",
  },
  {
    id: 80,
    name: "범죄",
  },
  {
    id: 99,
    name: "다큐멘터리",
  },
  {
    id: 18,
    name: "드라마",
  },
  {
    id: 10751,
    name: "가족",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "미스터리",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "서부",
  },
];

export async function getTopRatedMovies() {
  const response = await (
    await fetch(
      `${BASE_PATH}/movie/top_rated?language=ko-KR&page=1&region=kr`,
      options
    )
  ).json();
  return response;
}

export async function getUpcomingMovies() {
  const response = await (
    await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1&region=kr",
      options
    )
  ).json();
  return response;
}

export async function getPopularMovies() {
  const response = await (
    await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=kr",
      options
    )
  ).json();
  return response;
}

export async function getNowPlayingMovies() {
  const response = await (
    await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=kr",
      options
    )
  ).json();
  return response;
}

export async function getAiringTodayTvs() {
  const response = await (
    await fetch(
      "https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=1",
      options
    )
  ).json();
  return response;
}

export async function getOnTheAirTvs() {
  const response = await (
    await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=1",
      options
    )
  ).json();
  return response;
}

export async function getPopularTvs() {
  const response = await (
    await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1",
      options
    )
  ).json();
  return response;
}

export async function getTopRatedTvs() {
  const response = await (
    await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1",
      options
    )
  ).json();
  return response;
}

export async function getMultiSearch(keyword: string) {
  const response = await (
    await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=ko-KR&page=1`,
      options
    )
  ).json();
  return response;
}

export async function getMovieDetail(movieId: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    options
  );
  const json = await response.json();
  return json;
}
