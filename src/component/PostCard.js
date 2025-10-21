import { useNavigate } from "react-router-dom";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };
  return (
    <div
      className="post-card"
      key={post.id}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div className={`post-card badge ${post.category}`}>{post.category}</div>{" "}
      {/* 카테고리 배지 */}
      <h2>
        {post.title}[{post.comments.length}]
      </h2>
      <p className="author">
        <img alt="avatar" />
        {post.author.name}
        <span className="date">{formatDate(post.date)}</span>
        <span className="date">조회수: {post.hit}</span>
      </p>
      <p>{post.content}</p>
    </div>
  );
};
export default PostCard;
