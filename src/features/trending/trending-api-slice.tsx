import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Trending,
  TMDBTrendingResponse,
  fetchTrendsArgs,
} from './TrendingTypes';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_THEMOVIEDB_API_URL as string;
const accessToken = import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN as string;

export const trendingApi = createApi({
  reducerPath: 'trendingApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchTrends: builder.query<TMDBTrendingResponse, fetchTrendsArgs>({
      async queryFn(
        { fromPage, totalPages },
        _api,
        _extraOptions,
        fetchWithBQ,
      ) {
        try {
          const currentPage = fromPage - 1;

          const fetchRequests = Array.from(
            { length: totalPages },
            (_, index) => {
              console.log({ page: currentPage + index + 1, currentPage });
              return fetchWithBQ({
                url: 'trending/all/week',
                params: { language: 'en-US', page: currentPage + index + 1 },
              });
            },
          );

          const responses = await Promise.allSettled(fetchRequests);

          const successfulResults: Trending[] = [];
          for (const response of responses) {
            if (response.status === 'fulfilled' && response.value.data) {
              successfulResults.push(
                ...(response.value.data as TMDBTrendingResponse).results,
              );
            }
          }

          if (successfulResults.length === 0) {
            return {
              error: {
                status: 500,
                data: 'All API requests failed',
              } as FetchBaseQueryError,
            };
          }

          return {
            data: {
              nextPage: totalPages + 1,
              results: successfulResults.slice(0, 160),
              total_pages: totalPages,
            },
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: (error as Error).message || 'Unknown error',
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const { useFetchTrendsQuery } = trendingApi;
