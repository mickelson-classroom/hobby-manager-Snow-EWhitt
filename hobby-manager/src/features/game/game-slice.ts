import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame, listOfGames } from "../../models/games/games";

interface gameListState {
  values: IGame[];
  index: number;
}

const initialState: gameListState = {
  values: listOfGames,
  index: 5,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addGame(state, action: PayloadAction<IGame>) {
      const game = action.payload;

      state.values.push({
        id: state.index.toString(),
        title: game.title,
        releaseYear: game.releaseYear,
        genre: game.genre,
        image: game.image,
      });

      state.index++;
    },
    removeGame(state, action: PayloadAction<string>) {
      const gameId = action.payload;

      state.values = state.values.filter((game) => game.id !== gameId);
    },
    updateGame(state, action: PayloadAction<IGame>) {
      const game = action.payload;
      const oldGames = state.values.filter((g) => g.id !== game.id);

      state.values = [game, ...oldGames];
    },
  },
});

export const { addGame, removeGame, updateGame } = gameSlice.actions;
export default gameSlice.reducer;
