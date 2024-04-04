import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/dashboard.css";
import { useLocation } from "react-router-dom";
import spotifyService from "../utils/SpotifyService.js";

function Dashboard() {
    const location = useLocation();
    const { accessToken } = location.state || {};
    const [playlists, setPlaylists] = useState([]);
    const [loadingPlaylistIds, setLoadingPlaylistIds] = useState([]);
    const service = spotifyService(accessToken);
    useEffect(() => {
        // Fetch playlists data from an API endpoint
        const fetchPlaylists = async () => {

            service.getUserPlaylists().then((data) => {
                setPlaylists(data);
            });
        };

        fetchPlaylists();
    }, [accessToken]);

    const getDuplicates = async (playlistId) => {
        if (!accessToken || loadingPlaylistIds.includes(playlistId)) return;

        setLoadingPlaylistIds((prevLoadingIds) => [...prevLoadingIds, playlistId]);

        try {

            const data = await service.getPlaylistTracksWithDuplicates(playlistId);

            setPlaylists((prevPlaylists) =>
                prevPlaylists.map((playlist) => {
                    if (playlist.id === playlistId) {
                        const hasDuplicates = data.duplicates && data.duplicates.length > 0;
                        return {
                            ...playlist,
                            tracks: data.duplicates,
                            hasDuplicates: hasDuplicates,
                        };
                    }
                    return playlist;
                })
            );
        } catch (error) {
            console.error("Error fetching duplicates:", error);
        } finally {
            setLoadingPlaylistIds((prevLoadingIds) =>
                prevLoadingIds.filter((id) => id !== playlistId)
            );
        }
    };

    const removeDuplicates = async (playlistId) => {
        let playlist;
        playlists.forEach((p) => {
            if(p.id === playlistId){
                playlist = p;
            }
        })
        try{

            const pos = []
            playlist.tracks.forEach(track => pos.push(track.pos));
            await service.removeDuplicateTracksFromPlaylist(playlist.id, playlist.snapshot_id, pos).then(r => console.log(r));
            // console.log(playlist)
            // console.log(pos)
        }catch(err){
            console.log(`error in removed duplicates function ${err}`);
        }
    };

    return (
        <div className="dashboard-container" id="dashboard-container">
            <h1 className="dashboard-heading" id="dashboard-heading">
                Your Playlists
            </h1>
            <ul className="playlists-list" id="playlists-list">
                {playlists.map((playlist) => (
                    <li className="playlist-item" key={playlist.id} id={`playlist-item-${playlist.id}`}>
                        <div className="playlist-details">
                            <span className="playlist-name" id={`playlist-name-${playlist.id}`}>{playlist.name}</span>
                            <div className="playlist-actions" id={`playlist-actions-${playlist.id}`}>
                                <button
                                    className="playlist-action-button"
                                    onClick={() => {
                                        if (playlist.hasDuplicates) {
                                            removeDuplicates(playlist.id);
                                        } else {
                                            getDuplicates(playlist.id);
                                        }
                                    }}
                                    id={`action-button-${playlist.id}`}
                                    disabled={loadingPlaylistIds.includes(playlist.id)}
                                >
                                    {loadingPlaylistIds.includes(playlist.id)
                                        ? "Loading..."
                                        : playlist.hasDuplicates
                                            ? "Remove Duplicates"
                                            : "Get Duplicates"}
                                </button>
                            </div>
                        </div>
                        <ul className="playlist-tracks">
                            {playlist.tracks &&
                                playlist.tracks.map((track, index) => (
                                    <li key={index} id={`track-${index}-playlist-${playlist.id}`}>
                                        {track.name}
                                    </li>
                                ))}
                        </ul>
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
