import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { GameItem } from "./pages/GameDetails/GameDetails";
import { GamesList } from "./pages/GamesList";
import ErrorBoundary from "./pages/ErrorBoundary";
import CreateGameItem from "./pages/CreateGameItem";
import { Demonstration } from "./pages/Demonstration";

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
    {
      path: "demonstration",
      element: (
        <ErrorBoundary>
          <Demonstration />
        </ErrorBoundary>
      ),
    },
  ]);

  return (
    <div className="App">
      <div className="d-flex flex-column-reverse flex-sm-column" style={{ height: '100vh' }}>
        <div>
          <NavBar />
        </div>
        <div style={{ flex: 1, overflowY: 'auto'}}>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default App;
