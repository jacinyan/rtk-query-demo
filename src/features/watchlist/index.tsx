import Icon from "@chakra-ui/icon";
import { Box, Flex, StackDivider, Text, VStack } from "@chakra-ui/layout";
import { useTVShowWatchList } from "src/hooks/useTVShowWatchList";
import { useUpdateTVShowWatchListMutation } from "src/services/apiSlice";
import { DeleteIcon } from "@chakra-ui/icons";

const WatchList = () => {
  const { results: watchList, sessionId, accountId } = useTVShowWatchList();
  const [updateWatchList] = useUpdateTVShowWatchListMutation();

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
              <Flex justifyContent={"space-between"}>
                <Box as={"h4"}>
                  {show.name}({show.first_air_date})
                </Box>
                <Box
                  onClick={async () => {
                    try {
                      await updateWatchList({
                        accountId,
                        sessionId,
                        itemId: show.id,
                        watchList: false,
                      }).unwrap();
                    } catch (error) {
                      console.dir(error);
                    }
                  }}
                >
                  <Icon as={DeleteIcon} />
                </Box>
              </Flex>
              <Text mt={4}>{show.overview}</Text>
            </Box>
          );
        })}
      </VStack>
    </>
  );
};

export default WatchList;
