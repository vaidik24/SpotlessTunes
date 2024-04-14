import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import spotifyService from "../utils/SpotifyService.js";
import "../styles/SearchSongs.css";
import { Link } from "react-router-dom";
import {
  Box,
  ChakraProvider,
  Grid,
  Spinner,
  Wrap,
  WrapItem,
  Image,
  Text,
} from "@chakra-ui/react";

const SearchSongs = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const access_token = localStorage.getItem("accessToken");
  const service = spotifyService(access_token);

  const handleSearch = async (query) => {
    console.log("Before searching", query);
    setIsLoading(true); // Activate spinner
    try {
      const tracks = await service.searchSongs(query);
      setSearchResults(tracks);
      console.log(tracks);
      console.log(tracks);
    } catch (err) {
      console.log("Error from handleSearchFunction", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <div className="search-results-parent">
        <SearchBar onSearch={handleSearch} />
        <Box p={20} position="relative" minHeight="100vh">
          {isLoading && (
            <Box position="absolute" top="30%" left="50%">
              <Spinner size="xl" />
            </Box>
          )}
          {!isLoading && (
            <Grid
              templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              gap={4}
            >
              {searchResults.map((song) => (
                <Link
                  key={song.id}
                  to={`/get-meaning?name=${encodeURIComponent(
                    song.name
                  )}&artist=${encodeURIComponent(song.artist)}`}
                >
                  <Wrap
                    flexDirection="column"
                    align="center"
                    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                    backdropFilter="blur(4px)"
                    borderRadius="lg"
                    transition="transform 0.2s, box-shadow 0.2s"
                    _hover={{ transform: "translateY(-4px)" }}
                    padding={4}
                    maxW={200}
                    bg="rgba(255, 255, 255, 0.1)"
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.18)"
                    height="100%"
                  >
                    <WrapItem align="center">
                      <Image
                        src={song.img.url}
                        alt={song.name}
                        width={150}
                        height={150}
                        borderRadius="lg"
                      />
                    </WrapItem>
                    <WrapItem maxW={150}>
                      <Text
                        fontSize="sm"
                        align="center"
                        noOfLines={2}
                        color="black"
                      >
                        {song.name} - {song.artist.join(", ")}
                      </Text>
                    </WrapItem>
                  </Wrap>
                </Link>
              ))}
            </Grid>
          )}
        </Box>
      </div>
    </ChakraProvider>
  );
};

export default SearchSongs;
