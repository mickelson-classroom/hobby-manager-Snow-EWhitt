import { useState, FC, ReactNode, createContext, useEffect } from 'react';
import { IGame, listOfGames } from '../models/games';

export interface GameContextType {
  games: IGame[];
  addGame: (g: IGame) => void;
};

export const GameContext = createContext<GameContextType>({
  games: [],
  addGame: () => {},
});

const GameContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameIndex, setGameIndex] = useState<number>(3);
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    setGames(listOfGames);
  }, []);

  const addGame = (g: IGame) => {
    const newGame: IGame = {
      id: gameIndex.toString(),
      title: g.title,
      releaseYear: g.releaseYear,
      genre: g.genre,
    }
    console.log(newGame);
    setGameIndex(i => i + 1)
    setGames([...games, newGame])
  }

  const startingValue: GameContextType = {
    games,
    addGame,
  }

  return (
    <GameContext.Provider value={startingValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;