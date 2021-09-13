import React, { Dispatch } from "react";
import { Input, InputLeftElement, InputGroup, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDebouncedCallback } from "use-debounce";

interface IProps {
  setKeywords: Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setKeywords }: IProps) => {
  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setKeywords(value);
    },
    // delay in ms
    500
  );

  return (
    <Box pb={"16px"}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          placeholder="Search TV Shows..."
          onChange={(e) => debounced(e.target.value)}
          defaultValue={""}
          required
        />
      </InputGroup>
    </Box>
  );
};

export default React.memo(SearchBar);
