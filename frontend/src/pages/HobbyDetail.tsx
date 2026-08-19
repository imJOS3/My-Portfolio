import { Navigate } from "react-router-dom";
import { useLockViewport } from "../hooks/useLockViewport";
import { useHobbyArchive } from "../hooks/useHobbyArchive";
import { GamesVault } from "./hobbies/GamesVault";
import { AnimeShelf } from "./hobbies/AnimeShelf";
import { SportsPitch } from "./hobbies/SportsPitch";
import { MusicDeck } from "./hobbies/MusicDeck";

const OpenHobbyDetail = () => {
  useLockViewport();
  const archive = useHobbyArchive();

  if (!archive) {
    return <Navigate to="/open" replace />;
  }

  switch (archive.hobby.id) {
    case "anime":
      return <AnimeShelf archive={archive} />;
    case "sports":
      return <SportsPitch archive={archive} />;
    case "music":
      return <MusicDeck archive={archive} />;
    default:
      return <GamesVault archive={archive} />;
  }
};

export default OpenHobbyDetail;
