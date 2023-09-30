import {
  FC,
  useEffect,
  // useContext,
} from "react";
import { IGame } from "../../models/games/games";
import { CustomInput, useCustomInput } from "../../components/CustomInput";
// import { GameContext, GameContextType } from "../../context/GameContext";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { removeGame, updateGame } from "../../features/game/game-slice";
import { CustomSelect, useCustomSelect } from "../../components/CustomSelect";
import ImageUploader, { useImageInput } from "../../components/ImageUploader";

export const EditGameInfo: FC<{ game: IGame }> = ({ game }) => {
  // const { updateGame, removeGame } = useContext(GameContext) as GameContextType;
  const dispatch = useAppDispatch();

  const titleControl = useCustomInput(game.title);
  const releaseControl = useCustomInput(game.releaseYear);
  const genreControl = useCustomInput(game.genre);
  const selectControl = useCustomSelect();
  const imageControl = useImageInput(game.image);

  useEffect(() => {
    dispatch(
      updateGame({
        ...game,
        title: titleControl.inputValue,
      })
    );
  }, [titleControl.inputValue]);

  useEffect(() => {
    dispatch(
      updateGame({
        ...game,
        releaseYear: parseInt(releaseControl.inputValue),
      })
    );
  }, [releaseControl.inputValue]);

  useEffect(() => {
    dispatch(
      updateGame({
        ...game,
        genre: genreControl.inputValue,
      })
    );
  }, [genreControl.inputValue]);

  useEffect(() => {
    dispatch(
      updateGame({
        ...game,
        image: imageControl.imageValue,
      })
    );
  }, [imageControl.imageValue]);

  return (
    <div className="mx-sm-5">
      <CustomInput controller={titleControl} label="Title" />
      <CustomInput controller={releaseControl} label="Release Year" />
      <CustomInput controller={genreControl} label="Genre" />
      <CustomSelect
        controller={selectControl}
        label="Favorite?"
        defaultValue="no"
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </CustomSelect>
      <ImageUploader controller={imageControl} />
      <button
        className="btn btn-danger mt-3"
        // onClick={() => removeGame(game.id)}
        onClick={() => dispatch(removeGame(game.id))}
      >
        <Link className="text-decoration-none text-white" to="/">
          Delete
        </Link>
      </button>
    </div>
  );
};
