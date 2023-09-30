// import { useContext, useState } from "react";
// import { GameContext, GameContextType } from "../context/GameContext";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addGame } from "../features/game/game-slice";
import { CustomInput, useCustomInput } from "../components/CustomInput";
import ImageUploader, { useImageInput } from "../components/ImageUploader";

const CreateGameItem = () => {
  // const { addGame } = useContext(GameContext) as GameContextType;
  const dispatch = useAppDispatch();

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
      dispatch(
        addGame({
          id: "",
          title,
          releaseYear: release,
          genre,
          image,
        })
      );
    }
  };

  return (
    <div className="container-sm text-start">
      <form className="form">
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
        >
          <Link className="text-decoration-none text-black" to="/">
            Submit
          </Link>
        </button>
      </form>
    </div>
  );
};

export default CreateGameItem;
