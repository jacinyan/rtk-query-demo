import { Box, Heading, StackDivider, Text, VStack } from "@chakra-ui/layout";
import { useAppSelector } from "src/hooks/rtkq";
import { ITVShow } from "../home/types";
import { selectShowsInList } from "./watchListSlice";

const WatchList = () => {
  const showsInList: ITVShow[] = useAppSelector(selectShowsInList);

  return (
    <>
      <Box as={"h1"}>Watch List</Box>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {showsInList.map((show) => {
          return (
            <Box p={5} shadow="md" borderWidth="1px" key={show.id}>
              <Box as={"h4"}>{show.name}</Box>
              <Text mt={4}>{show.overview}</Text>
            </Box>
          );
        })}
      </VStack>
    </>
  );
};

export default WatchList;
