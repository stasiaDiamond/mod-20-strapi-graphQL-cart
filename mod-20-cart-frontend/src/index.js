import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";

// Find the root div in the HTML
const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Initial render: Render the App component to the root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
