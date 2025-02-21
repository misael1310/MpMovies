import { RefObject } from "react";
import { Trending } from "../../features/trending/TrendingTypes";
import { MediaCard } from "../MediaCard";

interface MediaGridProps {
  medias: Trending[];
  gridColumns: number;
  focusedRow: number;
  focusedColumn: number;
  selectedRef: RefObject<HTMLDivElement | null>;
}

function MediaGrid({
  medias,
  gridColumns,
  focusedRow,
  focusedColumn,
  selectedRef,
}: MediaGridProps) {
  return (
    <div className="flex flex-col justify-start items-start gap-y-5 ps-80">
      {Array.from({ length: gridColumns }, (_, rowIndex) => {
        const sliceFrom = rowIndex * 20;
        const sliceTo = (rowIndex + 1) * 20;
        return (
          <div key={rowIndex} className="flex justify-start items-start gap-4">
            {medias.slice(sliceFrom, sliceTo).map((media, colIndex) => {
              const isFocused =
                focusedRow === rowIndex && focusedColumn === colIndex;
              return (
                <MediaCard
                  key={media.id}
                  media={media}
                  isFocused={isFocused}
                  maxTitleChars={15}
                  selectedRef={selectedRef}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export { MediaGrid };
