import {
  AnyAction,
  Dispatch,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import toastReducer from "../features/toast/toast-slice";
import gameReducer from "../features/game/game-slice";

const store = configureStore({
  reducer: {
    toasts: toastReducer,
    games: gameReducer,
  },
});

export default store;

export type AppDispatch = ThunkDispatch<
  typeof store.dispatch,
  null | undefined,
  AnyAction
> &
  Dispatch<AnyAction>;

export type RootState = ReturnType<typeof store.getState>;
