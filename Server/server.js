const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const lyricsRoute = require("./routes/lyricsRoute");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://vaidik24:Vaidik2405@cluster0.rd6wiou.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  });

const reviewSchema = new mongoose.Schema({
  username: String,
  rating: Number,
  review: String,
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);
console.log("Review schema created");

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

app.post("/reviews", async function (req, res) {
  const { username, rating, review } = req.body;

  try {
    console.log(username, rating, review);
    // Create a new review document
    const newReview = new Review({
      username: username,
      rating: rating,
      review: review,
      date: Date.now(),
    });

    // Save the review document to the database
    await newReview.save();

    console.log("Review saved to database");

    // Send a success response
    res.sendStatus(200);
  } catch (error) {
    // Handle errors
    console.error("Error saving review:", error);
    res.status(500).send("Error saving review");
  }
});

app.listen(3001, function () {
  console.log("Server running on port 3001");
});
