// import { useContext, useState } from "react";
// import { GameContext, GameContextType } from "../context/GameContext";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { addGame } from "../features/game/game-slice";
import { CustomInput, useCustomInput } from "../components/CustomInput";
import ImageUploader, { useImageInput } from "../components/ImageUploader";
import { getGames, addGameAndGetList } from "../features/game/game-slice";
import { Spinner } from "../components/Spinner/Spinner";
import { useEffect } from "react";

const CreateGameItem = () => {
  // const { addGame } = useContext(GameContext) as GameContextType;
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.games.items);
  const loading = useAppSelector((store) => store.games.loading);

  useEffect(() => {
    dispatch(getGames());
  }, [])

  const titleControl = useCustomInput("");
  const releaseControl = useCustomInput("");
  const genreControl = useCustomInput("");
  const imageControl = useImageInput("");

  const handleGameSubmit = (
    e: React.FormEvent,
    title: string,
    release: number,
    genre: string,
    image: string
  ) => {
    e.preventDefault();

    if (title.length > 0 && release.toString().length > 0 && genre.length > 0) {
      // addGame({
      //   id: "",
      //   title: title,
      //   releaseYear: parseInt(release),
      //   genre: genre,
      // });
      const newItemList = [
        ...items,
        {
          id: Date().valueOf.toString(),
          title,
          releaseYear: release,
          genre,
          image,
        },
      ];

      dispatch(addGameAndGetList(newItemList));
    }
  };

  return (
    <div className="container-sm text-start">
      <form className="form">
        {!loading && (
          <>
            <div className="my-2">
              <CustomInput controller={titleControl} label="Title" />
            </div>
            <div className="my-2">
              <CustomInput controller={releaseControl} label="Release Year" />
            </div>
            <div className="mt-2 mb-4">
              <CustomInput controller={genreControl} label="Genre" />
            </div>
            <div>
              <ImageUploader controller={imageControl} />
            </div>
          </>
        )}
        {loading && <Spinner />}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(event) =>
            handleGameSubmit(
              event,
              titleControl.inputValue,
              releaseControl.inputValue,
              genreControl.inputValue,
              imageControl.imageValue
            )
          }
          disabled={loading}
        >
          {/* <Link className="text-decoration-none text-black" to="/"> */}
            Submit
          {/* </Link> */}
        </button>
      </form>
    </div>
  );
};

export default CreateGameItem;
