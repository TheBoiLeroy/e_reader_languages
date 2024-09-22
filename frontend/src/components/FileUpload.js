import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import the CSS file

function FileUpload({ onTextsReceived }) {
  const [knownLanguage, setKnownLanguage] = useState('');
  const [learningLanguage, setLearningLanguage] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
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

    setIsLoading(true);

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
        setIsLoading(false);
      });
  };

  const languages = ["English", "Spanish", "French", "German", "Italian", "Chinese", "Russian", "Portuguese"];

  return (
    <div className="container">
      <input type="file" onChange={handleFileChange} />

      <label>
        Language of Document:
        <select
          value={knownLanguage}
          onChange={(e) => setKnownLanguage(e.target.value)}
        >
          <option value="" disabled>Select the known language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>

      <p>to</p>

      <label>
        Learning Language:
        <select
          value={learningLanguage}
          onChange={(e) => setLearningLanguage(e.target.value)}
        >
          <option value="" disabled>Select a language to learn</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>

      <input
        type="text"
        placeholder="Page Number"
        value={pageNumber}
        onChange={(e) => setPageNumber(e.target.value)}
      />

      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Upload and Translate'}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default FileUpload;
