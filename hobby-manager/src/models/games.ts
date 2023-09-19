export interface game {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
}

export const games: game[] = [
  {
    id: '0',
    title: 'Minecraft',
    releaseYear: 2011,
    genre: 'sandbox'
  },
  {
    id: '1',
    title: 'Dying Light',
    releaseYear: 2016,
    genre: 'survival'
  },
  {
    id: '2',
    title: 'Prey',
    releaseYear: 2017,
    genre: 'science-fiction'
  }
]