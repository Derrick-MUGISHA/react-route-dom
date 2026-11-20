import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App2 from './App2';

// BrowserRouter enables routing hooks; App2 supplies shop state and page routes.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App2 />
    </StrictMode>
  </BrowserRouter>,
);
