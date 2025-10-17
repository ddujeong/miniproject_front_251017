import PostCard from "../component/PostCard";
import "./Profile.css";

const Profile = () => {
  const dummyPosts = [
    { id: 1, title: "내 헤어컷 후기", author: "나", date: "2025-10-17" },
    { id: 2, title: "내 피부관리 후기", author: "나", date: "2025-10-16" },
  ];
  return (
    <div className="container">
      <h2>마이페이지</h2>
      <div className="info">
        <p>이름: 한수정</p>
        <p>이메일: test@example.com</p>
      </div>

      <div className="posts">
        <h3>내 게시글</h3>
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default Profile;
