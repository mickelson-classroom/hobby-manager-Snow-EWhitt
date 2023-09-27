import { useContext, useState } from "react";
// import { GameContext, GameContextType } from "../context/GameContext";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addGame } from "../features/game/game-slice";

const CreateGameItem = () => {
  const [title, setTitle] = useState<string>("");
  const [release, setRelease] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  // const { addGame } = useContext(GameContext) as GameContextType;
  const dispatch = useAppDispatch();

  const handleGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length > 0 && release.length > 0 && genre.length > 0) {
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
          releaseYear: parseInt(release),
          genre,
        })
      );
    }
  };

  return (
    <div className="container-sm text-start">
      <form className="form">
        <div className="my-2">
          <label htmlFor="titleInput" className="form-label">
            Title
          </label>
          <input
            id="titleInput"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label htmlFor="releaseInput" className="form-label">
            Release Year
          </label>
          <input
            id="releaseInput"
            className="form-control"
            onChange={(e) => setRelease(e.target.value)}
          />
        </div>
        <div className="mt-2 mb-4">
          <label htmlFor="genreInput" className="form-label">
            Genre
          </label>
          <input
            id="genreInput"
            type="text"
            className="form-control"
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleGameSubmit(e)}
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
