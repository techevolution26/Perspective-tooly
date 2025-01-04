import React from 'react';

function ViewPage({ perspectives }) {
  return (
    <div className="view-page">
      <h2>Perspectives</h2>
      <ul className="perspective-list">
        {perspectives.map((perspective) => (
          <li key={perspective.id} className="perspective-item">
            <div className="text-content">{perspective.text}</div>
            {perspective.media && (
              <div className="media-content">
                <img src={perspective.media} alt="uploaded content" />
              </div>
            )}
            <div className="timestamp">{perspective.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewPage;
