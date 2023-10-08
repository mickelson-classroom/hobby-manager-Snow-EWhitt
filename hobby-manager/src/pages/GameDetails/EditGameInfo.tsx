import {
  FC,
  useEffect,
  // useContext,
} from "react";
import { IGame } from "../../models/games/games";
import { CustomInput, useCustomInput } from "../../components/CustomInput";
// import { GameContext, GameContextType } from "../../context/GameContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { removeGame, updateGame } from "../../features/game/game-slice";
import { CustomSelect, useCustomSelect } from "../../components/CustomSelect";
import ImageUploader, { useImageInput } from "../../components/ImageUploader";
import { updateAndGetGames } from "../../features/game/game-slice";
import { Link } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";

export const EditGameInfo: FC<{ game: IGame }> = ({ game }) => {
  // const { updateGame, removeGame } = useContext(GameContext) as GameContextType;
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.games.items);
  const loading = useAppSelector((store) => store.games.loading);

  const titleControl = useCustomInput(game.title);
  const releaseControl = useCustomInput(game.releaseYear);
  const genreControl = useCustomInput(game.genre);
  const selectControl = useCustomSelect();
  const imageControl = useImageInput(game.image);

  // useEffect(() => {
  //   const newItemList = [
  //     ...items,
  //     {
  //       ...game,
  //       title: titleControl.inputValue,
  //     },
  //   ];

  //   dispatch(updateAndGetGames(newItemList));
  // }, [titleControl.inputValue]);

  // useEffect(() => {
  //   const newItemList = [
  //     ...items,
  //     {
  //       ...game,
  //       releaseYear: releaseControl.inputValue,
  //     },
  //   ];

  //   dispatch(updateAndGetGames(newItemList));
  // }, [releaseControl.inputValue]);

  // useEffect(() => {
  //   const newItemList = [
  //     ...items,
  //     {
  //       ...game,
  //       genre: genreControl.inputValue,
  //     },
  //   ];

  //   dispatch(updateAndGetGames(newItemList));
  // }, [genreControl.inputValue]);

  // useEffect(() => {
  //   const newItemList = [
  //     ...items,
  //     {
  //       ...game,
  //       image: imageControl.imageValue,
  //     },
  //   ];

  //   dispatch(updateAndGetGames(newItemList));
  // }, [imageControl.imageValue]);

  const handleSubmit = () => {
    const newItemList = [
      ...items,
      {
        ...game,
        title: titleControl.inputValue,
        releaseYear: releaseControl.inputValue,
        genre: genreControl.inputValue,
        image: imageControl.imageValue,
      },
    ];

    dispatch(updateAndGetGames(newItemList));
  };

  return (
    <div className="mx-sm-5">
      {!loading && (
        <>
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
        </>
      )}
      {loading && <Spinner />}
      <div className="d-flex mt-3 justify-content-around">
        <button
          className="btn btn-danger"
          // onClick={() => removeGame(game.id)}
          onClick={() => {
            const newItemList = items.filter((item) => item.id != game.id);

            dispatch(updateAndGetGames(newItemList));
          }}
          disabled={loading}
        >
          <Link className="text-decoration-none text-white" to="/">
            Delete
          </Link>
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
