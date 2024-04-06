import { Link } from "react-router-dom";
import "../styles/home.css"; // Import CSS file

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null; // or handle unauthorized access
  }

  return (
    <div className="home-container">
      <div className="home-cards">
        <div className="home-card">
          <h3>Remove Duplicates</h3>
          <p>
            Click here to remove duplicate tracks from your Spotify playlist.
          </p>
          <Link to="/remove-duplicates">
            <button className="home-button">Remove duplicates</button>
          </Link>
        </div>
        <div className="home-card">
          <h3>View Statistics</h3>
          <p>Click here to view statistics about your Spotify playlist.</p>
          <Link to="/stats">
            <button className="home-button">View Statistics</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
