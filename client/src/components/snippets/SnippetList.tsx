import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnippets } from '../../context/SnippetContext';
import SnippetItem from './SnippetItem';
import SearchBar from '../layout/SearchBar';
import { FaPlus, FaFilter, FaTimes } from 'react-icons/fa';
import { languageOptions } from '../../types';

const SnippetList: React.FC = () => {
  const navigate = useNavigate();
  const { state, deleteSnippet, searchSnippets, clearFilter } = useSnippets();
  const { snippets, filteredSnippets, loading } = state;

  // Filtering states
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Extract all unique tags from snippets
  const allTags = Array.from(new Set(snippets.flatMap((snippet) => snippet.tags))).sort();

  // Apply filters
  const applyFilters = () => {
    const params: { programmingLanguage?: string; tag?: string } = {};
    if (selectedLanguage) params.programmingLanguage = selectedLanguage;
    if (selectedTag) params.tag = selectedTag;
    
    if (Object.keys(params).length > 0) {
      searchSnippets(params);
    } else {
      clearFilter();
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedLanguage('');
    setSelectedTag('');
    clearFilter();
  };

  // Apply filters when selection changes
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [selectedLanguage, selectedTag]);

  // Handle language filter change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  // Handle tag filter change
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value);
  };

  // Get snippets to display (filtered or all)
  const snippetsToDisplay = filteredSnippets || snippets;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <button
          onClick={() => navigate('/add-snippet')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Add New
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <SearchBar />
        
        <div className="mt-2 flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <FaFilter className="mr-1" /> 
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {(selectedLanguage || selectedTag) && (
            <button
              onClick={clearAllFilters}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <FaTimes className="mr-1" /> Clear Filters
            </button>
          )}
        </div>
        
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Language
              </label>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Languages</option>
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Tag
              </label>
              <select
                value={selectedTag}
                onChange={handleTagChange}
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Snippet List */}
      {snippetsToDisplay.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No snippets found</h3>
          <p className="text-gray-500 mb-4">
            {filteredSnippets
              ? "No snippets match your current filters. Try adjusting your search or filters."
              : "You don't have any snippets yet. Add your first one!"}
          </p>
          {filteredSnippets ? (
            <button
              onClick={clearAllFilters}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={() => navigate('/add-snippet')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add Your First Snippet
            </button>
          )}
        </div>
      ) : (
        <div>
          {filteredSnippets && (
            <p className="text-sm text-gray-600 mb-2">
              Showing {snippetsToDisplay.length} {snippetsToDisplay.length === 1 ? 'snippet' : 'snippets'}
              {selectedLanguage && ` in ${languageOptions.find(l => l.value === selectedLanguage)?.label}`}
              {selectedTag && ` tagged with "${selectedTag}"`}
            </p>
          )}
          
          <div className="space-y-4">
            {snippetsToDisplay.map((snippet) => (
              <SnippetItem
                key={snippet._id}
                snippet={snippet}
                onDelete={deleteSnippet}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SnippetList; 