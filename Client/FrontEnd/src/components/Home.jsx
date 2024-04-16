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
  Alert,
  AlertDescription,
  AlertIcon,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal, ModalFooter,
} from "@chakra-ui/react";
import service from "spotify-web-api-node/src/spotify-web-api.js";
import {useEffect, useState} from "react";
const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [bugDescriptionStatus, setBugDescriptionStatus] = useState("new");

  useEffect(() => {

    const fetchUserDetails = async () => {
      try{
        const me = await service.getMe();
        localStorage.setItem("user", me);
      }catch(err){
        console.log(err);
      }
    }

    fetchUserDetails();

  }, [accessToken]);

  if (!accessToken) {
    return null; // or handle unauthorized access
  }

  const handleBugSubmit = async () => {
    const name = localStorage.getItem("user");
    console.log(name);
    if(bugDescription === ""){
      setBugDescriptionStatus("warning");
    }else{
      try{
        const res = await fetch("http://localhost:3001/user/bug-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            description: bugDescription,
            name: name
          })
        })
        if (res.ok) {
          // If successful, you can handle the response data here
          await res.json();
          setBugDescriptionStatus("success");
        }

      }catch(err){
        console.log(err);
      }finally{
        setBugDescription("");
      }
    }
  }

  const bugWarningComponent = () => {
    return (
        <Alert status='warning' maxW={"80%"} maxH={"15"} marginBottom={3} borderRadius={2}>
          <AlertIcon />
          <AlertDescription>Please enter a valid description</AlertDescription>
        </Alert>
    )
  }

  const bugSuccessComponent = () => {
    return (
        <Alert status='success' maxW={"80%"} maxH={"15"} marginBottom={3} borderRadius={2}>
          <AlertIcon />
          <AlertDescription>Bug reported successfully!</AlertDescription>
        </Alert>
    )
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
      <Modal isOpen={isBugReportOpen} onClose={() => setIsBugReportOpen(false)}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Report a Bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Describe the bug you encountered:</Text>
            {bugDescriptionStatus === "warning" && bugWarningComponent()}
            {bugDescriptionStatus === "success" && bugSuccessComponent()}
            <Input
                placeholder="Enter bug description"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleBugSubmit}>
              Submit
            </Button>
            <Button onClick={() => {setIsBugReportOpen(false);setBugDescription(""); setBugDescriptionStatus("new")}}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Bug Report Button */}
      <Button
          position="fixed"
          bottom={4}
          right={4}
          colorScheme="red"
          onClick={() => setIsBugReportOpen(true)}
      >
        Report Bug
      </Button>
    </Box>
  );
};

export default Home;
