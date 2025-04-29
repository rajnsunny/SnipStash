import React from 'react';
import SnippetList from '../components/snippets/SnippetList';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SnippetList />
    </div>
  );
};

export default Dashboard; 