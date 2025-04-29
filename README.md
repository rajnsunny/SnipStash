# SnipStash – Smart Code Snippet Organizer

SnipStash is a full-stack web application that helps developers save, organize, and search their code snippets with automatic categorization features.

## Features

- Save reusable code snippets in various programming languages
- Auto-categorize snippets based on content (loops, API calls, error handlers, etc.)
- Manual tagging and grouping capabilities
- Full-text search and filtering by language or tag
- Syntax highlighting for code display
- One-click copy to clipboard
- Secure user authentication

## Tech Stack

- **Frontend**: React with TypeScript, React Router, Context API, TailwindCSS, React Syntax Highlighter
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

The project is organized into two main directories:

- `client/` - React frontend application
- `server/` - Node.js backend API

## Getting Started

1. Clone the repository
```
git clone https://github.com/yourusername/snipstash.git
cd snipstash
```

2. Install server dependencies
```
cd server
npm install
```

3. Install client dependencies
```
cd ../client
npm install
```

4. Set up environment variables
   - Create a `.env` file in the server directory based on the `.env.example` file

### Running the Application

1. Start the MongoDB server (if using local MongoDB)

2. Start the backend server
```
cd server
npm run dev
```

3. Start the frontend development server
```
cd client
npm start
```

4. Access the application at `http://localhost:3000`

## Auto-Categorization

SnipStash automatically analyzes your code snippets and applies relevant tags based on patterns found in the code:

- **Loops**: for, while, forEach
- **API/Network**: fetch, axios, http requests
- **Error Handling**: try/catch blocks
- **Functions**: function declarations
- **Arrays**: array operations, map/filter/reduce
- **Debugging**: console.log, print statements

Language-specific patterns are also detected, such as React hooks, async/await, promises, and more.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 