import { Link } from "react-router-dom";
import { GameContext, GameContextType } from "../context/GameContext";
import { useContext, useMemo, useState } from "react";
import { FilterInput, useFilterInput } from "../components/FilterInput";
import ToastList from "../components/ToastList/ToastList";
import { ToastContext, ToastContextType } from "../context/ToastContext";

export const GamesList = () => {
  const { games } = useContext(GameContext) as GameContextType;
  const { toasts, showToast, removeToast } = useContext(
    ToastContext
  ) as ToastContextType;

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

  const handle50Toasts = () => {
    for (let i = 0; i < 50; i++) {
      showToast("A success message", "success");
    }
  };

  // throw new Error("Error has appeared!");

  return (
    <div className="container-lg">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 col-lg-4 my-2 my-md-3">
          <FilterInput inputBar={filterControl} />
        </div>
        <div className="row row-col-4">
          <div className="col">
            <button
              className="btn btn-success"
              onClick={() => showToast("A success message", "success")}
            >
              Show Success Toast
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-warning"
              onClick={() => showToast("A warning message", "warning")}
            >
              Show Warning Toast
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-danger"
              onClick={() => showToast("A danger message", "danger")}
            >
              Show Danger Toast
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-secondary text-white"
              onClick={handle50Toasts}
            >
              Show 50 Toasts
            </button>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 my-3">
        {filteredGames.map((g) => (
          <Link
            key={g.id}
            className="col text-decoration-none"
            to={`/games/${g.id}`}
          >
            <div className="card m-2 border-primary border-3 shadow">
              <div className="card-body">
                <h5 className="card-title text-secondary">{g.title}</h5>
                <p className="card-text">
                  <strong>Genre: </strong>
                  {g.genre}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ToastList data={toasts} removeToast={removeToast} />
    </div>
  );
};
