import { CustomInput, useCustomInput } from "../../components/CustomInput";
import { Spinner } from "../../components/Spinner/Spinner";
import { IComment } from "../../models/games/comment";
import { IGame } from "../../models/games/games";
import { CommentService } from "./commentsApiService";
import { FC, FormEvent, useEffect, useState } from "react";

export const Comments: FC<{ game: IGame }> = ({ game }) => {
  const [comments, setComments] = useState<IComment[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const commentControl = useCustomInput("");

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment: IComment = {
      id: Math.random(),
      body: commentControl.inputValue,
      gameId: game.id,
    };

    commentControl.setInputValue("");
    setIsLoading(true);
    CommentService.addComment(newComment).then(() => setIsLoading(false));
  };

  useEffect(() => {
    // CommentService.getAllComments().then((c) => setComments(c));
    CommentService.getComment(game.id).then((c) => setComments(c));
  }, []);

  return (
    <div className="text-start">
      <h2>Comments</h2>
      <div className="row">
        <div
          className="col col-12 col-sm-6 my-2 border border-2 rounded-3"
          style={{ overflowY: "auto", height: "20em" }}
        >
          {comments?.map(
            (c) =>
              !isLoading && (
                <div className="card mb-3" style={{ width: "20em" }}>
                  <div className="row g-0 justify-content-between">
                    <div className="col-8">
                      <div className="card-body">
                        <p>{c.body}</p>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="btn-group-vertical">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setIsLoading(true);
                            CommentService.deleteComment(c.id);
                            CommentService.getComment(game.id);
                            setIsLoading(false);
                          }}
                        >
                          Remove
                        </button>
                        <button className="btn btn-info">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
          {isLoading && <Spinner />}
        </div>
        <div className="col col-12 col-sm-6">
          <form className="form" onSubmit={(e) => {handleForm(e); CommentService.getComment(game.id);}}>
            <CustomInput controller={commentControl} label={"Comment"} />
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
