import {
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export type FetchWithBQType = (
  arg: Parameters<typeof baseQuery>[0],
) => ReturnType<typeof baseQuery>;

const baseUrl = import.meta.env.VITE_THEMOVIEDB_API_URL as string;
const accessToken = import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN as string;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

async function fetchMultiplePages<T>(
  fetchWithBQ: FetchWithBQType,
  endpoint: string,
  fromPage: number,
  totalPages: number,
  params: Record<string, unknown> = {},
): Promise<{ results: T[] } | { error: FetchBaseQueryError }> {
  try {
    const currentPage = fromPage - 1;
    const fetchRequests = Array.from({ length: totalPages }, (_, index) =>
      fetchWithBQ({
        url: endpoint,
        params: { ...params, page: currentPage + index + 1 },
      }),
    );

    const responses = await Promise.allSettled(fetchRequests);
    const results: T[] = [];

    for (const response of responses) {
      if (response.status === "fulfilled" && response.value.data) {
        results.push(...(response.value.data as { results: T[] }).results);
      }
    }

    if (results.length === 0) {
      return {
        error: {
          status: 500,
          data: "All API requests failed",
        } as FetchBaseQueryError,
      };
    }

    return { results };
  } catch (error) {
    return {
      error: {
        status: 500,
        data: (error as Error).message || "Unknown error",
      } as FetchBaseQueryError,
    };
  }
}

export { baseQuery, fetchMultiplePages };
