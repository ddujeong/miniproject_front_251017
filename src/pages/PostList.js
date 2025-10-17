import "./PostList.css";
import PostCard from "../component/PostCard.js";

const PostList = () => {
  const dummyPosts = [
    {
      title: "첫 번째 게시글",
      author: "김수정",
      date: "2025-10-17",
      content: "오늘 병원 다녀왔어요. 후기 남깁니다.",
      category: "후기",
    },
    {
      title: "두 번째 게시글",
      author: "이준호",
      date: "2025-10-16",
      content: "미용실 예약하고 왔어요. 만족!",
      category: "예약",
    },
    {
      title: "세 번째 게시글",
      author: "박서연",
      date: "2025-10-15",
      content: "병원 예약 팁 공유합니다.",
      category: "정보",
    },
  ];
  return (
    <div className="post-list-container">
      <h1>게시판</h1>
      <div className="post-cards">
        {dummyPosts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};
export default PostList;
