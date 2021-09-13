import { Box, Text } from "@chakra-ui/layout";

const NotFound = () => {
  return (
    <>
      <Box as={"h2"} pt={5} pb={4}>
        404: Not Found
      </Box>
      <Text fontSize="xl">
        You just hit a route that doesn&#39;t exist... the sadness.
      </Text>
    </>
  );
};

export default NotFound;
