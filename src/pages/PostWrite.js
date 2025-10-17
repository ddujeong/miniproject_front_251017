import React, { useState } from "react";
import "./PostWrite.css";

const PostWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {
    alert(`게시글 작성\n제목: ${title}\n내용: ${content}`);
    setTitle("");
    setContent("");
  };

  return (
    <div className="post-write-container">
      <h2>게시글 작성</h2>
      <form onSubmit={handlePost}>
        <input
          className="input"
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="button">
          작성
        </button>
      </form>
    </div>
  );
};

export default PostWrite;
