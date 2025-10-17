import { useState } from "react";
import "./PostDetail.css";
import Comment from "../component/Comment";

const PostDetail = () => {
  const [comments, setComments] = useState([
    { id: 1, author: "민지", content: "좋은 후기네요!" },
    { id: 2, author: "수현", content: "저도 예약해야겠어요." },
  ]);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {};
  return (
    <div className="post-detail-container">
      <div className="post-detail-card">
        <h2>헤어컷 후기</h2>
        <p>작성자: 수정</p>
        <p>2025-10-17</p>
        <p>오늘 시술 정말 만족스러웠어요!</p>
      </div>

      <h3>댓글</h3>
      {comments.map((c) => (
        <Comment
          key={c.id}
          author={c.author}
          content={c.content}
          avatar="https://via.placeholder.com/40"
        />
      ))}

      <input
        className="comment-input"
        placeholder="댓글 작성..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button className="comment-button" onClick={addComment}>
        댓글 달기
      </button>
    </div>
  );
};
export default PostDetail;
