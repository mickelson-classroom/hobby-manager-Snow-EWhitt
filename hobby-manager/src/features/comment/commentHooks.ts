import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommentService } from "./commentService";

const commentKeys = {
  all: ['comments'] as const,
  game: (gameId: string) => [...commentKeys.all, gameId] as const,
}

export const useAllCommentsQuery = () =>
  useQuery({
    queryKey: commentKeys.all,
    queryFn: CommentService.getAllComments,
    refetchInterval: 30 * 1000,
  });

export const useCommentsQuery = (gameId: string) => {
  return useQuery({
    queryKey: commentKeys.game(gameId),
    queryFn: () => CommentService.getCommentsByGameId(gameId),
  });
};

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
  });
};

export const useUpdateCommentMutation = (gameId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentService.updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.game(gameId) });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentService.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
  });
};
