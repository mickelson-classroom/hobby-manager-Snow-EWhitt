export interface IGame {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
  image: string;
}

export const listOfGames: IGame[] = [
  {
    id: '0',
    title: 'Minecraft',
    releaseYear: 2011,
    genre: 'Sandbox',
    image: '',
  },
  {
    id: '1',
    title: 'Dying Light',
    releaseYear: 2016,
    genre: 'Survival',
    image: '',
  },
  {
    id: '2',
    title: 'Prey',
    releaseYear: 2017,
    genre: 'Science-fiction',
    image: '',
  },
  {
    id: '3',
    title: 'DOOM',
    releaseYear: 2016,
    genre: 'First-person Shooter',
    image: '',
  },
  {
    id: '4',
    title: 'Cyberpunk 2077',
    releaseYear: 2020,
    genre: 'Science-fiction',
    image: '',
  }
]