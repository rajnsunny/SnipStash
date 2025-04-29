// User-related types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

// Snippet-related types
export interface Snippet {
  _id: string;
  title: string;
  code: string;
  programmingLanguage: string;
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SnippetFormData {
  title: string;
  code: string;
  programmingLanguage: string;
  description?: string;
  tags?: string[];
}

export interface SnippetState {
  snippets: Snippet[];
  currentSnippet: Snippet | null;
  loading: boolean;
  error: string | null;
  filteredSnippets: Snippet[] | null;
}

// Language options for select dropdown
export const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'other', label: 'Other' },
]; 