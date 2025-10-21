import { useState } from "react";
import api from "../api/axiosconfig";

const CommentEdit = ({ comment, setEditing, loadComment }) => {
  const [content, setContent] = useState(comment.content);

  const handleUpdate = async () => {
    if (!window.confirm("정말 수정 하시겠습니까?")) {
      return;
    }
    try {
      const res = await api.put(`/api/comment/${comment.id}`, { content });
      alert("댓글 수정 성공");
      setContent(res.data.content);
      setEditing(false);
      loadComment();
    } catch (error) {
      if (error.response.status === 403) {
        alert("수정 권한이 없습니다.");
      } else {
        alert("수정 실패");
      }
    }
  };
  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="comment-edit-input"
      />
      <>
        <button className="action-btn edit" onClick={handleUpdate}>
          저장
        </button>
        <button className="action-btn delete" onClick={() => setEditing(false)}>
          취소
        </button>
      </>
    </div>
  );
};
export default CommentEdit;
