import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ onTextsReceived }) {
  const [knownLanguage, setKnownLanguage] = useState('');
  const [learningLanguage, setLearningLanguage] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state to handle loading

  // to implement 
  const [pageNumber, setPageNumber] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Check if file, knownLanguage, and learningLanguage are provided
    if (!file || !knownLanguage || !learningLanguage) {
      setError('Please select a file and fill out both languages.');
      return;
    }

    if (isNaN(pageNumber) || pageNumber < 1) {
      setError('Please enter a valid page number.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('known_language', knownLanguage);
    formData.append('learning_language', learningLanguage);
    formData.append('page_number', pageNumber);

    setIsLoading(true); // Show loading indicator

    axios.post('http://127.0.0.1:5000/upload', formData)
      .then(response => {
        onTextsReceived(response.data.original_text, response.data.translated_text);
        setError(null);
      })
      .catch(error => {
        setError(error.response ? error.response.data.error : 'An error occurred');
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false); // Hide loading indicator after request completes
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Known Language (e.g. English)"
        value={knownLanguage}
        onChange={(e) => setKnownLanguage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Learning Language (e.g. Spanish)"
        value={learningLanguage}
        onChange={(e) => setLearningLanguage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Page Number"
        value={pageNumber}
        onChange={(e) => setPageNumber(e.target.value)}  // Handle page number input
      />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Upload and Translate'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FileUpload;