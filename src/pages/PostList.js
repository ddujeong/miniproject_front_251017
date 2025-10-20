import "./PostList.css";
import PostCard from "../component/PostCard.js";
import { useEffect, useState } from "react";
import api from "../api/axiosconfig.js";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadPost = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/post");
      setPosts(res.data);
    } catch (error) {
      console.error(error);
      setError("게시글을 불러오는데 실패했습니다.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadPost();
  }, []);

  return (
    <div className="post-list-container">
      <h1>게시판</h1>
      {loading && <p>게시판 리스트 로딩 중...</p>}
      <div className="post-cards">
        {posts.map((p, idx) => (
          <PostCard key={idx} post={p} />
        ))}
      </div>
    </div>
  );
};
export default PostList;
