import React from "react";
import CloseIcon from "../public/assets/side-arrow-icon.svg";

const SearchBar = () => {
  return (
    <div className="h-20 w-full align-start pl-4 pr-4 flex items-center border-b-2 border-l-2 border-r-2">
      {/* <CloseIcon className="w-8 ml-2 pb-1 fill-current text-yellow-400 hover:text-yellow-500" /> */}
      <input
        type="text"
        className=" w-full rounded-full h-8 pl-12 bg-gray-200 outline-none"
        placeholder="Search Chitter"
      />
    </div>
  );
};

export default SearchBar;
