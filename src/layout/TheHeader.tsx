import { Box, Container, Flex } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

const TheHeader = () => {
  return (
    <Box as={"header"}>
      <Box py={[2, 2, 3, 4, 4]} bg="green.400">
        <Container maxW={"1553px"}>
          <Flex align="center" pos="relative">
            {/* logo */}
            <Link as={ReactRouterLink} to={"/"}>
              <Box px={2.5}>My TV Shows</Box>
            </Link>
            {/* nav menu items */}
            <Flex
              display={["none", "none", "none", "flex", "flex"]}
              align="center"
              justifyContent="space-around"
              as="nav"
            >
              <Link as={ReactRouterLink} to={"/"}>
                <Box px={2.5}>Home</Box>
              </Link>
              <Link as={ReactRouterLink} to={"/watchlist"}>
                <Box px={2.5}>Watchlist</Box>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default TheHeader;
