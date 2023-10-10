import { useParams } from "react-router-dom";
// import { GameContext, GameContextType } from "../../context/GameContext";
import {
  // useContext,
  useState,
} from "react";
import { EditGameInfo } from "./EditGameInfo";
import { useAppSelector } from "../../app/hooks";
import { Comments } from "../../features/comment/Comments";

export const GameItem = () => {
  const { gameId } = useParams();

  // const { games } = useContext(GameContext) as GameContextType;
  const items = useAppSelector((state) => state.games.items);
  const loading = useAppSelector((state) => state.games.loading);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const selectedGame = items.find((item) => item.id === gameId);

  return (
    <div className="container-lg">
      <div className="row my-1">
        <h1 className="col offset-2 me-auto text-primary">Game Detail Page</h1>
        <div className="col-2 my-2">
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing((oldBool) => !oldBool)}
            disabled={loading}
          >
            {!isEditing ? "Edit" : "Close"}
          </button>
        </div>
      </div>
      <div className="mx-auto text-center">
        {!loading && (
          <>
            <h2 className="text-secondary">{selectedGame?.title}</h2>
            <div className="row row-cols-2 justify-content-center">
              <p className="col col-sm-6 text-end">
                <strong>Release Year: </strong>
                {selectedGame?.releaseYear}
              </p>
              <p className="col col-sm-6 text-start text-wrap">
                <strong>Genre: </strong>
                {selectedGame?.genre}
              </p>
            </div>
          </>
        )}
      </div>
      {selectedGame && isEditing && <EditGameInfo game={selectedGame} />}
      {selectedGame && <Comments game={selectedGame} />}
    </div>
  );
};
