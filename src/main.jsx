// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Route
import './index.css';
import App from './App.jsx';
import MovieOverview from './components/MovieOverview'; // Import the MovieOverview component

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Main application route */}
        <Route path="/movie/:id" element={<MovieOverview />} /> {/* Movie overview route */}
      </Routes>
    </Router>
  </StrictMode>,
);
