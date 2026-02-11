import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InflationSection() {
  const navigate = useNavigate();
  const [selectedVote, setSelectedVote] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isProtectOpen, setIsProtectOpen] = useState(false);

  // 인플레이션 계산기 상태
  const [calcAmount, setCalcAmount] = useState(1000000);
  const [calcRate, setCalcRate] = useState(3);

  // 용어 팝업 상태
  const [activeTerm, setActiveTerm] = useState(null);

  const handleVote = (option) => {
    setSelectedVote(option);
    setShowResult(true);
  };

  // 인플레이션 후 가치 계산
  const calculateFutureValue = () => {
    const futureValue = calcAmount / (1 + calcRate / 100);
    return Math.round(futureValue);
  };

  const valueLoss = calcAmount - calculateFutureValue();

  // 용어 사전 데이터 (해당 페이지로 연결)
  const termLinks = {
    '실물 자산': { id: 18, description: '주식, 부동산처럼 실제로 존재하는 자산이에요' },
    '분산 투자': { id: 20, description: '여러 곳에 나눠서 투자하는 방법이에요 (ETF 참고)' },
    '달러': { id: null, description: '미국 화폐로, 경제 위기 시 가치가 오르는 경향이 있어요' },
  };

  // 용어 클릭 핸들러
  const handleTermClick = (term) => {
    setActiveTerm(activeTerm === term ? null : term);
  };

  // 용어 페이지로 이동
  const goToTermPage = (id) => {
    if (id) {
      navigate(`/learn/${id}`);
    }
    setActiveTerm(null);
  };

  // 용어 하이라이트 렌더링
  const TermHighlight = ({ term, children }) => (
    <span className="relative inline-block">
      <button
        onClick={() => handleTermClick(term)}
        className="text-[#2563EB] underline decoration-dotted underline-offset-2 hover:text-[#1D4ED8] font-medium"
      >
        {children}
      </button>
      {activeTerm === term && termLinks[term] && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-[#3E2C1C] text-white text-[10px] rounded-lg p-3 z-20 shadow-lg">
          <p className="mb-2">{termLinks[term].description}</p>
          {termLinks[term].id && (
            <button
              onClick={() => goToTermPage(termLinks[term].id)}
              className="text-[#FCD34D] underline text-[9px]"
            >
              자세히 보러가기 →
            </button>
          )}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#3E2C1C]"></div>
        </div>
      )}
    </span>
  );

  return (
    <div className="px-6 mt-2 pb-10 space-y-4" onClick={() => setActiveTerm(null)}>
      {/* 핵심 메시지 - 한줄 */}
      <p className="text-sm font-medium text-center text-[#DC2626] italic">
        *물가가 오르면 돈의 가치가 떨어져요!*
      </p>

      {/* 인플레이션 설명 카드 */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 flex items-center gap-2">
          <span className="text-lg">📈</span> 인플레이션이란?
        </h3>

        <div className="space-y-3">
          <div className="bg-[#FFF8F0] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🍜</span>
              <div>
                <p className="text-sm font-bold text-[#3E2C1C] mb-1">예를 들면...</p>
                <p className="text-xs text-[#5C4A3A] leading-relaxed">
                  작년에 3,000원이었던 라면이<br />
                  올해는 3,500원이 됐다면?<br />
                  <span className="font-bold text-[#DC2626]">이게 바로 인플레이션!</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#FEF3C7] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm font-bold text-[#3E2C1C] mb-1">내 돈은 어떻게 되나요?</p>
                <p className="text-xs text-[#5C4A3A] leading-relaxed">
                  100만 원을 그냥 두면<br />
                  1년 뒤에는 <span className="font-bold text-[#DC2626]">97만 원의 가치</span>밖에 안 될 수도 있어요!<br />
                  (물가 상승률 3% 가정)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 인플레이션 계산기 */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 flex items-center gap-2">
          <span className="text-lg">🧮</span> 인플레이션 체험 계산기
        </h3>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
          <p className="text-xs text-center text-[#3E2C1C] mb-3 font-medium">
            오늘의 <span className="text-[#2563EB] font-bold">내 돈</span>은 1년 뒤에 얼마의 가치가 될까요?
          </p>

          <div className="space-y-3">
            {/* 금액 입력 */}
            <div>
              <label className="text-[10px] text-[#8B7E74] mb-1 block">현재 가진 돈</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-xs text-[#8B7E74]">원</span>
              </div>
            </div>

            {/* 물가 상승률 슬라이더 */}
            <div>
              <label className="text-[10px] text-[#8B7E74] mb-1 block">
                예상 물가 상승률: <span className="font-bold text-[#DC2626]">{calcRate}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#DC2626]"
              />
              <div className="flex justify-between text-[9px] text-[#8B7E74]">
                <span>1%</span>
                <span>5%</span>
                <span>10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 계산 결과 */}
        <div className="bg-[#FEF2F2] rounded-xl p-4 text-center">
          <p className="text-xs text-[#5C4A3A] mb-2">1년 뒤 실질 가치</p>
          <p className="text-2xl font-bold text-[#DC2626] relative top-[2px]">
            {calculateFutureValue().toLocaleString('ko-KR')}원
          </p>
          <p className="text-[10px] text-[#EF4444] mt-1">
            😢 {valueLoss.toLocaleString('ko-KR')}원의 가치가 사라져요!
          </p>
        </div>
      </div>

      {/* 10년간 물가 변화 시각화 */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8DDD3]">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 flex items-center gap-2">
          <span className="text-lg">📊</span> 10년간 물가 변화
        </h3>

        <div className="space-y-3">
          {[
            { year: '2015', price: '800원', item: '편의점 삼각김밥' },
            { year: '2020', price: '1,000원', item: '편의점 삼각김밥' },
            { year: '2025', price: '1,300원', item: '편의점 삼각김밥' },
          ].map((data, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-[#8B7E74] w-12">{data.year}</span>
              <div
                className="h-8 bg-gradient-to-r from-[#FECACA] to-[#FCA5A5] rounded-lg flex items-center justify-end pr-3 transition-all duration-500"
                style={{ width: `${60 + index * 20}%` }}
              >
                <span className="text-xs font-bold text-[#7F1D1D]">{data.price}</span>
              </div>
            </div>
          ))}
          <p className="text-[10px] text-[#8B7E74] text-center mt-2">
            * 같은 삼각김밥이 10년 만에 62% 올랐어요!
          </p>
        </div>
      </div>

      {/* 대응 방법 - 아코디언 */}
      <div className="bg-white rounded-2xl border border-[#E8DDD3] overflow-hidden">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsProtectOpen(!isProtectOpen);
          }}
          className="w-full p-5 flex items-center justify-between hover:bg-[#FFF8F0] transition-colors"
        >
          <h3 className="text-sm font-bold text-[#3E2C1C] flex items-center gap-2">
            <span className="text-lg">🛡️</span> 인플레이션에서 내 돈 지키는 법
          </h3>
          <span className={`text-[#8B7E74] transition-transform duration-300 ${isProtectOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${isProtectOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-5 pb-5 space-y-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 bg-[#F0FDF4] rounded-xl p-3">
              <span className="text-lg">📈</span>
              <p className="text-xs text-[#065F46] font-medium">
                물가 상승률보다 높은 수익을 주는 투자하기
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#F0FDF4] rounded-xl p-3">
              <span className="text-lg">🏠</span>
              <p className="text-xs text-[#065F46] font-medium">
                부동산, 주식 같은 <TermHighlight term="실물 자산">실물 자산</TermHighlight>에 관심 갖기
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#F0FDF4] rounded-xl p-3">
              <span className="text-lg">💵</span>
              <p className="text-xs text-[#065F46] font-medium">
                <TermHighlight term="달러">달러</TermHighlight> 등 외화 자산으로 <TermHighlight term="분산 투자">분산 투자</TermHighlight>하기
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#F0FDF4] rounded-xl p-3">
              <span className="text-lg">📚</span>
              <p className="text-xs text-[#065F46] font-medium">
                금융 지식을 쌓아 현명하게 대응하기
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 투표 섹션 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
        <h3 className="text-sm font-bold text-[#3E2C1C] mb-4 text-center">
          인플레이션을 알게 된 지금, 당신의 선택은?
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleVote('sad')}
            disabled={showResult}
            className={`rounded-xl p-4 transition-all duration-300 ${
              selectedVote === 'sad'
                ? 'bg-red-100 border-2 border-red-400 scale-105'
                : 'bg-white border-2 border-[#E8DDD3] hover:border-red-300 hover:bg-red-50'
            } ${showResult && selectedVote !== 'sad' ? 'opacity-50' : ''}`}
          >
            <div className="text-3xl mb-2">😭</div>
            <p className="text-xs font-bold text-[#3E2C1C] leading-tight">
              내 간식값이<br />올랐어요
            </p>
          </button>

          <button
            onClick={() => handleVote('strong')}
            disabled={showResult}
            className={`rounded-xl p-4 transition-all duration-300 ${
              selectedVote === 'strong'
                ? 'bg-green-100 border-2 border-green-400 scale-105'
                : 'bg-white border-2 border-[#E8DDD3] hover:border-green-300 hover:bg-green-50'
            } ${showResult && selectedVote !== 'strong' ? 'opacity-50' : ''}`}
          >
            <div className="text-3xl mb-2">💪</div>
            <p className="text-xs font-bold text-[#3E2C1C] leading-tight">
              투자로 내 돈을<br />지킬래요!
            </p>
          </button>
        </div>

        {showResult && (
          <div className="mt-4 bg-white rounded-xl p-4 text-center">
            {selectedVote === 'sad' ? (
              <p className="text-xs text-[#5C4A3A]">
                맞아요, 물가가 오르면 속상하죠 😢<br />
                하지만 이제 인플레이션을 알았으니<br />
                <span className="font-bold text-[#059669]">현명하게 대비할 수 있어요!</span>
              </p>
            ) : (
              <p className="text-xs text-[#5C4A3A]">
                멋진 선택이에요! 💚<br />
                금융 지식을 쌓으면<br />
                <span className="font-bold text-[#059669]">인플레이션도 두렵지 않아요!</span>
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default InflationSection;
