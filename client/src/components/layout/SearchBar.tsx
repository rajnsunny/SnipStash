import React, { useState } from 'react';
import { useSnippets } from '../../context/SnippetContext';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchSnippets, clearFilter } = useSnippets();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      searchSnippets({ query: searchTerm.trim() });
    } else {
      clearFilter();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    clearFilter();
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search snippets by title, code, or description..."
          value={searchTerm}
          onChange={handleChange}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="absolute right-0 top-0 mt-2 mr-2 text-blue-500 hover:text-blue-700 opacity-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
