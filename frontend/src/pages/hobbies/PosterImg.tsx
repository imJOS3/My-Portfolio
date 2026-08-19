import type { HobbyItem } from "../../data/hobbies";

export function PosterImg({
  item,
  className = "",
  padded = false,
}: {
  item: HobbyItem;
  className?: string;
  padded?: boolean;
}) {
  const contain = item.fit === "contain";
  return (
    <img
      src={item.poster}
      alt={item.title}
      referrerPolicy="no-referrer"
      className={`${className} ${contain ? `object-contain ${padded ? "p-3 sm:p-6" : "p-1"}` : "object-cover"}`}
      style={contain ? { background: item.posterBg ?? "#111827" } : undefined}
    />
  );
}
