import React, { Dispatch, useEffect, useLayoutEffect, useRef } from "react";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

interface IProps {
  keywords: string;
  dataTVShowsTotalResults: number | undefined;
  setPage: Dispatch<React.SetStateAction<number>>;
}

const Paginator = ({
  setPage: setTargetPage,
  dataTVShowsTotalResults,
  keywords,
}: IProps) => {
  const prevKeywordsRef = useRef<string>("");

  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    total: dataTVShowsTotalResults ? dataTVShowsTotalResults : 0,
    initialState: {
      currentPage: 1,
      pageSize: 20,
    },
    limits: {
      inner: 10,
      outer: 10,
    },
  });

  useEffect(() => {
    if (pagesCount < 2) {
      setCurrentPage(1);
    }
    if (prevKeywordsRef.current !== keywords) {
      setCurrentPage(1);
    }

    prevKeywordsRef.current = keywords;
    setTargetPage(currentPage);
  }, [pagesCount, currentPage, setCurrentPage, setTargetPage, keywords]);

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer>
        <PaginationPrevious>Previous</PaginationPrevious>
        <PaginationPageGroup>
          {pages.map((page: number) => (
            <PaginationPage
              key={`pagination_page_${page}`}
              page={page}
              _current={{
                w: 7,
                bg: "green.300",
                fontSize: "sm",
                _hover: {
                  bg: "blue.300",
                },
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext>Next</PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default React.memo(Paginator);
