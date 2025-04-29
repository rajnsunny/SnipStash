import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snippet } from '../../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaEdit, FaTrash, FaCopy, FaEye, FaEyeSlash } from 'react-icons/fa';

interface SnippetItemProps {
  snippet: Snippet;
  onDelete: (id: string) => Promise<void>;
}

const SnippetItem: React.FC<SnippetItemProps> = ({ snippet, onDelete }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Copy to clipboard functionality
  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Handle edit click
  const handleEdit = () => {
    navigate(`/edit-snippet/${snippet._id}`);
  };

  // Handle delete click
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      await onDelete(snippet._id);
    }
  };

  // Get proper language display name
  const getLanguageDisplayName = (langKey: string) => {
    const capitalized = langKey.charAt(0).toUpperCase() + langKey.slice(1);
    return capitalized === 'Javascript' ? 'JavaScript' : capitalized;
  };

  // Truncate code for preview
  const getTruncatedCode = () => {
    const lines = snippet.code.split('\n');
    if (lines.length <= 3) return snippet.code;
    return lines.slice(0, 3).join('\n') + '\n...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {/* Header Section */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{snippet.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="text-gray-600 hover:text-blue-500 transition-colors"
              title="Copy to clipboard"
            >
              <FaCopy />
            </button>
            <button
              onClick={handleEdit}
              className="text-gray-600 hover:text-blue-500 transition-colors"
              title="Edit snippet"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-600 hover:text-red-500 transition-colors"
              title="Delete snippet"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        
        {/* Copy success message */}
        {copySuccess && (
          <div className="text-xs text-green-600 absolute right-4 mt-1">
            Copied!
          </div>
        )}
        
        {/* Description if available */}
        {snippet.description && (
          <p className="text-sm text-gray-600 mt-1 mb-2">{snippet.description}</p>
        )}
        
        {/* Meta info */}
        <div className="flex flex-wrap items-center text-xs text-gray-500 mt-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
            {getLanguageDisplayName(snippet.programmingLanguage)}
          </span>
          <span className="mr-4">Added: {formatDate(snippet.createdAt)}</span>
        </div>
        
        {/* Tags */}
        {snippet.tags.length > 0 && (
          <div className="flex flex-wrap mt-2">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mt-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Code Section */}
      <div className="relative">
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 bg-gray-800 bg-opacity-50 rounded text-white hover:bg-opacity-70 transition-opacity"
            title={expanded ? 'Collapse code' : 'Expand code'}
          >
            {expanded ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
          </button>
        </div>
        
        <SyntaxHighlighter
          language={snippet.programmingLanguage}
          style={vscDarkPlus}
          showLineNumbers
          wrapLongLines
          customStyle={{ 
            margin: 0, 
            maxHeight: expanded ? 'none' : '150px',
            fontSize: '0.9em'
          }}
        >
          {expanded ? snippet.code : getTruncatedCode()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SnippetItem; 