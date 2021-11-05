import React from "react";

const SearchBar = () => {
  return (
    <div className="h-16 w-full align-start pl-4 pr-4 flex items-center border-b-2 border-l-2 border-r-2">
      <input
        type="text"
        className=" w-full rounded-full h-8 pl-4 bg-gray-200"
        placeholder="Search Chitter"
      />
    </div>
  );
};

export default SearchBar;
