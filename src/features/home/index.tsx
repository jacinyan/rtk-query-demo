import { useState } from "react";
import { useGetTVShowsQuery } from "src/services/apiSlice";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import { Box } from "@chakra-ui/layout";

const Home = () => {
  const [keywords, setKeywords] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading: isLoadingGetTVShows } = useGetTVShowsQuery({
    keywords,
    page,
  });

  return (
    <>
      <Box as={"h1"}>{keywords ? "Results" : "Top Rated"}</Box>
      <SearchBar
        keywords={keywords}
        setKeywords={setKeywords}
        setPage={setPage}
      />
      {<ResultsList data={data} isLoading={isLoadingGetTVShows} />}
    </>
  );
};

export default Home;
