import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GameService from "../features/game/gameService";
import { useAppSelector } from "../app/hooks";

const GamesQuery = () => {
  const queryClient = useQueryClient();

  const items = useAppSelector((store) => store.games.items);

  const query = useQuery({
    queryKey: ["games"],
    queryFn: GameService.getAllGames,
  });

  const mutation = useMutation({
    mutationFn: GameService.storeGames,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  return (
    <div>
      <ul>
        {query.data?.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate([
            ...items,
            {
              id: "100",
              title: "Test Game",
              releaseYear: 2024,
              genre: "Test",
              image: "",
            },
          ]);
        }}
      >
        Add Game
      </button>
      <button
        onClick={() => {
          mutation.mutate(items.filter((game) => game.id !== "100"));
        }}
      >
        Remove Game
      </button>
    </div>
  );
};

export default GamesQuery;
