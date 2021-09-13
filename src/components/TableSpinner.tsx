import { Box, Spinner } from "@chakra-ui/react";

const TableSpinner = () => {
  return (
    <Box
      style={{
        display: "flex",
        height: "80vh",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner size="xl" thickness="4px" color="#00b4e1" />
    </Box>
  );
};

export default TableSpinner;
