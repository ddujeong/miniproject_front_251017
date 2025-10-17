import "./Comment.css";

const Comment = ({ author, content, avatar }) => {
  return (
    <div className="comment">
      <img alt="avatar" />
      <div className="comment-content">
        <span className="comment-author">{author}</span>
        <span className="comment-date">{"2025"}</span>
        <p className="comment-text">{content}</p>
      </div>
    </div>
  );
};
export default Comment;
