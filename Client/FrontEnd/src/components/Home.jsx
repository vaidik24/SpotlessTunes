import { Link } from "react-router-dom";
import "../styles/home.css"; // Import CSS file
import {
  Box,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Flex,
} from "@chakra-ui/react";
const Home = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null; // or handle unauthorized access
  }

  return (
    <Box py={9}>
      <Flex justify="center" align="center" gap={16} flexWrap="wrap">
        <Card
          maxW={{ base: "100%", sm: "45%", md: "32%" }}
          backgroundColor="rgba(255, 255, 255, 0.2)"
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.6)"
          backdropFilter="blur(6px)"
          borderRadius="10px"
          border="1px solid rgba(255, 255, 255, 0.18)"
        >
          <CardBody>
            <Box>
              <Heading size="md" mb={2}>
                Remove Duplicates
              </Heading>
              <Text mb={4}>
                Click here to remove duplicate tracks from your Spotify
                playlist.
              </Text>
            </Box>
            <Flex justify="flex-end" mt={4}>
              <Link to="/remove-duplicates">
                <Button colorScheme="green" variant="solid">
                  Remove duplicates
                </Button>
              </Link>
            </Flex>
          </CardBody>
        </Card>
        <Card
          maxW={{ base: "100%", sm: "45%", md: "32%" }}
          backgroundColor="rgba(255, 255, 255, 0.2)"
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.6)"
          backdropFilter="blur(6px)"
          borderRadius="10px"
          border="1px solid rgba(255, 255, 255, 0.18)"
        >
          <CardBody>
            <Box>
              <Heading size="md" mb={2}>
                View Statistics
              </Heading>
              <Text mb={4}>
                Click here to view statistics about your Spotify playlist.
              </Text>
            </Box>
            <Flex justify="flex-end" mt={4}>
              <Link to="/stats">
                <Button colorScheme="green">View Statistics</Button>
              </Link>
            </Flex>
          </CardBody>
        </Card>
        <Card
          maxW={{ base: "100%", sm: "45%", md: "32%" }}
          backgroundColor="rgba(255, 255, 255, 0.2)"
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.6)"
          backdropFilter="blur(6px)"
          borderRadius="10px"
          border="1px solid rgba(255, 255, 255, 0.18)"
        >
          <CardBody>
            <Box>
              <Heading size="md" mb={2}>
                Lyrics Meaning
              </Heading>
              <Text mb={4}>
                Explore song lyrics and their meanings effortlessly.
              </Text>
            </Box>
            <Flex justify="flex-end" mt={4}>
              <Link to="/search-songs">
                <Button mt={7} colorScheme="green">
                  Discover
                </Button>
              </Link>
            </Flex>
          </CardBody>
        </Card>
        <Card
          maxW={{ base: "100%", sm: "45%", md: "32%" }}
          backgroundColor="rgba(255, 255, 255, 0.2)"
          boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.6)"
          backdropFilter="blur(6px)"
          borderRadius="10px"
          border="1px solid rgba(255, 255, 255, 0.18)"
        >
          <CardBody>
            <Box>
              <Heading size="md" mb={2}>
                Export Playlists
              </Heading>
              <Text mb={4}>
                Export your spotify playlists to json or csv format and import
                them to create a playlist anytime!
              </Text>
            </Box>
            <Flex justify="flex-end" mt={4}>
              <Link to="/search-songs">
                <Button colorScheme="green">Discover</Button>
              </Link>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default Home;
