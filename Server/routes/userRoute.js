const express = require("express");
const viewController = require("../Controller/viewController");
const loginController = require("../Controller/loginController");
const userRouter = express.Router();
const {getPlaylistTracks, getDuplicates, removeDuplicates} = require("../Controller/dataController");
const bugReportController = require("../Controller/BugReportController");
const createUser = require('../Controller/UserController');
const {getReviews, addReview, editReview} = require('../Controller/ReviewController')

// userRouter.get("/", viewController.getLoginPage);
userRouter.get("/login", loginController.login);
userRouter.get("/callback", loginController.initializeSpotifyAuth);
userRouter.get("/home", viewController.getHomepage);

userRouter.get("/home/getSongs", getDuplicates);
userRouter.post("/home/removeDuplicates", removeDuplicates);
userRouter.post('/bug-report', bugReportController);
userRouter.post('/get-reviews', getReviews);
userRouter.post('/create-user', createUser);
userRouter.post('/add-review', addReview);
userRouter.post('/edit-review', editReview);

module.exports = userRouter;
