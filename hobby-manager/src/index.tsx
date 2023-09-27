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
import { store, persistor } from "./app/store";

import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <GameContextProvider> */}
    {/* <ToastContextProvider> */}

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* </ToastContextProvider> */}
    {/* </GameContextProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
