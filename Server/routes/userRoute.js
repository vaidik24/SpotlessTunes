const express = require("express");

const viewController = require("../Controller/viewController");
const loginController = require("../Controller/loginController");
const userRouter = express.Router();
const {getPlaylistTracks, getDuplicates, removeDuplicates,} = require("../Controller/dataController");
const bugReportController = require("../Controller/BugReportController");

// userRouter.get("/", viewController.getLoginPage);
userRouter.get("/login", loginController.login);
userRouter.get("/callback", loginController.initializeSpotifyAuth);
userRouter.get("/home", viewController.getHomepage);

userRouter.get("/home/getSongs", getDuplicates);
userRouter.post("/home/removeDuplicates", removeDuplicates);
userRouter.post('/bug-report', bugReportController)

module.exports = userRouter;
