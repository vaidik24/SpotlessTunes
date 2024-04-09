import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login.jsx";
import RemoveDuplicates from "./components/RemoveDuplicates.jsx";
import AuthCodeHandler from "./components/AuthCodeHandler.jsx";
import NavBar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import { AccessTokenProvider } from "./components/AccessTokenContext.jsx";
import Statistics from "./components/Statistics.jsx";
import AboutPage from "./components/AboutPage.jsx";
import Contact from "./components/Contact.jsx";
function App() {
  // const code = new URLSearchParams(window.location.search).get("code");
  // const accessToken = useAuth(code);

  return (
    <>
      <Router>
        <AccessTokenProvider>
          <NavBar />
          <Routes>
            {/*<Route*/}
            {/*  path="/"*/}
            {/*  element={access_token !== "" ? <RemoveDuplicates accessToken={access_token} /> : <Login />}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    path="/auth"*/}
            {/*    element={ <AuthCodeHandler/> }*/}
            {/*/>*/}
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/remove-duplicates" element={<RemoveDuplicates />} />
            <Route path="/auth" element={<AuthCodeHandler />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AccessTokenProvider>
      </Router>
    </>
  );
}

export default App;
