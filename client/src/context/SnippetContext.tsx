import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SnippetState, Snippet, SnippetFormData } from '../types';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// Define action types
type SnippetAction =
  | { type: 'GET_SNIPPETS'; payload: Snippet[] }
  | { type: 'GET_SNIPPET'; payload: Snippet }
  | { type: 'ADD_SNIPPET'; payload: Snippet }
  | { type: 'UPDATE_SNIPPET'; payload: Snippet }
  | { type: 'DELETE_SNIPPET'; payload: string }
  | { type: 'FILTER_SNIPPETS'; payload: Snippet[] }
  | { type: 'CLEAR_FILTER' }
  | { type: 'SNIPPET_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_LOADING' };

// Initial state
const initialState: SnippetState = {
  snippets: [],
  currentSnippet: null,
  loading: true,
  error: null,
  filteredSnippets: null,
};

// Create context
const SnippetContext = createContext<{
  state: SnippetState;
  getSnippets: () => Promise<void>;
  getSnippet: (id: string) => Promise<void>;
  createSnippet: (snippetData: SnippetFormData) => Promise<void>;
  updateSnippet: (id: string, snippetData: SnippetFormData) => Promise<void>;
  deleteSnippet: (id: string) => Promise<void>;
  searchSnippets: (params: { query?: string; programmingLanguage?: string; tag?: string }) => Promise<void>;
  clearFilter: () => void;
  clearErrors: () => void;
}>({
  state: initialState,
  getSnippets: async () => {},
  getSnippet: async () => {},
  createSnippet: async () => {},
  updateSnippet: async () => {},
  deleteSnippet: async () => {},
  searchSnippets: async () => {},
  clearFilter: () => {},
  clearErrors: () => {},
});

// Reducer function
const snippetReducer = (state: SnippetState, action: SnippetAction): SnippetState => {
  switch (action.type) {
    case 'GET_SNIPPETS':
      return {
        ...state,
        snippets: action.payload,
        loading: false,
      };
    case 'GET_SNIPPET':
      return {
        ...state,
        currentSnippet: action.payload,
        loading: false,
      };
    case 'ADD_SNIPPET':
      return {
        ...state,
        snippets: [action.payload, ...state.snippets],
        loading: false,
      };
    case 'UPDATE_SNIPPET':
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          snippet._id === action.payload._id ? action.payload : snippet
        ),
        currentSnippet: action.payload,
        loading: false,
      };
    case 'DELETE_SNIPPET':
      return {
        ...state,
        snippets: state.snippets.filter(
          (snippet) => snippet._id !== action.payload
        ),
        loading: false,
      };
    case 'FILTER_SNIPPETS':
      return {
        ...state,
        filteredSnippets: action.payload,
        loading: false,
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filteredSnippets: null,
      };
    case 'SNIPPET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

// Create provider
export const SnippetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(snippetReducer, initialState);
  const { state: authState } = useAuth();

  // Load snippets when authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      getSnippets();
    }
  }, [authState.isAuthenticated]);

  // Get all snippets
  const getSnippets = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const snippets = await api.getSnippets();
      dispatch({ type: 'GET_SNIPPETS', payload: snippets });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load snippets';
      dispatch({ type: 'SNIPPET_ERROR', payload: message });
    }
  };

  // Get a single snippet
  const getSnippet = async (id: string) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const snippet = await api.getSnippet(id);
      dispatch({ type: 'GET_SNIPPET', payload: snippet });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load snippet';
      dispatch({ type: 'SNIPPET_ERROR', payload: message });
    }
  };

  // Create a new snippet
  const createSnippet = async (snippetData: SnippetFormData) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const snippet = await api.createSnippet(snippetData);
      dispatch({ type: 'ADD_SNIPPET', payload: snippet });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create snippet';
      dispatch({ type: 'SNIPPET_ERROR', payload: message });
    }
  };

  // Update a snippet
  const updateSnippet = async (id: string, snippetData: SnippetFormData) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const snippet = await api.updateSnippet(id, snippetData);
      dispatch({ type: 'UPDATE_SNIPPET', payload: snippet });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update snippet';
      dispatch({ type: 'SNIPPET_ERROR', payload: message });
    }
  };

  // Delete a snippet
  const deleteSnippet = async (id: string) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      await api.deleteSnippet(id);
      dispatch({ type: 'DELETE_SNIPPET', payload: id });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete snippet';
      dispatch({ type: 'SNIPPET_ERROR', payload: message });
    }
  };

  // Search snippets
  const searchSnippets = async (params: { query?: string; programmingLanguage?: string; tag?: string }) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const snippets = await api.searchSnippets(params);
      dispatch({ type: 'FILTER_SNIPPETS', payload: snippets });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to search snippets';
      dispatch({ type: 'SNIPPET_ERROR', payload: message });
    }
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <SnippetContext.Provider
      value={{
        state,
        getSnippets,
        getSnippet,
        createSnippet,
        updateSnippet,
        deleteSnippet,
        searchSnippets,
        clearFilter,
        clearErrors,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

// Custom hook for using snippet context
export const useSnippets = () => useContext(SnippetContext);

export default SnippetContext; 