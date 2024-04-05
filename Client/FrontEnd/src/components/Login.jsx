import "../styles/login.css";
import { Link } from "react-router-dom";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=860060f6eb7743a2b87dcead95d611c3&response_type=code&redirect_uri=http://localhost:3000/auth&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private";

function Login() {
  return (
    <>
      <div className="content-wrapper">
        <div className="container">
          <div className="centered-content">
            <h1>Welcome to SpotlessTunes</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              quidem impedit consequatur ab numquam, accusamus, deserunt, est
              eveniet accusantium molestias quia quis. Possimus aliquam modi
              maxime nostrum nihil qui adipisci.
            </p>
          </div>
        </div>
        <div className="input-field">
          <h4>Spotify Login</h4>
          <Link to={AUTH_URL} className="spotify-login-button">
            Go to Spotify Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
