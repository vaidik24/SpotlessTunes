import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./dashboard.css";

function Dashboard({ accessToken }) {
  const [playlists, setPlaylists] = useState([]);
  const [duplicates, setDuplicates] = useState({});
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  useEffect(() => {
    if (accessToken) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => {
          setPlaylists(data.body.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accessToken]);

  // Function to handle Remove Duplicates
  const handleRemoveDuplicates = async (playlistId) => {
    try {
      console.log(accessToken);
      let accesstoken = await spotifyApi.getAccessToken();
      spotifyApi.setAccessToken(accesstoken);
      const playlistTracks = await spotifyApi.getPlaylistTracks(playlistId);
      const tracks = playlistTracks.body.items.map((item) => item.track);
      const duplicateTracks = tracks.filter(
        (track, index) =>
          tracks.findIndex(
            (t) => t.id === track.id && t.artists[0].id === track.artists[0].id
          ) !== index
      );
      setDuplicates((prevDuplicates) => ({
        ...prevDuplicates,
        [playlistId]: duplicateTracks,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle Remove Duplicate Tracks=-
  const handleRemoveDuplicateTracks = async (playlistId) => {
    try {
      spotifyApi.setAccessToken(accessToken);
      const duplicateIds = duplicates[playlistId].map((track) => track.id);
      await spotifyApi.removeTracksFromPlaylist(playlistId, duplicateIds);
      setDuplicates((prevDuplicates) => ({
        ...prevDuplicates,
        [playlistId]: [],
      }));
      console.log("Duplicate tracks removed successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle Convert Playlist
  const handleConvertPlaylist = (playlistId) => {
    // Logic to convert playlist with ID playlistId
    console.log("Convert Playlist for Playlist ID:", playlistId);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Your Playlists</h2>
      <ul className="playlists-list">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="playlist-item">
            <span className="playlist-name">{playlist.name}</span>
            <div className="playlist-actions">
              <button
                className="playlist-action-button"
                onClick={() => handleRemoveDuplicates(playlist.id)}
              >
                Get Dups
              </button>
              {duplicates[playlist.id] &&
                duplicates[playlist.id].length > 0 && (
                  <div>
                    <h4>Duplicate Tracks:</h4>
                    <ul>
                      {duplicates[playlist.id].map((track) => (
                        <li key={track.id}>
                          {track.name} - {track.artists[0].name}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="playlist-action-button"
                      onClick={() => handleRemoveDuplicateTracks(playlist.id)}
                    >
                      Remove Duplicates
                    </button>
                  </div>
                )}
              <button
                className="playlist-action-button"
                onClick={() => handleConvertPlaylist(playlist.id)}
              >
                Convert Playlist
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Dashboard.propTypes = {
  accessToken: PropTypes.string,
};

export default Dashboard;
