const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const spotifyWebApi = new SpotifyWebApi({
  redirectUri: "http://localhost:3000/auth",
  clientId: "860060f6eb7743a2b87dcead95d611c3",
  clientSecret: "7c78c9585615427aa481ac10ad013dc7",
});


app.post("/login", function (req, res) {
  const code = req.body.code;
  console.log(code);
  console.log("Inside /login server side")

  spotifyWebApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log("hii from server");
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
      spotifyWebApi.setAccessToken(data.body['access_token']);
      spotifyWebApi.setRefreshToken(data.body['refresh_token']);
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });


});

app.post("/refresh", function (req, res) {
  const refreshToken = req.body.refreshToken;


  spotifyApi.setAccessToken(data.body['access_token']);
  spotifyApi.setRefreshToken(data.body['refresh_token']);

  spotifyWebApi.refreshAccessToken().then(
      function(data) {
        console.log('The access token has been refreshed!');

        // Save the access token so that it's used in future calls
        spotifyWebApi.setAccessToken(data.body['access_token']);
        res.json({
                  accessToken: data.body.access_token,
                  refreshToken: data.body.refresh_token,
                  expiresIn: data.body.expires_in,
                });
      },
      function(err) {
        console.log('Could not refresh access token', err);
      }
  );

  // res.sendStatus(200);

});

app.listen(3001, function () {
  console.log("Server running on port 3001");
});
