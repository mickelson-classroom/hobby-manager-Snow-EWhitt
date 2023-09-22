import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./routes/root";
import ErrorPage from "./pages/ErrorPage";
import { GameItem } from "./routes/GameItem";
import { GamesList } from "./routes/GamesList";
import ErrorBoundary from "./pages/ErrorBoundary";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      // errorElement: <ErrorPage />,
      children: [
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
      ],
    },
  ]);

  return (
    <div className="App">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
