const { getUserPlaylists, getPlaylistTracks } = require("./dataController");
// exports.getLoginPage = async (req, res, next) => {
//   res.status(200);
// };

exports.getHomepage = async (req, res, next) => {
  try {
    const userData = await getUserPlaylists();
    console.log("From getHomePage function: ");
    console.log(userData);
    res.json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
