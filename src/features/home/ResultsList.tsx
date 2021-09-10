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
import { useMemo, useCallback } from "react";
import { useTable, useSortBy } from "react-table";
import { IGetTVShowsResponse, TColumns } from "./types";
import { AddIcon } from "@chakra-ui/icons";
import { addToList } from "src/features/watchlist/watchListSlice";
import { useAppDispatch } from "src/hooks/rtkq";
import { useAppSelector } from "src/hooks/rtkq";
import { ITVShow } from "./types";
import { selectShowsInList } from "../watchlist/watchListSlice";

type IProps = {
  data: IGetTVShowsResponse | undefined;
  isLoading: boolean;
};

const ResultsList = ({ data, isLoading }: IProps) => {
  const dispatch = useAppDispatch();
  const showsInList: ITVShow[] = useAppSelector(selectShowsInList);

  const toggleAddDelete = useCallback(
    (item) => {
      // console.log("toggleAddDelete", item);

      dispatch(addToList(item));
    },
    [dispatch]
  );

  const columns: TColumns = useMemo(
    () => [
      {
        Header: "Poster Path",
        accessor: "poster_path", // accessor is the "key" in the data
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
          console.log("tableProps", tableProps.row);
          const { name, overview, first_air_date, id } =
            tableProps.row.original;

          return (
            <Box
              onClick={() =>
                toggleAddDelete({
                  name,
                  overview,
                  first_air_date,
                  id,
                })
              }
            >
              <Icon as={AddIcon} />
            </Box>
          );
        },
      },
    ],
    [toggleAddDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: data ? data.results : [],
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
        {isLoading ? (
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
