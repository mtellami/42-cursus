import { useState } from "react";

type Props = {
    setSearch : React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props : Props) => {
  const submit = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSearch(event.target.value);
  }
  return (
    <div 
      className="flex mt-16 justify-center">
      <div 
          className="relative text-gray-60 focus-within:text-gray-40">
      <span 
          className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" 
                  className="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" 
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" viewBox="0 0 24 24" 
                  className="w-7 h-7 ">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
          </button>
      </span>
          <input  type="search" name="q"
            className="py-2 ml-1 text-xl text-white-6 bg-gray-90 rounded-full pl-10 focus:outline-none focus:bg-white w-96 h-16 "
            placeholder="Search..." onInput={submit}/>
              </div>
    </div>
  );
}

export default SearchBar;
