import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AuthCodeHandler from "./components/AuthCodeHandler.jsx";
import NavBar from "./components/Navbar.jsx";
function App() {
  // const code = new URLSearchParams(window.location.search).get("code");
  // const accessToken = useAuth(code);

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          {/*<Route*/}
          {/*  path="/"*/}
          {/*  element={access_token !== "" ? <Dashboard accessToken={access_token} /> : <Login />}*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path="/auth"*/}
          {/*    element={ <AuthCodeHandler/> }*/}
          {/*/>*/}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/auth" element={<AuthCodeHandler />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
