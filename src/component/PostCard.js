import "./PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="badge">{post.category}</div> {/* 카테고리 배지 */}
      <h2>{post.title}</h2>
      <p className="author">
        <img alt="avatar" />
        {post.author}
        <span className="date">{post.date}</span>
      </p>
      <p>{post.content}</p>
    </div>
  );
};
export default PostCard;
