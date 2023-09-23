import { useState, FC, ReactNode, createContext, useEffect } from "react";
import { IGame, listOfGames } from "../models/games";

export interface GameContextType {
  games: IGame[];
  addGame: (g: IGame) => void;
}

export const GameContext = createContext<GameContextType>({
  games: [],
  addGame: () => {},
});

const storageKey = "storedGames";
const storeGamesInLocalStorage = (games: IGame[]) => {
  localStorage.setItem(storageKey, JSON.stringify(games));
};

const getGamesInLocalStorage = (): IGame[] => {
  const stringifiedGames = localStorage.getItem(storageKey);
  return JSON.parse(stringifiedGames || "[]");
};

const GameContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    const gamesFromStorage = getGamesInLocalStorage();
    if (gamesFromStorage.length === 0) {
      setGames(listOfGames);
    } else {
      setGames(gamesFromStorage);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      storeGamesInLocalStorage(games);
    }, 500);

    return () => clearTimeout(handler);
  }, [games]);

  const addGame = (g: IGame) => {
    setGames((oldGames) => [
      ...oldGames,
      {
        id: oldGames.length.toString(),
        title: g.title,
        releaseYear: g.releaseYear,
        genre: g.genre,
      },
    ]);
  };

  const startingValue: GameContextType = {
    games,
    addGame,
  };

  return (
    <GameContext.Provider value={startingValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
