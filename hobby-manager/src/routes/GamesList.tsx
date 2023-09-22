import { Link } from "react-router-dom";
import { GameContext, GameContextType } from "../context/gameContext";
import { useContext, useMemo, useState } from "react";
import { FilterInput, useFilterInput } from "../components/FilterInput";

export const GamesList = () => {
  const [title, setTitle] = useState<string>("");
  const [release, setRelease] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  const { games, addGame } = useContext(GameContext) as GameContextType;
  const filterControl = useFilterInput();

  const filteredGames = useMemo(
    () =>
      games.filter((g) => {
        return g.title
          .toLocaleLowerCase()
          .includes(filterControl.filterValue.toLocaleLowerCase());
      }),
    [games, filterControl.filterValue]
  );

  const handleGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGame({
      id: "",
      title: title,
      releaseYear: parseInt(release),
      genre: genre,
    });
  };

  // throw new Error("Error has appeared!");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 col-lg-4 my-2 my-md-3">
          <FilterInput inputBar={filterControl} />
        </div>
      </div>
      <div className="d-flex flex-wrap m-3">
        {filteredGames.map((g) => (
          <Link
            key={g.id}
            className="card m-3 border-primary border-3 shadow"
            to={`/games/${g.id}`}
          >
            <div className="card-body">
              <h5 className="card-title text-secondary">{g.title}</h5>
              <p className="card-text">
                <strong>Genre:</strong> {g.genre}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-start">
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
            className="btn btn-primary text-white"
            onClick={(e) => handleGameSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
