import { Link } from "react-router-dom";
import "../styles/home.css"; // Import CSS file

const Home = () => {
  return (
      <div className="home-container">
        <div className="home-cards">
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">Remove Duplicates</h2>
              <p className="card-description">
                Click here to remove duplicate tracks from your Spotify playlist.
              </p>
              <div className="card-link">
                <Link to="/remove-duplicates">
                  <button className="home-button">Remove duplicates</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">View Statistics</h2>
              <p className="card-description">
                Click here to view statistics about your Spotify playlist.
              </p>
              <div className="card-link">
                <Link to="/stats">
                  <button className="home-button">View statistics</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">Lyrics Meaning</h2>
              <p className="card-description">
                Explore song lyrics and their meanings effortlessly.
              </p>
              <div className="card-link">
                <Link to="/search-songs">
                  <button className="home-button">Discover</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-card">
            <div className="card-body">
              <h2 className="card-title">Export Playlists</h2>
              <p className="card-description">
                Export your Spotify playlists to JSON or CSV format and import
                them to create a playlist anytime!
              </p>
              <div className="card-link">
                <Link to="/export-playlists">
                  <button className="home-button">Export playlists</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Home;