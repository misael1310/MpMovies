import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Trending } from "./TrendingTypes";

interface TrendingState {
  movies: Trending[];
  focusedRow: number;
  focusedColumn: number;
  categoriesMenuLength: number;
  lastContentRowIndex: number;
  lastContentColIndex: number;
}

const MAX_COLUMNS = 20;
const MAX_ROWS = 8;

const initialState: TrendingState = {
  movies: [],
  focusedRow: 0,
  focusedColumn: 0,
  categoriesMenuLength: 6,
  lastContentRowIndex: 0,
  lastContentColIndex: 0,
};

// Auxiliary functions for handling the category navigation mode.
const isCategoriesMode = (state: TrendingState) => state.focusedColumn === -1;

const enterCategoriesMode = (state: TrendingState) => {
  state.lastContentRowIndex = state.focusedRow;
  state.lastContentColIndex = state.focusedColumn;
  state.focusedColumn = -1;
  state.focusedRow = 0;
};

const exitCategoriesMode = (state: TrendingState) => {
  state.focusedRow = state.lastContentRowIndex;
  state.focusedColumn = state.lastContentColIndex;
};

const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Trending[]>) => {
      state.movies = action.payload;
    },
    moveLeft: (state) => {
      // If it is in position 0, it enter the category menu.
      if (state.focusedColumn === 0) {
        enterCategoriesMode(state);
        return;
      }

      // If we are already in the category menu, nothing is done.
      if (isCategoriesMode(state)) return;

      // Move to the left with wrap-around.
      state.focusedColumn =
        (state.focusedColumn - 1 + MAX_COLUMNS) % MAX_COLUMNS;
    },
    moveRight: (state) => {
      // If you are in the category menu, you return to the last active position.
      if (isCategoriesMode(state)) {
        exitCategoriesMode(state);
        return;
      }
      state.focusedColumn = (state.focusedColumn + 1) % MAX_COLUMNS;
    },
    moveUp: (state) => {
      // Prevents the focus from leaving the screen in the category menu.
      if (isCategoriesMode(state) && state.focusedRow < 1) return;
      state.focusedRow = (state.focusedRow - 1 + MAX_ROWS) % MAX_ROWS;
    },
    moveDown: (state) => {
      // Prevents the focus from leaving the screen on the botton in the category menu.
      if (
        isCategoriesMode(state) &&
        state.focusedRow > state.categoriesMenuLength - 2
      )
        return;
      state.focusedRow = (state.focusedRow + 1) % MAX_ROWS;
    },
    moveNavigation: (state) => {
      // Toggle between entering and exiting the category navigation mode.
      if (isCategoriesMode(state)) {
        exitCategoriesMode(state);
      } else {
        enterCategoriesMode(state);
      }
    },
  },
});

export const {
  setMovies,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  moveNavigation,
} = trendingSlice.actions;
export default trendingSlice.reducer;
