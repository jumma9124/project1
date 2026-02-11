import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#FFF8F0] flex flex-col max-w-screen-sm mx-auto overflow-hidden">
      {/* 헤더 */}
      <header className="mx-4 mt-4 py-4 px-4 rounded-2xl flex items-center justify-between">
        <button className="text-[#8B7E74]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-xl text-[#3E2C1C]">아직 타이틀 안정함</h1>

        <div className="w-6 h-6" />
      </header>

      {/* 검색창 + 메뉴 아이콘 영역 */}
      <div className="flex-1 flex flex-col items-center justify-end px-5 pb-10">
        <input
          type="text"
          placeholder="오늘은 무엇을 알아볼까요?"
          className="w-full px-4 py-3 mb-5 rounded-full border border-[#E8DDD3] bg-white text-[#5B4F43] text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD89D] focus:border-transparent placeholder-[#3E2C1C99]"
        />
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* 영상 학습 - 따뜻한 노란색 강조 */}
          <button
            onClick={() => navigate('/learn')}
            className="flex flex-col items-center justify-center py-8 bg-[#FFF3D6] rounded-2xl shadow-sm border border-[#FFE4A8] active:bg-[#FFE9B8] transition-colors"
          >
            <span className="text-base tracking-tight text-[#3E2C1C]">경제용어</span>
          </button>

          {/* Portfolio - 연보라색 파스텔 */}
          <button
            onClick={() => navigate('/portfolio')}
            className="flex flex-col items-center justify-center py-8 bg-[#F3E8FF] rounded-2xl shadow-sm border border-[#E9D5FF] active:bg-[#EDD5FF] transition-colors"
          >
            <span className="text-base tracking-tight text-[#3E2C1C]">포트폴리오</span>
          </button>

          <button
            className="flex flex-col items-center justify-center py-8 bg-[#E8F4FD] rounded-2xl shadow-sm border border-[#C9E4F5] opacity-50"
            disabled
          >
<span className="text-base tracking-tight text-[#3E2C1C]">3</span>
          </button>

          <button
            className="flex flex-col items-center justify-center py-8 bg-[#E8F4FD] rounded-2xl shadow-sm border border-[#C9E4F5] opacity-50"
            disabled
          >
<span className="text-base tracking-tight text-[#3E2C1C]">4</span>
          </button>

          <button
            className="flex flex-col items-center justify-center py-8 bg-[#E8F4FD] rounded-2xl shadow-sm border border-[#C9E4F5] opacity-50"
            disabled
          >
<span className="text-base tracking-tight text-[#3E2C1C]">5</span>
          </button>

          <button
            className="flex flex-col items-center justify-center py-8 bg-[#E8F4FD] rounded-2xl shadow-sm border border-[#C9E4F5] opacity-50"
            disabled
          >
<span className="text-base tracking-tight text-[#3E2C1C]">6</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
