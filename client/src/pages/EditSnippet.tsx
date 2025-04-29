import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SnippetForm from '../components/snippets/SnippetForm';
import { useSnippets } from '../context/SnippetContext';
import { SnippetFormData } from '../types';

const EditSnippet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, getSnippet, updateSnippet } = useSnippets();
  const { currentSnippet, loading } = state;

  useEffect(() => {
    if (id) {
      getSnippet(id);
    }
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (formData: SnippetFormData) => {
    if (id) {
      await updateSnippet(id, formData);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentSnippet) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Snippet not found. It may have been deleted or you don't have permission to view it.</p>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SnippetForm snippet={currentSnippet} onSubmit={handleSubmit} isEditing={true} />
    </div>
  );
};

export default EditSnippet; 