import { useEffect, useState } from "react";
import PostCard from "../component/PostCard";
import "./Profile.css";
import api from "../api/axiosconfig";
import MyReservation from "../component/MyReservation";
import { useLocation, useNavigate } from "react-router-dom";
import Reservation from "./Reservation";

const Profile = () => {
  const location = useLocation();
  const [member, setMember] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "profile"
  );
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const myPage = async () => {
    try {
      const res = await api.get("/api/member/profile");
      setMember(res.data.member);
      setName(res.data.member.name);
      setPosts(res.data.posts);
      setReservations(res.data.myReservations);
    } catch (error) {
      console.error("프로필 불러오기 실패:", error);
      setMember(null);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    myPage();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await api.put("/api/member/profile", { name, password });
      alert("프로필 수정 성공");
      setMember(res.data);
      setEditing(false);
      setPassword("");
    } catch (error) {
      alert("프로필 수정 실패");
      console.error(error);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("정말 취소 하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`/api/reservation/${id}`);
      alert("예약 취소 성공");
      myPage();
    } catch (error) {
      alert("삭제 실패");
    }
  };

  const dummyPosts = [
    { id: 1, title: "내 헤어컷 후기", author: "나", date: "2025-10-17" },
    { id: 2, title: "내 피부관리 후기", author: "나", date: "2025-10-16" },
  ];

  if (loading) return <p>프로필 로딩 중...</p>;
  if (!member) {
    <p>로그인이 필요합니다.</p>;
    navigate("/login");
    return;
  }

  return (
    <div className="profile-container">
      <div className="tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          프로필
        </button>
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          내 게시글
        </button>
        <button
          className={activeTab === "reservations" ? "active" : ""}
          onClick={() => setActiveTab("reservations")}
        >
          내 예약
        </button>
      </div>
      {activeTab === "profile" && (
        <div className="profile-card">
          <img
            src={"/default-avatar.png"}
            alt="프로필"
            className="profile-avatar"
          />
          <div className="profile-info">
            {editing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="새 비밀번호"
                  required
                />
                <div className="button-group">
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
              </>
            ) : (
              <>
                <h2>{member.name}</h2>
                <p>{member.email}</p>
                <button
                  className="action-btn edit"
                  onClick={() => setEditing(true)}
                >
                  프로필 수정
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {activeTab === "posts" && (
        <div className="profile-posts">
          <h3>내 게시글</h3>
          <div className="post-list">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
      {activeTab === "reservations" && (
        <div className="profile-reservations">
          <h3>내 예약</h3>
          <MyReservation
            reservations={reservations || []}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
