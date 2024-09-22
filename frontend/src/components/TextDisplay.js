import React from 'react';

function TextDisplay({ originalText, translatedText }) {
  // Split original and translated texts into lines
  const originalLines = originalText.split('\n');
  const translatedLines = translatedText.split('\n');

  return (
    <div className="texts">
      <div className="text-box">
        <h2>Original and Translated Text</h2>
        {originalLines.map((line, index) => (
          <div key={index}>
            {/* Display original text line */}
            <p>{line}</p>
            {/* Display corresponding translated text line with different styling */}
            <p style={{ color: 'green', fontStyle: 'italic' }}>
              {translatedLines[index] || ''} {/* Ensure we don't crash if there are fewer translated lines */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextDisplay;