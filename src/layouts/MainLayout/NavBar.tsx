import { RefObject } from "react";

interface NavBarProps {
  selectedRef: RefObject<HTMLDivElement | null>;
  focusedColumn: number;
  focusedRow: number;
}

const categoryList = [
  { item: "Tv Series", with_genres: "Tv" },
  { item: "Movies", with_genres: "" },
  { item: "Documentaries", with_genres: "99" },
  { item: "Horror", with_genres: "27" },
  { item: "Romance", with_genres: "10749" },
  { item: "Science Fiction", with_genres: "878" },
];

function NavBar({ selectedRef, focusedColumn, focusedRow }: NavBarProps) {
  const isInCategories = focusedColumn === -1;

  return (
    <div className="bg-black min-h-full fixed left-0 top-0 z-50 w-xs">
      <div className="flex flex-col gap-3 px-10 pt-15">
        <p className="text-white text-5xl mb-5">Categories</p>
        {categoryList.map((category, index) => (
          <div
            key={index}
            ref={isInCategories && focusedRow === index ? selectedRef : null}
            id={category.with_genres}
            className={`text-white bg-gray-800 text-2xl py-2 ${isInCategories && focusedRow === index ? "border-6 border-yellow-400 shadow-lg opacity-100" : "border-transparent"}`}
          >
            {category.item}
          </div>
        ))}
      </div>
    </div>
  );
}
export { NavBar };
