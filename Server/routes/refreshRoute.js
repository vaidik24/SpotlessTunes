const express = require('express');
const refreshRouter = express.Router();

module.exports = function(spotifyWebApi) {
    refreshRouter.post("/", function (req, res) {
        const refreshToken = req.body.refreshToken;

        spotifyWebApi.setRefreshToken(refreshToken);

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
                res.status(500).json({ error: 'Could not refresh access token' });
            }
        );
    });

    return refreshRouter;
};
