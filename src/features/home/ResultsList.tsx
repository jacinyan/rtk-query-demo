import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Icon,
  Box,
} from "@chakra-ui/react";
import { useMemo, useCallback, useEffect, useState } from "react";
import { useTable } from "react-table";
import { ITVShow, TColumns } from "./types";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { useUpdateTVShowWatchListMutation } from "src/services/apiSlice";
import { useTVShowWatchList } from "src/hooks/useTVShowWatchList";

type IProps = {
  dataTVShowsResults: ITVShow[] | undefined;
  isLoading: boolean;
};

const ResultsList = ({
  dataTVShowsResults,
  isLoading: isLoadingGetTVShows,
}: IProps) => {
  const [toWatch, setToWatch] = useState<number[]>([]);

  const { results, sessionId, accountId } = useTVShowWatchList();
  const [updateWatchList] = useUpdateTVShowWatchListMutation();

  const watchListResultsIds = useMemo(() => {
    return results.map((item) => item.id);
  }, [results]);

  const toggleToWatch = useCallback(
    (id: number) => {
      const position = toWatch.indexOf(id);
      let newToWatch = toWatch.slice();

      if (position !== -1) {
        newToWatch.splice(position, 1);
      } else {
        newToWatch = [...toWatch, id];
      }
      setToWatch(newToWatch);
    },
    [toWatch]
  );

  const columns: TColumns = useMemo(
    () => [
      {
        Header: "Poster Path",
        accessor: "poster_path",
        Cell: (tableProps: any) => {
          const { poster_path } = tableProps.row.original;
          return (
            <Image
              maxW={"120px"}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : `https://via.placeholder.com/500x750.png?text=N/A`
              }
              alt={tableProps.row.original.name}
            />
          );
        },
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Language",
        accessor: "original_language",
      },
      {
        Header: "Rating",
        accessor: "vote_average",
        Cell: (tableProps: any) => {
          const { vote_average } = tableProps.row.original;
          return `${vote_average}%`;
        },
      },
      {
        Header: "First Air Date",
        accessor: "first_air_date",
      },
      {
        Header: "Add/Delete",
        accessor: "id",
        Cell: (tableProps: any) => {
          const { id: itemId } = tableProps.row.original;
          return (
            <Box
              onClick={async () => {
                try {
                  await updateWatchList({
                    accountId,
                    sessionId,
                    itemId,
                    watchList: toWatch.includes(itemId) ? false : true,
                  }).unwrap();
                  toggleToWatch(itemId);
                } catch (error) {
                  console.warn(error);
                }
              }}
            >
              {toWatch.includes(itemId) ? (
                <Icon as={DeleteIcon} />
              ) : (
                <Icon as={AddIcon} />
              )}
            </Box>
          );
        },
      },
    ],
    [accountId, sessionId, updateWatchList, toggleToWatch, toWatch]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: dataTVShowsResults ? dataTVShowsResults : [],
    });

  useEffect(() => {
    setToWatch(watchListResultsIds);
  }, [watchListResultsIds]);

  return (
    <Box overflowX="auto">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => {
                return <Th key={idx}>{column.render("Header")}</Th>;
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {isLoadingGetTVShows ? (
            <Tr>
              <Th>Loading....</Th>
            </Tr>
          ) : rows.length === 0 ? (
            <Tr>
              <Th>No Data</Th>
            </Tr>
          ) : (
            rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default React.memo(ResultsList);

// ResultsList.whyDidYouRender = true;
