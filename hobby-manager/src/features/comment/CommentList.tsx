import { CustomInput, useCustomInput } from "../../components/CustomInput";
import { Spinner } from "../../components/Spinner/Spinner";
import { IComment } from "../../models/games/comment";
import { FC, FormEvent } from "react";
import ErrorPage from "../../pages/ErrorPage";
import Comment from "./Comment";
import { useAddCommentMutation, useCommentsQuery } from "../../app/hooks";

export const Comments: FC<{ gameId: string }> = ({ gameId }) => {
  const comments = useCommentsQuery(gameId);
  const addCommentMutation = useAddCommentMutation(gameId);
  const addCommentControl = useCustomInput("");

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment: IComment = {
      id: Math.random(),
      body: addCommentControl.inputValue,
      gameId: gameId,
    };

    addCommentControl.setInputValue("");
    addCommentMutation.mutate(newComment);
  };

  if (comments.isError) return <ErrorPage />;

  return (
    <div className="text-start">
      <h2>Comments</h2>
      <div className="row">
        <div
          className="col col-12 col-sm-6 my-2 border border-2 rounded-3 py-2"
          style={{ overflowY: "auto", height: "20em" }}
        >
          {comments.data?.map(
            (currentComment) =>
              !comments.isFetching && <Comment comment={currentComment} />
          )}
          {comments.isFetching && <Spinner />}
        </div>
        <div className="col col-12 col-sm-6">
          <form className="form" onSubmit={(e) => handleForm(e)}>
            <CustomInput controller={addCommentControl} label={"Comment"} />
            <button
              type="submit"
              className="btn btn-success"
              disabled={comments.isFetching}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
