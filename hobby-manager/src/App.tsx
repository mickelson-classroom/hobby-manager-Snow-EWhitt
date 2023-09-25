import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { GameItem } from "./pages/GameDetails/GameDetails";
import { GamesList } from "./pages/GamesList";
import ErrorBoundary from "./pages/ErrorBoundary";
import CreateGameItem from "./pages/CreateGameItem";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <GamesList />
        </ErrorBoundary>
      ),
    },
    {
      path: "games/:gameId",
      element: (
        <ErrorBoundary>
          <GameItem />
        </ErrorBoundary>
      ),
    },
    {
      path: "create-game",
      element: (
        <ErrorBoundary>
          <CreateGameItem />
        </ErrorBoundary>
      ),
    },
  ]);

  return (
    <div className="App">
      <NavBar />
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
