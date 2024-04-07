import spotifyService from "../utils/SpotifyService.js";
import { useState, useEffect } from "react";
import "../styles/statistics.css"

const Statistics = () => {
    const  accessToken  = localStorage.getItem("accessToken");
    const service = spotifyService(accessToken);
    const [statType, setStatType] = useState("artists");
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);


    useEffect(() => {
        // Fetch top artists and top tracks when component mounts
        const fetchTopData = async () => {
            try {
                const artists = await service.getTopArtists();
                const tracks = await service.getTopTracks();
                setTopArtists(artists);
                setTopTracks(tracks);
                setDataLoaded(true);
            } catch (error) {
                console.log('Error fetching top data:', error);
            }
        };
        fetchTopData();
    }, [accessToken]); // Fetch data only once when service changes

    const handleTopArtistsClick = () => {
        setStatType("artists");
    };

    const handleTopTracksClick = () => {
        setStatType("tracks");
    };

    return (
        <div className="parent-container">
            <div className="buttons">
                <button onClick={handleTopArtistsClick}>Top Artists</button>
                <button onClick={handleTopTracksClick}>Top Songs</button>
            </div>

            <div className="container">
                <h1>Your top artists and tracks!</h1>
                {statType === "artists" && (
                    <div>
                        {dataLoaded && (
                            <ul className="list">
                                {topArtists.map((artist, index) => (
                                    <li className="list-item top-artists" key={index}>
                                        <span className="number">{index + 1}.</span>
                                        <div className="list-item-content">
                                            <img src={artist.imageUrl} alt={artist.name} />
                                            <div className="track-artist-names">
                                                <p className="artist-name">{artist.name}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {statType === "tracks" && (
                    <div>
                        {dataLoaded && (
                            <ul className="list">
                                {topTracks.map((track, index) => (
                                    <li className="list-item" key={index}>
                                        <span className="number">{index + 1}.</span>
                                        <div className="list-item-content">
                                            <img src={track.imageUrl} alt={track.name} />
                                            <div className="track-artist-names">
                                                <p className="track-name">{track.name}</p>
                                                <p className="artist-name">{track.artist}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Statistics;