import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import useAuth from "./useAuth";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={code ? <Dashboard accessToken={accessToken} /> : <Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
