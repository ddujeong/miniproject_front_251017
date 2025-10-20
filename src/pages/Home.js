import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>미니 관리샵</h1>
      <p>편리하게 예약하고, 후기를 확인하세요!</p>

      <div className="home-buttons">
        <button
          className="action-btn home-btn"
          onClick={() => navigate("/post")}
        >
          게시판 보기
        </button>
        <button
          className="action-btn home-btn"
          onClick={() =>
            navigate("/reservation", { state: { tab: "reservations" } })
          }
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default Home;
