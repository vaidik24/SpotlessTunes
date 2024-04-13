const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const lyricsRoute = require('./routes/lyricsRoute');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const spotifyWebApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/auth",
    clientId: "860060f6eb7743a2b87dcead95d611c3",
    clientSecret: "7c78c9585615427aa481ac10ad013dc7",
});

const loginRoute = require("./routes/loginRoute")(spotifyWebApi);
const refreshRoute = require("./routes/refreshRoute")(spotifyWebApi);

app.use(express.json());
app.use(cors());

app.use("/login", loginRoute);
app.use("/refresh", refreshRoute);
app.use("/lyrics", lyricsRoute);

app.listen(3001, function () {
    console.log("Server running on port 3001");
});
