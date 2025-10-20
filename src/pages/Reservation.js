import { useState } from "react";
import "./Reservation.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";

const Reservation = () => {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const currentTime = now.toTimeString().slice(0, 5);
  const [service, setService] = useState("커트");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!service || !date || !time) {
      alert("모든 항목을 선택해주세요.");
      return;
    }
    const reservationdatetime = new Date(`${date}T${time}`);

    if (reservationdatetime < now) {
      alert("현재 시간 이전으로는 예약할 수 없습니다.");
      return;
    }
    await api.post("/api/reservation", {
      service,
      reservationdatetime: `${date}T${time}`,
    });
    // 입력 초기화
    setService("");
    setDate("");
    setTime("");
    navigate("/profile", { state: { activeTab: "reservations" } });
  };
  return (
    <div className="reservation-card">
      <h2>예약하기</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <label>
          서비스
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="커트">커트</option>
            <option value="염색">염색</option>
            <option value="스킨케어">스킨케어</option>
          </select>
        </label>
        <label>
          날짜
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          시간
          <input
            type="time"
            value={time}
            min={date === today ? currentTime : "00:00"}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button type="submit" className="action-btn reserve-btn">
          예약하기
        </button>
      </form>
    </div>
  );
};

export default Reservation;
