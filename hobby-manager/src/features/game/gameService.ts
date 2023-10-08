import axios from 'axios';
import { IGame } from '../../models/games/games';

const url = '/api/store?key=';
const GameService = {
  storeGames: async (games: IGame[]) => {
    await axios.post(`${url}games`, games);
  },
  getAllGames: async (): Promise<IGame[]> => {
    const response = await axios.get(`${url}games`);
    
    return response.data;
  },
  deleteGame: async (id: string) => {
    const games = await GameService.getAllGames();
    const filteredGames = games.filter((game: IGame) => game.id != id);

    await GameService.storeGames(filteredGames);
  },
};

export default GameService;