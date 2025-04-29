import React from 'react';
import SnippetForm from '../components/snippets/SnippetForm';
import { useSnippets } from '../context/SnippetContext';
import { SnippetFormData } from '../types';

const AddSnippet: React.FC = () => {
  const { createSnippet } = useSnippets();

  const handleSubmit = async (formData: SnippetFormData) => {
    await createSnippet(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SnippetForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddSnippet;
