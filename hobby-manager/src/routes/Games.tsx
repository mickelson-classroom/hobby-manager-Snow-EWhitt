import { Link } from "react-router-dom";
import { games } from "../models/games";

export default function Games() {
  return (
    <div className="container">
      <div className="d-flex flex-wrap">
        {games.map((game) => (
          <Link key={game.id} className="card m-3 border-primary border-3 shadow" to={`/games/${game.id}`}>
            <div className="card-body">
              <h5 className="card-title text-secondary">{game.title}</h5>
              <p className="card-text">
                <strong>Genre:</strong> {game.genre}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
