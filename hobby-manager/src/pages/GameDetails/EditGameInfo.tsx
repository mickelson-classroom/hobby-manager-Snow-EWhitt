import { FC, useContext, useState } from "react";
import { IGame } from "../../models/games";
import { CustomInput } from "../../components/CustomInput";
import { GameContext, GameContextType } from "../../context/GameContext";
import { Link } from "react-router-dom";

export const EditGameInfo: FC<{ game: IGame }> = ({ game }) => {
  const { updateGame, removeGame } = useContext(GameContext) as GameContextType;

  const [updatedTitle, setUpdatedTitle] = useState<string>(game.title);
  const [updatedRelease, setUpdatedRelease] = useState(game.releaseYear);
  const [updatedGenre, setUpdatedGenre] = useState(game.genre);

  return (
    <div className="mx-sm-5">
      <CustomInput
        id="updateTitle"
        value={updatedTitle}
        onChange={(value) => {
          setUpdatedTitle(value);
          updateGame({
            ...game,
            title: value,
          });
        }}
      >
        Title:
      </CustomInput>
      <CustomInput
        id="updateReleaseYear"
        value={updatedRelease}
        onChange={(year) => {
          setUpdatedRelease(parseInt(year));
          updateGame({
            ...game,
            releaseYear: parseInt(year),
          });
        }}
      >
        Release Year:
      </CustomInput>
      <CustomInput
        id="updateGenre"
        value={updatedGenre}
        onChange={(genre) => {
          setUpdatedGenre(genre);
          updateGame({
            ...game,
            genre: genre,
          });
        }}
      >
        Genre:
      </CustomInput>
      <button
        className="btn btn-danger mt-3"
        onClick={() => removeGame(game.id)}
      >
        <Link className="text-decoration-none text-white" to="/">
          Delete
        </Link>
      </button>
    </div>
  );
};
