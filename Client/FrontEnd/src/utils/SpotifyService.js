// spotifyService.js

import SpotifyWebApi from "spotify-web-api-node";

const spotifyService = (accessToken) => {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);


    const getUserPlaylists = async () => {
        try {
            const data = await spotifyApi.getUserPlaylists();
            const playlists = []
            data.body.items.forEach((d) => {
                const playlist = {
                    id: d.id,
                    snapshot_id: d.snapshot_id,
                    name: d.name
                }
                playlists.push(playlist);
            })

            console.log(playlists);
            return playlists;
        } catch (error) {
            console.error("Error fetching user playlists:", error);
            return [];
        }
    };

    const getPlaylistTracksWithDuplicates = async (playlistId) => {
        try {
            const tracks = await getPlaylistTracks(playlistId);
            const duplicates = [];
            const set = new Set();
            let pos = 0;

            tracks.forEach((track) => {
                if (track.artist == "" || track.name == "") {
                } else {
                    const key = track.artist + "|" + track.name;
                    if (set.has(key)) {
                        track.pos = pos;
                        duplicates.push(track);
                    } else {
                        set.add(key);
                    }
                }
                pos++
            });
            console.log(duplicates);
            return { duplicates: duplicates, playlistID: playlistId };
        } catch (err) {
            console.log(err);
        }
    };

    const removeDuplicateTracksFromPlaylist = async (playlistId, snapshot_id, pos) => {
        console.log(playlistId)
        console.log(snapshot_id)
        console.log(pos)
        await spotifyApi
            .removeTracksFromPlaylistByPosition(playlistId, pos, snapshot_id)
            .then(
                function (data) {
                    console.log("Tracks removed from playlist!");
                },
                function (err) {
                    console.log("Something went wrong!", err);
                }
            );
    };

    async function getPlaylistTracks(playlistId) {
        // console.log(playlistId);
        try {
            let tracks = [];
            let offset = 0;
            let limit = 100; // Set your desired limit here
            let count = 0;
            while (true) {
                const data = await spotifyApi.getPlaylistTracks(playlistId, {
                    limit,
                    offset,
                });
                for (let track_obj of data.body.items) {
                    const track = track_obj.track;
                    tracks.push({
                        pos: count,
                        name: track.name,
                        artist: track.artists[0].name,
                        id: track.id,
                    });
                    count += 1;
                }
                if (data.body.next) {
                    offset += limit;
                } else {
                    break;
                }
            }

            return tracks;
        } catch (error) {
            console.log("From getPlaylistTrack function: ");
            console.error(error);
            throw error;
        }
    }


    // Add more methods as needed...

    return {
        getUserPlaylists,
        getPlaylistTracksWithDuplicates,
        removeDuplicateTracksFromPlaylist,
        // Add more methods as needed...
    };
};

export default spotifyService;
