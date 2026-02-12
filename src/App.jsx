import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/MainPage';

const LearnPage = lazy(() => import('./pages/learn/LearnPage'));
const LearnDetailPage = lazy(() => import('./pages/learn/LearnDetailPage'));
const PortfolioPage = lazy(() => import('./pages/portfolio/PortfolioPage'));

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center text-[#8B7E74]">로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/learn" element={<LearnPage />} />
              <Route path="/learn/:id" element={<LearnDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
