import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SnippetProvider } from './context/SnippetContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import AddSnippet from './pages/AddSnippet';
import EditSnippet from './pages/EditSnippet';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/routing/PrivateRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SnippetProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-snippet"
                element={
                  <PrivateRoute>
                    <AddSnippet />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-snippet/:id"
                element={
                  <PrivateRoute>
                    <EditSnippet />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </Router>
      </SnippetProvider>
    </AuthProvider>
  );
};

export default App;
