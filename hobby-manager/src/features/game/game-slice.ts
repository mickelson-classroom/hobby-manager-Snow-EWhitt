import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IGame, listOfGames } from "../../models/games/games";
import GameService from "./gameService";

interface gameListState {
  items: IGame[];
  index: number;
  loading: boolean;
}

const initialState: gameListState = {
  items: listOfGames,
  index: 5,
  loading: false,
};

export const getGames = createAsyncThunk("games/get", async () => {
  const games = await GameService.getAllGames();
  return games;
});

export const addGameAndGetList = createAsyncThunk(
  "games/updateAndGet",
  async (games: IGame[]) => {
    await GameService.storeGames(games);
    const gamesFromApi = await GameService.getAllGames();
    return gamesFromApi;
  }
);

export const updateGame = createAsyncThunk(
  "games/updateGame",
  async (game: IGame) => {
    const items = await GameService.getAllGames();
    const filteredItems = items.filter((item) => item.id != game.id);
    const newItemList = [
      ...filteredItems,
      game
    ];

    await GameService.storeGames(newItemList);
    return await GameService.getAllGames();
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // addGame(state, action: PayloadAction<IGame>) {
    //   const game = action.payload;
    //   state.values.push({
    //     id: state.index.toString(),
    //     title: game.title,
    //     releaseYear: game.releaseYear,
    //     genre: game.genre,
    //     image: game.image,
    //     comments: game.comments,
    //   });
    //   state.index++;
    // },
    // removeGame(state, action: PayloadAction<string>) {
    //   const gameId = action.payload;
    //   state.values = state.values.filter((game) => game.id !== gameId);
    // },
    // updateGame(state, action: PayloadAction<IGame>) {
    //   const game = action.payload;
    //   const oldGames = state.values.filter((g) => g.id !== game.id);
    //   state.values = [game, ...oldGames];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGameAndGetList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addGameAndGetList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addGameAndGetList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getGames.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGame.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateGame.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { addGame, removeGame, updateGame } = gameSlice.actions;
export default gameSlice.reducer;
