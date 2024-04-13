const express = require('express');
const {getLyrics} = require('genius-lyrics-api');
const getMeaning = require('../Controller/lyricsController');
const lyricsRouter = express.Router();

lyricsRouter.get('/', async(req, res) => {

    const artist = req.query.artist;
    const song_name = req.query.name;

    const options = {
        apiKey: 'cZKaJ1lsSVkVxC7ue4oHKeqWE-qWXtcjLP_jPTSCqfXoUUiP-OEx9n9ire67sz2a',
        title: `${song_name}`,
        artist: `${artist}`,
        optimizeQuery: true
    };

    try{
        const lyrics = await getLyrics(options);
        if(lyrics === undefined || lyrics === null){
            console.log("lyrics not found!!!");
            res.status(404).json({ error: 'Lyrics not found for the requested song' });
        }else{
            const meaning = await getMeaning({lyrics, artist, song_name});
            console.log(meaning);
            res.status(200).json({lyrics, meaning});
        }
    }catch(err){
        console.log("Error fetching lyrics from genius api", err);
    }


});

module.exports = lyricsRouter;