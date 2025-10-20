import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigete = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/member/signup", { name, email, password });
      alert("회원가입 성공!");
      navigete("/login");
    } catch (err) {
      alert("회원가입 실패");
    }
  };
  return (
    <div className="container">
      <h2>회원가입</h2>
      <input
        className="input"
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" type="submit" onClick={handleRegister}>
        회원가입
      </button>
    </div>
  );
};
export default Register;
