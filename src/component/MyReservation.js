import "../pages/Reservation.css";

const MyReservation = ({ reservations, onEdit, onCancel }) => {
  const now = new Date();
  const getStatus = (reservation) => {
    if (reservation.status === "취소") return "취소";
    if (reservation.reservationDateTime < now) return "완료";
    return "예약";
  };
  return (
    <div className="reservation-card">
      <h2>내 예약</h2>
      {reservations && reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>서비스</th>
              <th>날짜</th>
              <th>시간</th>
              <th>상태</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.service}</td>
                <td>
                  {r.reservationdatetime
                    ? new Date(r.reservationdatetime).toISOString().slice(0, 10)
                    : "-"}
                </td>
                <td>
                  {r.reservationdatetime
                    ? new Date(r.reservationdatetime).toTimeString().slice(0, 5)
                    : "-"}
                </td>
                <td className={r.status.toLowerCase()}>{r.status}</td>
                <td>
                  {r.status === "예약" && (
                    <button
                      className="action-btn delete"
                      onClick={() => onCancel(r.id)}
                    >
                      취소
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReservation;
