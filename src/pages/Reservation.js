import { useEffect, useState } from "react";
import "./Reservation.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";

const Reservation = ({ member }) => {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const [service, setService] = useState("커트");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const timeOptions = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  useEffect(() => {
    const reservationList = async () => {
      try {
        const res = await api.get("/api/reservation");
        setReservations(res.data);
      } catch (error) {
        console.error("예약 목록 조회 실패 : ", error);
      }
    };
    reservationList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!member) {
      alert("로그인 후 예약 가능합니다.");
      navigate("/login");
      return;
    }
    if (!service || !date || !time) {
      alert("모든 항목을 선택해주세요.");
      return;
    }
    const reservationdatetime = new Date(`${date}T${time}`);

    if (reservationdatetime < now) {
      alert("현재 시간 이전으로는 예약할 수 없습니다.");
      return;
    }
    const exists = reservations.some(
      (r) =>
        r.service === service &&
        new Date(r.reservationdatetime).getTime() ===
          reservationdatetime.getTime()
    );
    if (exists) {
      alert("이미 예약된 시간입니다. 다른시간을 선택해 주세요.");
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
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">선택</option>
            {timeOptions.map((t) => {
              const optionDateTime = new Date(`${date}T${t}`);
              const isPast = optionDateTime <= now;
              const isReserved = reservations.some(
                (r) =>
                  r.service === service &&
                  new Date(r.reservationdatetime).getTime() ===
                    optionDateTime.getTime()
              );
              return (
                <option value={t} key={t} disabled={isPast || isReserved}>
                  {t} {isReserved ? "(예약됨)" : ""}
                </option>
              );
            })}
          </select>
        </label>
        <button type="submit" className="action-btn reserve-btn">
          예약하기
        </button>
      </form>
    </div>
  );
};

export default Reservation;
