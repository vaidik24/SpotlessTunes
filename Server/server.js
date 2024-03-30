const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", function (req, res) {
  const code = req.body.code;
  console.log(code);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "2c8defea59394bd281aba771882235ca",
    clientSecret: "03037bea6ab54cb6a627635524bac914",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log("hii from server");
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
});

app.post("/refresh", function (req, res) {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "2c8defea59394bd281aba771882235ca",
    clientSecret: "03037bea6ab54cb6a627635524bac914",
    refreshToken: refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.listen(3001, function () {
  console.log("Server running on port 3001");
});
