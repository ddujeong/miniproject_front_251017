import React, { useState } from "react";
import "./PostWrite.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";

const PostWrite = ({ member }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    if (!member) {
      alert("로그인 후 글을 작성해주세요");
      return navigate("/login");
    }
    try {
      await api.post("/api/post", { title, content });
      alert("글 작성 완료");
      navigate("/post");
    } catch (error) {
      console.error(error);
    }
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
        <button
          type="button"
          onClick={() => navigate("/post")}
          className="button"
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default PostWrite;
