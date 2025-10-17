import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import PostList from "./pages/PostList";
import PostWrite from "./pages/PostWrite";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />}></Route>
        <Route path="/post/:id" element={<PostDetail />}></Route>
        <Route path="/write" element={<PostWrite />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
      </Routes>
      <Footer />
    </Router>

    // <div className="App">
    //   <Header />
    //   <Login />
    //   <Register />
    //   <PostList />
    //   <PostDetail />
    //   <Profile />
    //   <PostWrite />
    //   <Footer />
    // </div>
  );
}

export default App;
