import { Box, StackDivider, Text, VStack } from "@chakra-ui/layout";
import { useTVShowWatchList } from "src/hooks/useTVShowWatchList";

const WatchList = () => {
  const { results: watchList } = useTVShowWatchList();

  return (
    <>
      <Box as={"h1"}>Watch List</Box>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {watchList.map((show) => {
          return (
            <Box p={5} shadow="md" borderWidth="1px" key={show.id}>
              <Box as={"h4"}>
                {show.name}({show.first_air_date})
              </Box>
              <Text mt={4}>{show.overview}</Text>
            </Box>
          );
        })}
      </VStack>
    </>
  );
};

export default WatchList;
