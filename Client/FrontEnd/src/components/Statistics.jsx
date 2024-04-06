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
    }, [service]); // Fetch data only once when service changes

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
                                <li className="list-item" key={index}>
                                    <span>{index + 1}. </span>
                                    <img src={artist.imageUrl} alt={artist.name} />
                                    <p>{artist.name}</p>
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
                                    <span>{index + 1}. </span>
                                    <img src={track.imageUrl} alt={track.name} />
                                    <p>{track.name}</p>
                                    <p>{track.artist}</p>
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
