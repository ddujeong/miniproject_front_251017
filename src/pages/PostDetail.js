import { useEffect, useState } from "react";
import "./PostDetail.css";
import Comment from "../component/Comment";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosconfig";

const PostDetail = ({ member }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams(); // board/:id id 파라미터 받아오기
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };
  const loadPost = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/post/${id}`);
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (error) {
      setError("해당 게시글은 존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`/api/post/${id}`);
      alert("게시글 삭제 성공");
      navigate("/post");
    } catch (error) {
      if (error.response.status === 403) {
        alert("삭제 권한이 없습니다.");
      } else {
        alert("삭제 실패");
      }
    }
  };
  const handleUpdate = async () => {
    if (!window.confirm("정말 수정 하시겠습니까?")) {
      return;
    }
    try {
      const res = await api.put(`/api/post/${id}`, { title, content });
      alert("게시글 수정 성공");
      setPost(res.data);
      setEditing(false);
      navigate(`/post/${id}`);
    } catch (error) {
      if (error.response.status === 403) {
        alert("수정 권한이 없습니다.");
      } else {
        alert("수정 실패");
      }
    }
  };
  const loadComment = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/comment/${id}`);
      setComment(res.data);
    } catch (error) {
      setError("해당 댓글은 존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
    loadComment();
  }, [id]);
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

  if (loading) return <p>게시글 로딩 중...</p>;
  if (!post) {
    return <div>Loading...</div>;
  }
  const isAuthor = member && member === post.author.email;
  return (
    <div className="post-detail-container">
      {editing ? (
        <div className="edit_form">
          <h2>글 수정하기</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="button_group">
            <button className="action-btn edit" onClick={handleUpdate}>
              저장
            </button>
            <button
              className="action-btn delete"
              onClick={() => setEditing(false)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="post-detail-card">
          <div className="post-header">
            <h2>{post.title}</h2>
            <span className="post-badge">{post.category}</span>
          </div>
          <div className="post-meta">
            <span>작성자: {post.author.name}</span>
            <span>이메일: {post.author.email}</span>
            <span>작성일: {formatDate(post.date)}</span>
            <span>조회수: {post.hit}</span>
          </div>
          <div className="post-content">{post.content}</div>

          {isAuthor && (
            <div className="post-actions">
              <button
                className="action-btn edit"
                onClick={() => setEditing(true)}
              >
                수정
              </button>
              <button className="action-btn delete" onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
      )}

      <div className="comments-section">
        <h3>댓글 [{comment.length}]</h3>
        {comment && comment.length > 0 ? (
          comment.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              member={member}
              loadComment={loadComment}
            />
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}

        <div className="comment-form">
          <input
            className="comment-input"
            placeholder="댓글 작성..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="comment-button" onClick={handleComment}>
            댓글 달기
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
