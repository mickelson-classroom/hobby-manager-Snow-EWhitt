import axios from "axios";
import { IComment } from "../../models/games/comment";

const url = "/api/store?key=";

export const CommentService = {
  addComment: async (comment: IComment) => {
    const comments = await CommentService.getAllComments();
    const newComments = [...comments, comment];
    await axios.post(`${url}comments`, newComments);
  },

  getAllComments: async (): Promise<IComment[]> => {
    const response = await axios.get(`${url}comments`);
    const comments = response.data;

    // try {
    //   if (Array.isArray(comments)) {
    //     return comments as IComment[];
    //   } else {
    //     // If the response is not an array, convert it to an array

    //     return [comments] as IComment[];
    //   }
    // } catch (error) {
    //   console.error("Error fetching comments:", error);

    //   throw error;
    // }

    return comments as IComment[];
  },

  getCommentsByGameId: async (gameId: string): Promise<IComment[]> => {
    const comments = await CommentService.getAllComments();
    const filteredComments = comments.filter(
      (comment) => comment.gameId === gameId
    );

    return filteredComments;
  },

  getComment: async (commentId: number): Promise<IComment[]> => {
    const comments = await CommentService.getAllComments();
    const comment = comments.filter(
      (comment) => comment.id === commentId
    );

    return comment;
  },

  updateComment: async (comment: IComment) => {
    await CommentService.deleteComment(comment.id);
    await CommentService.addComment(comment);
  },

  deleteComment: async (commentId: number) => {
    const comments = await CommentService.getAllComments();
    const newComments = comments.filter((comment) => comment.id !== commentId);
    await axios.post(`${url}comments`, newComments);
  },
};
