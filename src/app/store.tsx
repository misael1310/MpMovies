import { configureStore } from "@reduxjs/toolkit";
import { trendingApi } from "../features/trending/trending-api-slice";
import trendingReducer from "../features/trending/trending-slice";

export const store = configureStore({
  reducer: {
    trendingMedia: trendingReducer,
    [trendingApi.reducerPath]: trendingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(trendingApi.middleware);
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
