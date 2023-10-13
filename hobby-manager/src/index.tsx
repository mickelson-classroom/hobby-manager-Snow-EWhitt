import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap";
import "./assests/custom.scss";
// import GameContextProvider from "./context/GameContext";
// import ToastContextProvider from "./context/ToastContext";
import { Provider } from "react-redux";
import store from "./app/store";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) =>
      toast.error(`Something went wrong: ${error.message}`),
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <GameContextProvider> */}
    {/* <ToastContextProvider> */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster />
        <App />
      </Provider>
    </QueryClientProvider>
    {/* </ToastContextProvider> */}
    {/* </GameContextProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
