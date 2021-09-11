import React, { Dispatch, useEffect } from "react";
import { ChangeEvent } from "react";

interface IProps {
  keywords: string;
  setKeywords: Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ keywords, setKeywords }: IProps) => {
  const handleKeywordsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setKeywords(evt.target.value);
  };

  return (
    <form>
      <div>
        <div>
          <span>
            <i></i>
          </span>
          <input
            placeholder="Search TV Shows..."
            onChange={handleKeywordsChange}
            value={keywords}
            required
            // autoFocus={keywords ? true : false}
          />
        </div>
      </div>
    </form>
  );
};

export default React.memo(SearchBar);
