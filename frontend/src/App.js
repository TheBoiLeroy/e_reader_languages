import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import TextDisplay from './components/TextDisplay';
import './App.css';

function App() {
  const [texts, setTexts] = useState({ original: '', translated: '' });

  const handleTexts = (original, translated) => {
    setTexts({ original, translated });
  };

  return (
    <div className="App">
      <h1>Language Learning E-Reader</h1>
      <FileUpload onTextsReceived={handleTexts} />
      <TextDisplay originalText={texts.original} translatedText={texts.translated} />
    </div>
  );
}

export default App;
