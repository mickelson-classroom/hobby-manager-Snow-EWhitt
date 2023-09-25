export interface IGame {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
}

export const listOfGames: IGame[] = [
  {
    id: '0',
    title: 'Minecraft',
    releaseYear: 2011,
    genre: 'Sandbox'
  },
  {
    id: '1',
    title: 'Dying Light',
    releaseYear: 2016,
    genre: 'Survival'
  },
  {
    id: '2',
    title: 'Prey',
    releaseYear: 2017,
    genre: 'Science-fiction'
  }
]