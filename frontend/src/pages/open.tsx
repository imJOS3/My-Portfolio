import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BackendUnavailable from "../components/BackendUnavailable";
import { BACKEND_AVAILABLE } from "../config/backend";

const baseUrl = import.meta.env.VITE_URL_BASE_BACKEND;

interface FavoriteItem {
  image: string;
  title: string;
  type: string;
  summary: string;
  description: string;
  keywords: string[];
  year?: number;
  link?: string;
}

const OpenFavorites = () => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(BACKEND_AVAILABLE);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!BACKEND_AVAILABLE) return;

    const fetchFavorites = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${baseUrl}/api/favorite-items/?limit=9999`);
        if (!res.ok) throw new Error("Failed to load favorites");
        const data = await res.json();

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];

        const mappedItems: FavoriteItem[] = items.map((item: any) => ({
          image:
            item.imagen &&
            (item.imagen.startsWith("http")
              ? item.imagen
              : `${baseUrl}${item.imagen}`),
          title: item.titulo,
          type: item.tipo
            ? item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)
            : "Other",
          summary: item.resumen,
          description: item.descripcion,
          keywords: item.palabras_clave
            ? item.palabras_clave.split(",").map((k: string) => k.trim())
            : [],
          year: item.año_lanzamiento,
          link: item.link_externo,
        }));

        setFavoriteItems(mappedItems);
      } catch {
        setError("Could not load favorites.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-indigo-900 to-fuchsia-700 py-6 overflow-y-auto">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-black/40 hover:bg-black/70 text-fuchsia-300 rounded-full shadow-lg transition-all duration-200"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-semibold">Back</span>
      </button>

      <h1 className="text-3xl font-bold text-fuchsia-300 mb-6 drop-shadow-neon text-center">
        My favorite series, games & anime
      </h1>

      {!BACKEND_AVAILABLE ? (
        <div className="w-full max-w-md px-4 mt-8">
          <BackendUnavailable />
        </div>
      ) : loading ? (
        <div className="text-fuchsia-300 text-center py-8 animate-pulse">
          Loading favorites...
        </div>
      ) : error ? (
        <div className="text-red-400 font-semibold mb-4 text-center">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-2 w-full max-w-6xl px-2">
          {favoriteItems.map((item, idx) => {
            let cardClass = "col-span-1 row-span-1";
            if (idx % 8 === 0) cardClass = "col-span-2 row-span-2";
            else if (idx % 6 === 0) cardClass = "col-span-2 row-span-1";
            else if (idx % 4 === 0) cardClass = "col-span-1 row-span-2";
            return <PosterCard key={idx} item={item} className={cardClass} />;
          })}
        </div>
      )}
    </section>
  );
};

function PosterCard({
  item,
  className,
}: {
  item: FavoriteItem;
  className: string;
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-xl border-2 ${
        item.type === "Anime"
          ? "border-fuchsia-400/60"
          : "border-indigo-400/60"
      } group bg-gradient-to-br from-black/80 via-fuchsia-900/30 to-indigo-900/30 ${className}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-sm"
      />

      <div
        className={`absolute inset-0 ${
          item.type === "Anime"
            ? "bg-gradient-to-br from-fuchsia-900/80 via-black/80 to-indigo-900/80"
            : "bg-gradient-to-br from-indigo-900/80 via-black/80 to-fuchsia-900/80"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-3 text-center rounded-2xl`}
      >
        <h2 className="text-lg font-extrabold text-fuchsia-200 mb-1 drop-shadow-lg">
          {item.title}
        </h2>
        <span className="text-xs text-fuchsia-400 mb-1 font-semibold uppercase tracking-wide">
          {item.type} • {item.year}
        </span>
        <p className="text-indigo-100 mb-1 font-medium italic text-xs">
          {item.summary}
        </p>
        <p className="text-indigo-200 text-xs mb-2">{item.description}</p>
        <div className="mb-2 flex flex-wrap justify-center">
          {(item.keywords ?? []).map((kw: string, i: number) => (
            <span
              key={i}
              className="inline-block bg-fuchsia-700/40 text-fuchsia-100 px-2 py-1 rounded-full text-xs mr-1 mb-1 shadow-md"
            >
              {kw}
            </span>
          ))}
        </div>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-2 py-1 bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200 text-xs"
          >
            View details
          </a>
        )}
      </div>
    </div>
  );
}

export default OpenFavorites;
