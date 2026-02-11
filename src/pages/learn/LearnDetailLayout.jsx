import React from 'react';
import { useNavigate } from 'react-router-dom';

function LearnDetailLayout({ video, children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCF9F5] flex flex-col max-w-screen-sm mx-auto">
      {/* 헤더 */}
      <header className="mx-4 mt-4 py-4 px-4 rounded-2xl flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-[#8B7E74] text-xs">
          뒤로
        </button>
        <h1 className="text-xl text-[#3E2C1C]">Learn</h1>
        <button onClick={() => navigate('/')} className="text-[#8B7E74] text-xs">
          닫기
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* 영상이 있는 경우: 제목 + 설명 + 동영상 */}
        {video && (
          <>
            <div className="px-6 pt-6 pb-3">
              <h2 className="text-2xl text-[#4A3F35] tracking-tighter">{video.title}</h2>
              <p className="text-sm text-[#4A3F35] opacity-80 mt-1">{video.description}</p>
            </div>

            <div className="px-6 mt-4">
              {video.url === 'placeholder' ? (
                <div className="aspect-video bg-[#E8E0D6] rounded-2xl overflow-hidden flex items-center justify-center">
                  <span className="text-[#8B7E74] text-lg font-semibold tracking-wide">Coming Soon</span>
                </div>
              ) : (
                <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* 각 페이지 고유 콘텐츠 (영상 유무 관계없이 항상 렌더) */}
        {children}
      </div>
    </div>
  );
}

export default LearnDetailLayout;
