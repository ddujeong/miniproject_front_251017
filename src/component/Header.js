import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1>미니병원/미용실</h1>
        <nav className="nav">
          <Link to="/">홈</Link>
          <Link to="/write">게시글 작성</Link>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
