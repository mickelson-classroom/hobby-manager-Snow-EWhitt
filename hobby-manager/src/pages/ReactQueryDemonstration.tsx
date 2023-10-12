import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GameService from "../features/game/gameService";

const GamesQuery = () => {
  const queryClient = useQueryClient();

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
            ...query.data ?? [],
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
          if (query.data)
            mutation.mutate(query.data.filter((game) => game.id !== "100"));
        }}
      >
        Remove Game
      </button>
    </div>
  );
};

export default GamesQuery;
