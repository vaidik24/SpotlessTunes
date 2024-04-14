// SearchBar.js
import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [invalidQuery, setInvalidQuery] = useState(false);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setInvalidQuery(false); // Reset invalid query status on input change
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      setInvalidQuery(true);
      return;
    }
    onSearch(query);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <ChakraProvider>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Box marginTop={10}>
          <InputGroup size="md" boxShadow="md" borderRadius={50}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<SearchIcon />}
              borderRadius={50}
            />
            <Input
              type="text"
              placeholder="Search..."
              borderRadius={5}
              width={300}
              value={query}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              _placeholder={{ color: "gray.400" }}
              borderRadius={50}
            />
            <Button
              size="md"
              colorScheme="pink"
              borderRadius={50}
              onClick={handleSearch}
              ml={5}
              _hover={{ bg: "pink.600" }}
            >
              <SearchIcon color={"black"} />
            </Button>
          </InputGroup>
        </Box>
        {invalidQuery && (
          <Alert
            status="error"
            maxW="30%"
            mt={2}
            borderRadius={5}
            boxShadow="md"
          >
            <AlertIcon />
            <AlertDescription>Please enter a valid input</AlertDescription>
          </Alert>
        )}
      </Flex>
    </ChakraProvider>
  );
};

export default SearchBar;
