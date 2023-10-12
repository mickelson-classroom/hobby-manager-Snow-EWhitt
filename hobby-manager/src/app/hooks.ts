import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { CommentService } from "../features/comment/commentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IComment } from "../models/games/comment";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Redux --- Tanstack Query

export const useAllCommentsQuery = () =>
  useQuery({
    queryKey: ["comments"],
    queryFn: CommentService.getAllComments,
  });

export const useCommentsQuery = (gameId: string) => {
  return useQuery({
    queryKey: ["comments", gameId],
    queryFn: () => CommentService.getCommentsByGameId(gameId),
  });
};

export const useAddCommentMutation = (gameId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", gameId] });
    },
  });
};

export const useUpdateCommentMutation = (gameId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentService.updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", gameId] });
    },
  });
};

export const useDeleteCommentMutation = (gameId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentService.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", gameId] });
    },
  });
};
