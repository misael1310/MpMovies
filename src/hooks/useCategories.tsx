import { useLazyFetchMovieCategoriesQuery } from "../features/trending/trending-api-slice";

function useCategories() {
  const [triggerCategory] = useLazyFetchMovieCategoriesQuery();

  const getCategory = async ({
    endpoint,
    with_genres,
  }: {
    endpoint: string;
    with_genres: string;
  }) => {
    const data = await triggerCategory({
      endpoint,
      fromPage: 1,
      totalPages: 8,
      with_genres,
    }).unwrap();
    return data;
  };

  return { getCategory };
}

export { useCategories };
