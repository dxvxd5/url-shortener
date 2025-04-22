import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/main.css';

// TODO: Add a feature to generate a QR code for the shortened URL
// TODO: Add a list of shortened URLs with options to edit or delete
// TODO: Add a feature to track the number of clicks on each shortened URL
// TODO: Add a feature to customize the shortened URL
// TODO: Add a feature to set an expiration date for the shortened URL
// TODO: Add a feature to share the shortened URL on social media

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
