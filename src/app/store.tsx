import { configureStore } from '@reduxjs/toolkit';
import { trendingApi } from '../features/trending/trending-api-slice';

export const store = configureStore({
  reducer: { [trendingApi.reducerPath]: trendingApi.reducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(trendingApi.middleware);
  },
});
