import axios from 'axios';
import { SnippetFormData } from '../types';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Snippet API calls
export const getSnippets = async () => {
  const response = await api.get('/snippets');
  return response.data;
};

export const getSnippet = async (id: string) => {
  const response = await api.get(`/snippets/${id}`);
  return response.data;
};

export const createSnippet = async (snippetData: SnippetFormData) => {
  const response = await api.post('/snippets', snippetData);
  return response.data;
};

export const updateSnippet = async (id: string, snippetData: SnippetFormData) => {
  const response = await api.put(`/snippets/${id}`, snippetData);
  return response.data;
};

export const deleteSnippet = async (id: string) => {
  const response = await api.delete(`/snippets/${id}`);
  return response.data;
};

export const searchSnippets = async (params: { query?: string; programmingLanguage?: string; tag?: string }) => {
  const response = await api.get('/snippets/search', { params });
  return response.data;
};

export default api; 