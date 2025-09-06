import { Search, Filter } from "lucide-react";
import React, { useMemo, useState, useRef } from "react";

interface SearchFilterProps {
  searchValue: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filterOptions: string[];
  placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchValue,
  setSearch,
  filterValue,
  setFilter,
  filterOptions,
  placeholder = "Search...",
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <select
          value={filterValue}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All</option>
          {filterOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
