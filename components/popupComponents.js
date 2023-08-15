import React from 'react';

function PopupContent({ keyword }) {
  return (
    <div>
      <h1>Search Results</h1>
      <p>You searched for: {keyword}</p>
    </div>
  );
}

export default PopupContent;