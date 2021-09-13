import { useState, useMemo } from "react";
import { useGetTVShowsQuery } from "src/services/apiSlice";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import { Box, Divider } from "@chakra-ui/layout";
import Paginator from "src/components/Paginator";

const Home = () => {
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);
  console.log("page -- home", page);

  const { data: dataTVShows, isLoading: isLoadingGetTVShows } =
    useGetTVShowsQuery({
      keywords,
      page,
    });

  const dataTVShowsResults = useMemo(() => {
    return dataTVShows ? dataTVShows.results : undefined;
  }, [dataTVShows]);

  const dataTVShowsTotalResults = useMemo(() => {
    return dataTVShows ? dataTVShows.total_results : undefined;
  }, [dataTVShows]);

  return (
    <>
      <Box as={"h2"} pt={5} pb={4}>
        {keywords ? "Results" : "Top Rated"}
      </Box>
      <SearchBar setKeywords={setKeywords} />
      <ResultsList
        dataTVShowsResults={dataTVShowsResults}
        isLoading={isLoadingGetTVShows}
      />
      <Divider />
      <Paginator
        keywords={keywords}
        setPage={setPage}
        dataTVShowsTotalResults={dataTVShowsTotalResults}
      />
    </>
  );
};

export default Home;

Home.whyDidYouRender = true;
