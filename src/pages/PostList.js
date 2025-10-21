import "./PostList.css";
import PostCard from "../component/PostCard.js";
import { useEffect, useState } from "react";
import api from "../api/axiosconfig.js";
const categories = ["전체", "헤어", "피부", "패키지", "이벤트"];

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("전체");
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
  const filteredPosts =
    filter == "전체" ? posts : posts.filter((post) => post.category === filter);

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <div className="post-list-container">
      <h1>후기 게시판</h1>
      {loading && <p className="err">게시판 리스트 로딩 중...</p>}

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <p className="err">아직 작성 된 후기가 없습니다</p>
      )}
      <div className="post-cards">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default PostList;
