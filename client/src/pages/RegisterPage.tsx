import React from 'react';
import Register from '../components/auth/Register';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">SnipStash</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create an account to start organizing your code snippets
          </p>
        </div>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage; 