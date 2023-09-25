import { useState, FC, ReactNode, createContext, useEffect } from "react";
import { IGame, listOfGames } from "../models/games";

export interface GameContextType {
  games: IGame[];
  addGame: (g: IGame) => void;
  updateGame: (g: IGame) => void;
  removeGame: (gameId: string) => void;
}

export const GameContext = createContext<GameContextType>({
  games: [],
  addGame: () => {},
  updateGame: () => {},
  removeGame: () => {},
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
  const [index, setIndex] = useState<number>(3);

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

  const addGame = (newGame: IGame) => {
    setGames((oldGames) => [
      ...oldGames,
      {
        id: index.toString(),
        title: newGame.title,
        releaseYear: newGame.releaseYear,
        genre: newGame.genre,
      },
    ]);
    setIndex((oldIndex) => oldIndex + 1);
  };

  const removeGame = (gameId: string) => {
    setGames((oldGames) => 
      oldGames.filter((g) => g.id !== gameId)
    );
  };

  const updateGame = (game: IGame) => {
    setGames((oldGames) => [
      game,
      ...oldGames.filter((g) => g.id !== game.id),
    ]);
  };

  const startingValue: GameContextType = {
    games,
    addGame,
    updateGame,
    removeGame,
  };

  return (
    <GameContext.Provider value={startingValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
