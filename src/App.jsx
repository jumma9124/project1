import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';
import LearnPage from './pages/learn/LearnPage';
import LearnDetailPage from './pages/learn/LearnDetailPage';
import PortfolioPage from './pages/portfolio/PortfolioPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:id" element={<LearnDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
