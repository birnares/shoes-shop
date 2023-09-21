import React from "react";

const Search = ({ onChangeSearchInput, value, setValue }) => {
  return (
    <>
      <div className="search-block d-flex">
        <img src="img/Search.svg" alt="Search" />
        <input
          onChange={onChangeSearchInput}
          value={value}
          type="search"
          placeholder="Поиск..."
        />
        {value && (
          <img
            onClick={() => setValue("")}
            className="removeBtn cu-p"
            src="img/Cancel.svg"
            alt="Remove"
          />
        )}
      </div>
    </>
  );
};

export default Search;
