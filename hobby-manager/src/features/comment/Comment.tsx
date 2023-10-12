import { FC, useState } from "react";
import { IComment } from "../../models/games/comment";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../app/hooks";
import { CustomInput, useCustomInput } from "../../components/CustomInput";

const Comment: FC<{ comment: IComment }> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateCommentMutation = useUpdateCommentMutation(comment.gameId);
  const deleteCommentMutation = useDeleteCommentMutation(comment.gameId);
  const editCommentControl = useCustomInput(comment.body);

  const handleOnClick = () => {
    if (isEditing) {
      const editedComment: IComment = {
        ...comment,
        body: editCommentControl.inputValue,
      };

      updateCommentMutation.mutate(editedComment);
    }

    setIsEditing((oldBool) => !oldBool);
  };

  return (
    <div className="row g-0 mb-3 align-items-center">
      <div className="col card p-3">
        <div className="">
          {isEditing ? (
            <CustomInput controller={editCommentControl} />
          ) : (
            <p>{editCommentControl.inputValue}</p>
          )}
        </div>
      </div>
      <div className="col-auto text-center">
        <button
          className="btn btn-sm btn-danger mx-2"
          onClick={() => {
            deleteCommentMutation.mutate(comment.id);
          }}
          disabled={updateCommentMutation.isLoading}
        >
          Remove
        </button>
        <button
          className={`btn btn-sm btn-${isEditing ? "success" : "info"}`}
          onClick={handleOnClick}
          disabled={updateCommentMutation.isLoading}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Comment;
