import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";
import { useState } from "react";

const CommentForm = ({ member, comment, loadComment, id }) => {
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    if (!member) {
      alert("로그인 후 댓글을 작성해주세요.");
      navigate("/login");
      return;
    }
    try {
      await api.post(`/api/comment/${id}`, { content: commentText });
      alert("댓글 작성 완료");
      loadComment();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="comment-form">
      <input
        className="comment-input"
        placeholder={member ? "댓글 작성..." : "로그인 후 댓글 작성 해주세요"}
        readOnly={!member}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        className="comment-button"
        onClick={handleComment}
        disabled={!member}
      >
        댓글 달기
      </button>
    </div>
  );
};
export default CommentForm;
