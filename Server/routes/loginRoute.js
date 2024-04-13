const express = require('express');
const loginRouter = express.Router();

module.exports = function(spotifyWebApi) {
    loginRouter.post("/", function (req, res) {
        const code = req.body.code;
        console.log(code);
        console.log("Inside /login server side");

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

    return loginRouter;
};
