import React from "react";
import { Search, List } from "lucide-react";

const NavSearch = () => {
  return (
    <div className="hidden md:flex flex-1 h-full justify-center px-2 sm:px-4 ">
      <div className="w-3/5 max-w-2xl flex items-center">
        <button className="bg-slate-200 p-4 rounded-l-md">
          <Search color="#00b3ff" />
        </button>

        <input
          className="flex-1 py-4 px-2 bg-slate-200 focus:outline-none"
          type="search"
          placeholder="Search essentials, groceries, and more..."
        />

        <button className="bg-slate-200 p-4 rounded-r-md">
          <List color="#00b3ff" />
        </button>
      </div>
    </div>
  );
};

export default NavSearch;