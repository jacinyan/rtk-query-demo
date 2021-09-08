import { Dispatch } from "react";
import { ChangeEvent } from "react";
// import { useDebounce } from "src/hooks/useDebounce";

interface ISearchConf {
  keywords: string;
  setKeywords: Dispatch<React.SetStateAction<string>>;
  setPage: Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({ keywords, setKeywords, setPage }: ISearchConf) => {
  const handleKeywordsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setKeywords(evt.target.value);
  };

  return (
    <form>
      <div>
        <div className="control has-icons-left">
          <span className="icon is-small is-left">
            <i className="fas fa-search"></i>
          </span>
          <input
            placeholder="Search TV Shows..."
            onChange={handleKeywordsChange}
            value={keywords}
            required
            autoFocus={keywords ? true : false}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
