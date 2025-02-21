import { RefObject } from "react";
import { Trending } from "../../features/trending/TrendingTypes";

interface MediaCardProps {
  media: Trending;
  isFocused: boolean;
  selectedRef: RefObject<HTMLDivElement | null>;
  maxTitleChars: number;
}

function MediaCard({
  media,
  isFocused,
  selectedRef,
  maxTitleChars,
}: MediaCardProps) {
  const mediaName = (media.title as string) || (media.name as string);
  const mediaTitle = `${mediaName.slice(0, maxTitleChars)}${
    mediaName.length > maxTitleChars ? "..." : ""
  }`;
  const mediaDate =
    media.release_date?.toString() || media.first_air_date?.toString();

  return (
    <div
      ref={isFocused ? selectedRef : null}
      className={`w-[200px] h-[380px] bg-gray-800 text-white flex flex-col items-center justify-center transition-all duration-100 ${
        isFocused
          ? "border-6 border-yellow-400 shadow-lg opacity-100"
          : "border-transparent opacity-50"
      }`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
        alt={mediaTitle}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <p className="text-base">{mediaDate}</p>
      <p className="text-xl">{mediaTitle}</p>
    </div>
  );
}

export { MediaCard };
