import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toastReducer from '../features/toast/toast-slice';
import gameReducer from '../features/game/game-slice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// export const store = configureStore({
//   reducer: {
//     toasts: toastReducer,
//     games: gameReducer,
//   },
// });

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  toasts: toastReducer,
  games: gameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;