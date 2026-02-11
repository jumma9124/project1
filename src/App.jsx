import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import LearnPage from './pages/learn/LearnPage';
import LearnDetailPage from './pages/learn/LearnDetailPage';
import PortfolioPage from './pages/portfolio/PortfolioPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:id" element={<LearnDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
