import tottenhamCrest from "../assets/hobbies/tottenham.svg";
import dortmundCrest from "../assets/hobbies/dortmund.svg";

const steamPoster = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;

const steamHero = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_hero.jpg`;

const malPoster = (path: string) =>
  `https://cdn.myanimelist.net/images/anime/${path}`;

const wiki = (lang: "commons" | "en", path: string) =>
  `https://upload.wikimedia.org/wikipedia/${lang}/${path}`;

const appleIcon = (path: string) =>
  `https://is1-ssl.mzstatic.com/image/thumb/${path}/1024x1024bb.jpg`;

const deezerCover = (hash: string) =>
  `https://cdn-images.dzcdn.net/images/cover/${hash}/1000x1000-000000-80-0-0.jpg`;

const deezerArtist = (hash: string) =>
  `https://cdn-images.dzcdn.net/images/artist/${hash}/1000x1000-000000-80-0-0.jpg`;

export type HobbyIconId = "games" | "anime" | "sports" | "music";

export type HobbyItem = {
  id: string;
  title: string;
  shortTitle?: string;
  credit: string;
  year?: string;
  platform?: string;
  description: string;
  tags: string[];
  poster: string;
  hero?: string;
  fit?: "cover" | "contain";
  posterBg?: string;
};

export type HobbyGroup = {
  label: string;
  itemIds: string[];
};

export type HobbyCategory = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  glow: string;
  icon: HobbyIconId;
  groups: HobbyGroup[];
  items: HobbyItem[];
};

export const HOBBIES: HobbyCategory[] = [
  {
    id: "games",
    title: "Video Games",
    kicker: "Mobile · PC · Geometry Dash",
    description:
      "Clash Royale as a pro player, Free Fire as a former pro, long PC sessions, and Geometry Dash on repeat.",
    glow: "rgba(34, 211, 238, 0.35)",
    icon: "games",
    groups: [
      { label: "Mobile", itemIds: ["clash-royale", "free-fire"] },
      {
        label: "PC",
        itemIds: ["space-marine-2", "limbo", "little-nightmares", "hollow-knight", "left-4-dead"],
      },
      { label: "Geometry Dash", itemIds: ["geometry-dash"] },
    ],
    items: [
      {
        id: "clash-royale",
        title: "Clash Royale",
        shortTitle: "Clash Royale",
        credit: "Supercell · Pro player",
        year: "2016",
        platform: "Mobile",
        description:
          "I'm a Clash Royale pro player. Ranked, cycle, elixir — this is where I compete, not a casual side game. Ladder, challenges, and the grind that actually counts.",
        tags: ["Pro player", "Strategy", "Ranked"],
        poster: appleIcon(
          "Purple211/v4/00/03/be/0003befa-32c7-172d-ce3b-2197bf10ca0f/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png"
        ),
        fit: "contain",
        posterBg: "#0b1b2b",
      },
      {
        id: "free-fire",
        title: "Free Fire",
        shortTitle: "Free Fire",
        credit: "Garena · Former pro",
        year: "2017",
        platform: "Mobile",
        description:
          "I used to play Free Fire at a pro level. Drops, rotations, scrims — that chapter is behind me, but it is still part of how I learned to compete under pressure.",
        tags: ["Former pro", "Battle royale", "Mobile"],
        poster: appleIcon(
          "Purple221/v4/95/16/f3/9516f314-4151-38f7-7d61-47bbc24f5406/AppIcon-1785257489-0-0-1x_U007emarketing-0-8-0-85-220.png"
        ),
        fit: "contain",
        posterBg: "#1a0a12",
      },
      {
        id: "space-marine-2",
        title: "Space Marine 2",
        shortTitle: "Space Marine 2",
        credit: "Saber Interactive",
        year: "2024",
        platform: "PC",
        description:
          "Warhammer at full volume. Heavy armor, bolter recoil, and that grimdark spectacle you feel in your shoulders after a long campaign.",
        tags: ["Action", "Co-op", "Warhammer 40K"],
        poster: steamPoster(2183900),
        hero: steamHero(2183900),
      },
      {
        id: "limbo",
        title: "Limbo",
        shortTitle: "Limbo",
        credit: "Playdead",
        year: "2010",
        platform: "PC",
        description:
          "Almost no tutorial. Atmosphere does the talking — a small silhouette, a hostile forest, and puzzles that stay in your head.",
        tags: ["Puzzle", "Atmosphere", "Indie"],
        poster: steamPoster(48000),
        hero: steamHero(48000),
      },
      {
        id: "little-nightmares",
        title: "Little Nightmares",
        shortTitle: "Little Nightmares",
        credit: "Tarsier Studios",
        year: "2017",
        platform: "PC",
        description:
          "A yellow raincoat in a world that should not exist. Hide from the adults, steal the light, and keep walking through The Maw even when the scale of everything is wrong.",
        tags: ["Horror", "Puzzle", "Atmosphere"],
        poster: steamPoster(424840),
        hero: steamHero(424840),
      },
      {
        id: "hollow-knight",
        title: "Hollow Knight",
        shortTitle: "Hollow Knight",
        credit: "Team Cherry",
        year: "2017",
        platform: "PC",
        description:
          "Lost on purpose in Hallownest. Exploration, patience, and an OST that lives rent-free every time I sit down to code.",
        tags: ["Metroidvania", "Exploration", "OST"],
        poster: steamPoster(367520),
        hero: steamHero(367520),
      },
      {
        id: "left-4-dead",
        title: "Left 4 Dead",
        shortTitle: "Left 4 Dead",
        credit: "Valve",
        year: "2008",
        platform: "PC",
        description:
          "Four friends, one horde. Friendly fire optional, screaming mandatory. Still the co-op panic I measure other nights against.",
        tags: ["Co-op", "Survival", "Classic"],
        poster: steamPoster(500),
        hero: steamHero(500),
      },
      {
        id: "geometry-dash",
        title: "Geometry Dash",
        shortTitle: "GD",
        credit: "RobTop Games",
        year: "2013",
        platform: "PC · Mobile",
        description:
          "Rhythm, timing, and that one jump I retry at 96%. Geometry Dash is the one I keep coming back to — campaign and user levels.",
        tags: ["Rhythm", "Platform", "Classic"],
        poster: steamPoster(322170),
        hero: steamHero(322170),
      },
    ],
  },
  {
    id: "anime",
    title: "Anime & Manga",
    kicker: "Experimental · Romcom · Favorites",
    description:
      "Steins;Gate first, then the weird late-night picks and the shonen I grew up on.",
    glow: "rgba(217, 70, 239, 0.35)",
    icon: "anime",
    groups: [
      {
        label: "Experimental",
        itemIds: ["steins-gate", "serial-experiments-lain", "welcome-nhk"],
      },
      { label: "Romcom", itemIds: ["love-is-war"] },
      { label: "Favorites", itemIds: ["code-geass", "naruto", "fairy-tail"] },
    ],
    items: [
      {
        id: "steins-gate",
        title: "Steins;Gate",
        shortTitle: "Steins;Gate",
        credit: "White Fox",
        year: "2011",
        platform: "Experimental",
        description:
          "Microwave, bananas, and the weight of a timeline. Sci-fi that starts as a joke in a lab and ends as something I still think about on the commute.",
        tags: ["Time travel", "Sci-fi", "Lab"],
        poster: malPoster("1935/127974l.jpg"),
      },
      {
        id: "serial-experiments-lain",
        title: "Serial Experiments Lain",
        shortTitle: "Lain",
        credit: "Triangle Staff · Chiaki J. Konaka",
        year: "1998",
        platform: "Experimental",
        description:
          "The Wired, identity, and a girl who might be more network than person. The series I put on when I want anime to feel like a glitch in the room.",
        tags: ["Avant-garde", "Cyber", "Psychological"],
        poster: malPoster("1718/91550l.jpg"),
      },
      {
        id: "welcome-nhk",
        title: "Welcome to the NHK",
        shortTitle: "NHK",
        credit: "Gonzo",
        year: "2006",
        platform: "Experimental",
        description:
          "Hikikomori, conspiracy boards, and a very specific kind of humor. Uncomfortable, honest, and not the kind of show you recommend lightly.",
        tags: ["Drama", "Satire", "Psychological"],
        poster: malPoster("3/52675l.jpg"),
      },
      {
        id: "love-is-war",
        title: "Kaguya-sama: Love is War",
        shortTitle: "Love is War",
        credit: "A-1 Pictures",
        year: "2019",
        platform: "Romcom",
        description:
          "Pride, mind games, and the funniest war over a confession. My comfort romcom — sharp writing, sharper stares.",
        tags: ["Romcom", "Comedy", "Mind games"],
        poster: malPoster("1295/106551l.jpg"),
      },
      {
        id: "code-geass",
        title: "Code Geass",
        shortTitle: "Code Geass",
        credit: "Sunrise",
        year: "2006",
        platform: "Favorite",
        description:
          "Chess, rebellion, and a geass that costs everything. One of the shows that made me love strategy wrapped in a mask.",
        tags: ["Mecha", "Strategy", "Favorite"],
        poster: malPoster("1032/135088l.jpg"),
      },
      {
        id: "naruto",
        title: "Naruto",
        shortTitle: "Naruto",
        credit: "Studio Pierrot · Masashi Kishimoto",
        year: "2002",
        platform: "Favorite",
        description:
          "The long road out of the village. Bonds, bad timing, and the shonen I grew up repeating quotes from. Still a favorite, no irony.",
        tags: ["Shonen", "Ninja", "Favorite"],
        poster: malPoster("1141/142503l.jpg"),
      },
      {
        id: "fairy-tail",
        title: "Fairy Tail",
        shortTitle: "Fairy Tail",
        credit: "A-1 Pictures / Bridge · Hiro Mashima",
        year: "2009",
        platform: "Favorite",
        description:
          "Guild warmth, loud magic, found family. When I want shonen that feels like coming home to the same bar after a job.",
        tags: ["Shonen", "Guild", "Favorite"],
        poster: malPoster("5/18179l.jpg"),
      },
    ],
  },
  {
    id: "sports",
    title: "Sports",
    kicker: "Teams · Idols",
    description:
      "Junior at home, Monaco, Spurs and Dortmund abroad, and the players I grew up watching.",
    glow: "rgba(168, 85, 247, 0.4)",
    icon: "sports",
    groups: [
      {
        label: "Teams",
        itemIds: ["junior", "monaco", "tottenham", "dortmund"],
      },
      { label: "Idols", itemIds: ["ozil", "reus", "cr7", "falcao"] },
    ],
    items: [
      {
        id: "junior",
        title: "Junior de Barranquilla",
        shortTitle: "Junior",
        credit: "Colombia · El Tiburón",
        platform: "Home club",
        description:
          "The shirt that is home. Barranquilla, red-and-white nights, the shark on the chest. Junior is the Colombian club I actually bleed for.",
        tags: ["Colombia", "Categoría Primera A", "Home"],
        poster: wiki(
          "commons",
          "thumb/1/12/Junior_Barranquilla_logo.svg/960px-Junior_Barranquilla_logo.svg.png"
        ),
        hero: wiki("commons", "2/2d/Estadio_Metropolitano_baq.jpg"),
        fit: "contain",
        posterBg: "#7a0c16",
      },
      {
        id: "monaco",
        title: "AS Monaco",
        shortTitle: "Monaco",
        credit: "Ligue 1 · Principality",
        platform: "Ligue 1",
        description:
          "Red and white on the rock. A club that keeps producing talent on a coastline that looks unreal — and a Falcao chapter I never forgot.",
        tags: ["Ligue 1", "Monaco", "Europe"],
        poster: wiki("en", "c/cf/LogoASMonacoFC2021.svg"),
        hero: wiki("commons", "7/78/Panoramio_-_V%26A_Dudush_-_stade_Louis_II.jpg"),
        fit: "contain",
        posterBg: "#7a1020",
      },
      {
        id: "tottenham",
        title: "Tottenham Hotspur",
        shortTitle: "Spurs",
        credit: "England · North London",
        platform: "Premier League",
        description:
          "Lilywhites. North London, the new stadium lights, and that mix of beautiful football and heartbreak only Spurs can deliver.",
        tags: ["Premier League", "Spurs", "England"],
        poster: tottenhamCrest,
        hero: wiki("commons", "b/be/London_Tottenham_Hotspur_Stadium.jpg"),
        fit: "contain",
        posterBg: "#f4f7fb",
      },
      {
        id: "dortmund",
        title: "Borussia Dortmund",
        shortTitle: "Dortmund",
        credit: "Germany · BVB 09",
        platform: "Bundesliga",
        description:
          "Yellow wall, black and yellow nights. Dortmund is the German club I follow — loud, loyal, and the shirt Reus never left.",
        tags: ["Bundesliga", "BVB", "Germany"],
        poster: dortmundCrest,
        fit: "contain",
        posterBg: "#111111",
      },
      {
        id: "ozil",
        title: "Mesut Özil",
        shortTitle: "Özil",
        credit: "No. 10 · The magician",
        platform: "Idol",
        description:
          "The last pass before the goal. Vision, pause, the no-look ball. Özil is the number 10 I wanted to play like.",
        tags: ["Playmaker", "No. 10", "Idol"],
        poster: wiki(
          "commons",
          "1/12/Mesut_%C3%96zil_at_Baku_before_2019_UEFA_Europe_League_Final.jpg"
        ),
      },
      {
        id: "reus",
        title: "Marco Reus",
        shortTitle: "Reus",
        credit: "BVB · Left foot",
        platform: "Idol",
        description:
          "Loyalty and a left foot. Reus stayed, suffered, and still looked like the most elegant player on the pitch. That stuck with me.",
        tags: ["Forward", "BVB", "Idol"],
        poster: wiki(
          "commons",
          "c/cf/2023-08-12_TSV_Schott_Mainz_gegen_Borussia_Dortmund_%28DFB-Pokal_2023-24%29_by_Sandro_Halank%E2%80%93126.jpg"
        ),
      },
      {
        id: "cr7",
        title: "Cristiano Ronaldo",
        shortTitle: "CR7",
        credit: "CR7 · Mentality",
        platform: "Idol",
        description:
          "Work rate as a personality. Sprints, headers, the extra session. CR7 is the reminder that talent is a starting point, not a finish line.",
        tags: ["Forward", "Mentality", "Idol"],
        poster: wiki(
          "commons",
          "2/26/Cristiano_Ronaldo_Croatia_v_Portugal_2_July_2026-075_%28cropped%29.jpg"
        ),
      },
      {
        id: "falcao",
        title: "Radamel Falcao",
        shortTitle: "Falcao",
        credit: "El Tigre · Colombia",
        platform: "Idol",
        description:
          "El Tigre. Movement in the box, that leap, the Porto / Atlético / Monaco years. The Colombian striker I wanted on every counter.",
        tags: ["Striker", "Colombia", "Idol"],
        poster: wiki("commons", "8/87/Radamel_Falcao_Garc%C3%ADa_en_Millonarios.jpg"),
      },
    ],
  },
  {
    id: "music",
    title: "Soundtracks",
    kicker: "Favorita · Artistas · Género",
    description:
      "The records on repeat, the voices behind them, and the lanes they live in.",
    glow: "rgba(34, 211, 238, 0.28)",
    icon: "music",
    groups: [
      {
        label: "Música favorita",
        itemIds: ["fav-betrayed", "crybaby", "xxx-question"],
      },
      {
        label: "Artistas",
        itemIds: ["lil-xan", "diomedes", "lil-peep", "xxxtentacion", "luister"],
      },
      {
        label: "Género",
        itemIds: ["genre-trap", "genre-melodic-rap", "genre-vallenato", "genre-champeta"],
      },
    ],
    items: [
      {
        id: "fav-betrayed",
        title: "Betrayed",
        shortTitle: "Betrayed",
        credit: "Lil Xan",
        year: "2017",
        platform: "Música favorita",
        description:
          "The Lil Xan record that stuck. That 2017 SoundCloud bounce — simple, sticky, and still the track I put on when I want that era back.",
        tags: ["Trap", "2017", "Single"],
        poster: deezerCover("fca0f60b0c5a77dd8989ee1d75d6e9b5"),
      },
      {
        id: "crybaby",
        title: "Crybaby",
        shortTitle: "Crybaby",
        credit: "Lil Peep · 2016",
        year: "2016",
        platform: "Música favorita",
        description:
          "The yellow-cover mixtape. White Tee, Nineteen, Ghost Girl — Peep before the world caught up. Crybaby is the one I still put on when I want the original bruise.",
        tags: ["Mixtape", "Melodic rap", "2016"],
        poster: deezerCover("c09607358e115d37b1ad50d2ecfc1e3a"),
      },
      {
        id: "xxx-question",
        title: "?",
        shortTitle: "?",
        credit: "XXXTentacion · 2018",
        year: "2018",
        platform: "Música favorita",
        description:
          "The question-mark album. Moonlight, SAD!, changes — X at full range, from bounce to bruise. This is the body of work, not a single screenshot.",
        tags: ["Álbum", "Moonlight", "2018"],
        poster: deezerCover("9b6da786cd3ca8b286a04186b3c9079c"),
      },
      {
        id: "lil-xan",
        title: "Lil Xan",
        shortTitle: "Lil Xan",
        credit: "Diego · Betrayed",
        year: "2017",
        platform: "Artista",
        description:
          "The voice on Betrayed. SoundCloud-era trap, that 2017 bounce — Lil Xan is the name I attach to that whole stretch of headphones-on nights.",
        tags: ["Trap", "SoundCloud", "Artista"],
        poster: deezerArtist("4309afebdc7f6eac90f7c8acfd2add34"),
      },
      {
        id: "diomedes",
        title: "Diomedes Díaz",
        shortTitle: "Diomedes",
        credit: "El Cacique de La Junta",
        platform: "Artista",
        description:
          "The king of vallenato. Voice, stories, the Costa that does not need a translator. Diomedes is not background music — it is the table, the party, the country.",
        tags: ["Vallenato", "Colombia", "Leyenda"],
        poster: deezerArtist("fd9922415127264b9708992d5b0908a4"),
      },
      {
        id: "lil-peep",
        title: "Lil Peep",
        shortTitle: "Lil Peep",
        credit: "Gustav Åhr",
        platform: "Artista",
        description:
          "Pink hair, sad hooks, guitar that sounds like a bruise. Peep is the melodic-rap voice I keep coming back to — honest, messy, and impossible to confuse with anyone else.",
        tags: ["Melodic rap", "Crybaby", "Artista"],
        poster: deezerArtist("9c3749d65aa59626a0a876ca9381e10e"),
      },
      {
        id: "xxxtentacion",
        title: "XXXTentacion",
        shortTitle: "X",
        credit: "Jahseh Onfroy",
        year: "2018",
        platform: "Artista",
        description:
          "Moonlight still hits at 1 a.m. X at his most replayable — not the loudest track, the one that stays. The ? album is where that bounce lives.",
        tags: ["Melodic rap", "?", "Artista"],
        poster: deezerArtist("62e6edfaf5461eeb5b7310903229607a"),
      },
      {
        id: "luister",
        title: "Luister La Voz",
        shortTitle: "Luister",
        credit: "Cartagena · La Voz",
        platform: "Artista",
        description:
          "Luister La Voz. Champeta with urbano blood, Cartagena in the chest. The voice I put on when the night needs Costa — not a study playlist, a pickup.",
        tags: ["Champeta", "Urbano", "Cartagena"],
        poster: deezerArtist("5d26e98e1642755419142cfea8ed65d3"),
      },
      {
        id: "genre-trap",
        title: "Trap",
        shortTitle: "Trap",
        credit: "808s · SoundCloud",
        platform: "Género",
        description:
          "Heavy 808s, ad-libs, the 2017 wave that still lives in my headphones. Trap is the lane where Betrayed and that whole era sit.",
        tags: ["Género", "SoundCloud", "808s"],
        poster: deezerCover("fca0f60b0c5a77dd8989ee1d75d6e9b5"),
      },
      {
        id: "genre-melodic-rap",
        title: "Melodic rap",
        shortTitle: "Melodic rap",
        credit: "Guitar + 808",
        platform: "Género",
        description:
          "Melody first, then the punch. Peep and X live here — guitar over a trap kit, hooks that stay in your head without needing the emo stamp.",
        tags: ["Género", "Melodic", "Night"],
        poster: deezerCover("c09607358e115d37b1ad50d2ecfc1e3a"),
      },
      {
        id: "genre-vallenato",
        title: "Vallenato",
        shortTitle: "Vallenato",
        credit: "Caja · acordeón · costa",
        platform: "Género",
        description:
          "The Colombian one. Accordion, caja, the stories you grow up hearing at family volume. This is home in a genre — Diomedes is the throne.",
        tags: ["Género", "Colombia", "Costa"],
        poster: deezerArtist("fd9922415127264b9708992d5b0908a4"),
      },
      {
        id: "genre-champeta",
        title: "Champeta",
        shortTitle: "Champeta",
        credit: "Cartagena · pickup",
        platform: "Género",
        description:
          "The Cartagena pulse. Champeta, afrobeat, urbano costeño — the lane Luister La Voz carries without dropping the Caribbean flag.",
        tags: ["Género", "Urbano", "Costa"],
        poster: deezerArtist("5d26e98e1642755419142cfea8ed65d3"),
      },
    ],
  },
];

export function getHobby(id: string | undefined) {
  return HOBBIES.find((hobby) => hobby.id === id);
}

export function getHobbyItem(hobby: HobbyCategory, itemId: string | undefined) {
  if (!itemId) return hobby.items[0];
  return hobby.items.find((item) => item.id === itemId) ?? hobby.items[0];
}

export function groupTitles(hobby: HobbyCategory) {
  return hobby.groups.map((group) => ({
    label: group.label,
    items: group.itemIds.map((id) => {
      const item = hobby.items.find((entry) => entry.id === id);
      return item?.shortTitle ?? item?.title ?? id;
    }),
  }));
}

export function itemsForGroup(hobby: HobbyCategory, groupLabel: string | "all") {
  if (groupLabel === "all") return hobby.items;
  const group = hobby.groups.find((entry) => entry.label === groupLabel);
  if (!group) return hobby.items;
  return group.itemIds
    .map((id) => hobby.items.find((item) => item.id === id))
    .filter((item): item is HobbyItem => Boolean(item));
}
