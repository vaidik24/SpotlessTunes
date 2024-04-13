// SearchBar.js
import { useState } from 'react';
import '../styles/SearchBar.css';
import {Alert, AlertDescription, AlertIcon, Box, Button, ChakraProvider, Flex,Input, InputGroup,InputLeftElement, InputRightAddon} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const[invalidQuery, setInvalidQuery] = useState(false);

    const handleInputChange = event => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        if (query.trim() === '') {
            setInvalidQuery(true);
            setQuery('');
            return;
        }
        setInvalidQuery(false);
        onSearch(query);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <ChakraProvider>
            <Flex justifyContent="center" alignItems="center" flexDirection={"column"} >
                <Box marginLeft={"auto"} marginRight={"auto"} marginTop={10}>
                <InputGroup borderRadius={5} size="sm">
                    <InputLeftElement pointerEvents="none" children={<Search2Icon color="pink" />} />
                    <Input type="text" placeholder="Search..." border="1px solid #949494" size="s" width={300} onChange={handleInputChange} onKeyPress={handleKeyPress}/>
                    <InputRightAddon p={0} border="none">
                        <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494" onClick={handleSearch}>
                            Search
                        </Button>
                    </InputRightAddon>
                </InputGroup>
                </Box>
                {invalidQuery &&
                    <Alert status='error' maxW={"30%"} marginTop={2}>
                        <AlertIcon />
                        <AlertDescription>Please enter a valid input</AlertDescription>
                    </Alert>
                }

            </Flex>
        </ChakraProvider>
    );
}
export default SearchBar;
