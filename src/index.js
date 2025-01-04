// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import the main App component
import reportWebVitals from './reportWebVitals';  // For performance monitoring

// Get the root element in the HTML where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />  {/* This is your main component */}
  </React.StrictMode>
);

// Performance measuring (optional)
reportWebVitals();
