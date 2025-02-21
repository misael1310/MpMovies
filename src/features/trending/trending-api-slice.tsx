import { createApi } from "@reduxjs/toolkit/query/react";
import {
  Trending,
  TMDBTrendingResponse,
  fetchTrendsArgs,
} from "./TrendingTypes";
import { baseQuery, fetchMultiplePages, FetchWithBQType } from "../RTK_Utils";

interface fetchCategoryArgs extends fetchTrendsArgs {
  endpoint: string;
  with_genres: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvSeries {
  backdrop_path: null | string;
  first_air_date: Date;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export const trendingApi = createApi({
  reducerPath: "trendingApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchTrends: builder.query<TMDBTrendingResponse, fetchTrendsArgs>({
      async queryFn(
        { fromPage, totalPages },
        _api,
        _extraOptions,
        fetchWithBQ,
      ) {
        const endpoint = "trending/all/week";
        const params = { language: "en-US" };

        const result = await fetchMultiplePages<Trending>(
          fetchWithBQ as FetchWithBQType,
          endpoint,
          fromPage,
          totalPages,
          params,
        );

        if ("error" in result) {
          return { error: result.error };
        }

        return {
          data: {
            nextPage: totalPages + 1,
            results: result.results.slice(0, 160),
            total_pages: totalPages,
          },
        };
      },
    }),
    fetchMovieCategories: builder.query<
      TMDBTrendingResponse,
      fetchCategoryArgs
    >({
      async queryFn(
        { endpoint, fromPage, totalPages, with_genres },
        _api,
        _extraOptions,
        fetchWithBQ,
      ) {
        const params = { language: "en-US", with_genres };
        const result = await fetchMultiplePages<Trending>(
          fetchWithBQ as FetchWithBQType,
          endpoint,
          fromPage,
          totalPages,
          params,
        );
        if ("error" in result) {
          return { error: result.error };
        }

        return {
          data: {
            nextPage: totalPages + 1,
            results: result.results.slice(0, 160),
            total_pages: totalPages,
          },
        };
      },
    }),
  }),
});

export const { useFetchTrendsQuery, useLazyFetchMovieCategoriesQuery } =
  trendingApi;
