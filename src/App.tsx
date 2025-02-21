import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useFetchTrendsQuery } from "./features/trending/trending-api-slice";
import {
  setMovies,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  moveNavigation,
} from "./features/trending/trending-slice";

import { NavBar } from "./layouts/MainLayout/NavBar";
import { useCategories } from "./hooks/useCategories";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { MediaGrid } from "./components/MediaGrid";
import { ENDPOINTS } from "./constants/endpoints";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const { data } = useFetchTrendsQuery({
    fromPage: 1,
    totalPages: 8,
  });

  const gridColumns = 8;
  const medias = useAppSelector((state) => state.trendingMedia.movies);
  const { focusedRow, focusedColumn } = useAppSelector(
    (state) => state.trendingMedia,
  );

  const selectedRef = useRef<HTMLDivElement | null>(null);

  const { getCategory } = useCategories();

  // Update Media when loading data
  useEffect(() => {
    if (data) dispatch(setMovies(data.results));
  }, [data, dispatch]);

  // Ensure that the element in focus is displayed in the viewport
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [focusedRow, focusedColumn]);

  // Mapping of arrow keys to their respective actions
  const arrowKeyActions: Record<string, () => void> = {
    ArrowLeft: () => dispatch(moveLeft()),
    ArrowRight: () => dispatch(moveRight()),
    ArrowUp: () => dispatch(moveUp()),
    ArrowDown: () => dispatch(moveDown()),
  };

  // Handling the Enter key
  const handleEnter = async () => {
    if (focusedColumn === -1) {
      const genreId = selectedRef.current?.id || "";
      const endpoint = genreId === "Tv" ? ENDPOINTS.tv : ENDPOINTS.movie;
      const with_genres = genreId === "Tv" ? "" : genreId;
      const categoryData = await getCategory({ endpoint, with_genres });
      dispatch(setMovies(categoryData.results));
    }
  };

  // Logic to exit menu (Escape key)
  const handleBack = () => {
    dispatch(moveNavigation());
  };

  // Use of the keyboard navigation hook
  useKeyboardNavigation(
    {
      ...arrowKeyActions,
      Enter: handleEnter,
      Escape: handleBack,
    },
    [dispatch, focusedRow, focusedColumn, medias, getCategory],
  );

  if (data) {
    return (
      <>
        <NavBar
          selectedRef={selectedRef}
          focusedColumn={focusedColumn}
          focusedRow={focusedRow}
        />
        <MediaGrid
          medias={medias}
          gridColumns={gridColumns}
          focusedRow={focusedRow}
          focusedColumn={focusedColumn}
          selectedRef={selectedRef}
        />
      </>
    );
  }
}

export default App;
