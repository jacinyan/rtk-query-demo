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
import { useMemo, useRef, useCallback } from "react";
import { useTable, useSortBy } from "react-table";
import { IGetTVShowsResponse, TColumns } from "./types";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { useUpdateTVShowWatchListMutation } from "src/services/apiSlice";
import { useTVShowWatchList } from "src/hooks/useTVShowWatchList";

type IProps = {
  dataTVShows: IGetTVShowsResponse | undefined;
  isLoading: boolean;
};

const ResultsList = ({
  dataTVShows,
  isLoading: isLoadingGetTVShows,
}: IProps) => {
  const isAddedRef = useRef<number[]>([]);

  const { results, sessionId, accountId } = useTVShowWatchList();

  isAddedRef.current = results.map((item) => item.id);
  console.log(isAddedRef.current);

  const [updateWatchList] = useUpdateTVShowWatchListMutation();

  const toggleIsAdded = useCallback((id: number) => {
    console.log("@");

    const position = isAddedRef?.current?.indexOf(id);

    let newIsAdded = isAddedRef?.current?.slice();
    if (position !== -1) {
      newIsAdded.splice(position, 1);
    } else {
      newIsAdded = [...isAddedRef.current, id];
    }
    isAddedRef.current = newIsAdded;
  }, []);

  const columns: TColumns = useMemo(
    () => [
      {
        Header: "Poster Path",
        accessor: "poster_path",
        Cell: (tableProps: any) => {
          return (
            <Image
              maxW={"120px"}
              src={`https://image.tmdb.org/t/p/w500/${tableProps.row.original.poster_path}`}
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
        Header: "Original Language",
        accessor: "original_language",
      },
      {
        Header: "First Air Date",
        accessor: "first_air_date",
      },
      {
        Header: "Add/Delete",
        accessor: "id",
        Cell: (tableProps: any) => {
          // console.log("tableProps", tableProps.row);
          const { id: itemId } = tableProps.row.original;
          // const original = tableProps.row.original;

          return (
            <Box
              onClick={async () => {
                try {
                  await updateWatchList({
                    accountId,
                    sessionId,
                    itemId,
                  });
                  toggleIsAdded(itemId);
                } catch (error) {
                  console.warn(error);
                }
              }}
            >
              {isAddedRef.current?.includes(itemId) ? (
                <Icon as={DeleteIcon} />
              ) : (
                <Icon as={AddIcon} />
              )}
            </Box>
          );
        },
      },
    ],
    [accountId, sessionId, updateWatchList, isAddedRef, toggleIsAdded]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: dataTVShows ? dataTVShows.results : [],
    });

  return (
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
  );
};

export default ResultsList;
