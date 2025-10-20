import { data } from "react-router-dom";
import "./Comment.css";
import { useState } from "react";
import api from "../api/axiosconfig";

const Comment = ({ comment, member, loadComment }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
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
    setEditing(false);
  };
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`/api/comment/${comment.id}`);
      alert("댓글 삭제 성공");
      loadComment();
    } catch (error) {
      if (error.response.status === 403) {
        alert("삭제 권한이 없습니다.");
      } else {
        alert("삭제 실패");
      }
    }
  };
  const isAuthor = member && member === comment.author.email;
  return (
    <div className="comment">
      <img src={comment.avatar || "https://placehold.co/40x40"} alt="avatar" />
      <div className="comment-content">
        <span className="comment-author">{comment.author.name}</span>
        <p className="comment-text">
          {editing ? (
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="comment-edit-input"
            />
          ) : (
            comment.content
          )}
        </p>

        {isAuthor && (
          <div className="comment-actions">
            {editing ? (
              <>
                <button className="action-btn edit" onClick={handleUpdate}>
                  저장
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => setEditing(false)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  className="action-btn edit"
                  onClick={() => setEditing(true)}
                >
                  수정
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete()}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Comment;
