import { useParams } from "react-router-dom";
import { GameContext, GameContextType } from "../context/GameContext";
import { useContext } from 'react';

export const GameItem = () => {
  const { gameId } = useParams();
  const { games } = useContext(GameContext) as GameContextType;
  
  const selectedGame = games.find((g) => g.id === gameId);

  return (
    <div className="container">
      <h1 className="text-primary">Game Detail Page</h1>
      <div className="w-50 mx-auto text-center">
        <h2 className="text-secondary">{selectedGame?.title}</h2>
        <div className="row row-cols-2">
          <p className="col col-sm-6">
            <strong>Release Year: </strong>
            {selectedGame?.releaseYear}
          </p>
          <p className="col col-sm-6">
            <strong>Genre: </strong>
            {selectedGame?.genre}
          </p>
        </div>
      </div>
    </div>
  );
};
