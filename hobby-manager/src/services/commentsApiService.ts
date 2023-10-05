import axios from "axios";
import { IComment } from "../models/games/comment";

const url = "/api/store?key=";

export const CommentService = {
  getAllComments: async (): Promise<IComment[]> => {
    const response = await axios.get(`${url}comment`);
    const comments = response.data;

    try {
      if (Array.isArray(comments)) {
        return comments as IComment[];
      } else {
        // If the response is not an array, convert it to an array

        return [comments] as IComment[];
      }
    } catch (error) {
      console.error("Error fetching comments:", error);

      throw error;
    }
  },

  async getComment(gameId: string) {
    const comments = await this.getAllComments();
    const filteredComments = comments.filter(comment => comment.gameId == gameId);
    
    return filteredComments;
  },

  async addComment(comment: IComment) {
    const comments = await this.getAllComments();
    const newComments = [...comments, comment];
    await axios.post(`${url}comment`, newComments);
  },

  async deleteComment(commentId: number) {
    const comments = await this.getAllComments();
    const newComments = comments.filter(comment => comment.id != commentId);
    await axios.post(`${url}comment`, newComments);
  }
};
