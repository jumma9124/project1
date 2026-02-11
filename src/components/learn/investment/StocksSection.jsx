import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMarketData from '../../../hooks/useMarketData';

// 공통 스타일 (다른 섹션과 통일)
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function StocksSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [investment, setInvestment] = useState(1000000);
  const [shares, setShares] = useState(10);
  const [showKospiExplanation, setShowKospiExplanation] = useState(false);
  const [showKosdaqExplanation, setShowKosdaqExplanation] = useState(false);

  const tabs = ['주식이란?', '수익의 원리', '투자 주의사항'];

  // Yahoo Finance API로 실시간 시장 데이터 가져오기
  const { marketData: fetchedMarketData, loading: marketLoading, error: marketError } = useMarketData();

  // 폴백 데이터 (로딩 중이거나 데이터가 없을 때)
  const defaultMarketData = {
    kospi: {
      name: '코스피',
      value: 2567.89,
      changeRate: 1.23,
      changeValue: 31.2,
    },
    kosdaq: {
      name: '코스닥',
      value: 745.32,
      changeRate: -0.87,
      changeValue: -6.5,
    },
  };

  const marketData = fetchedMarketData || defaultMarketData;

  // 시장 날씨 판정 함수
  const getMarketWeather = (changeRate) => {
    if (changeRate >= 1) {
      return { icon: '☀️', text: '맑음', color: '#059669', bgColor: '#F0FDF4' };
    } else if (changeRate <= -1) {
      return { icon: '☔', text: '비', color: '#EF4444', bgColor: '#FEF2F2' };
    } else {
      return { icon: '☁️', text: '흐림', color: '#8B7E74', bgColor: '#F5F5F5' };
    }
  };

  // 시장 분위기 텍스트 생성
  const getMarketMood = (kospiRate, kosdaqRate) => {
    const avgRate = (kospiRate + kosdaqRate) / 2;

    if (avgRate >= 1.5) {
      return '오늘은 어제보다 시장 분위기가 아주 좋네요!';
    } else if (avgRate >= 0.5) {
      return '오늘은 어제보다 시장 분위기가 좋은 편이에요.';
    } else if (avgRate >= -0.5) {
      return '오늘은 어제와 비슷한 시장 분위기예요.';
    } else if (avgRate >= -1.5) {
      return '오늘은 어제보다 시장 분위기가 조금 안 좋네요.';
    } else {
      return '오늘은 어제보다 시장 분위기가 많이 안 좋아요.';
    }
  };

  const kospiWeather = getMarketWeather(marketData.kospi.changeRate);
  const kosdaqWeather = getMarketWeather(marketData.kosdaq.changeRate);
  const marketMood = getMarketMood(marketData.kospi.changeRate, marketData.kosdaq.changeRate);

  // 주식 가격 계산
  const pricePerShare = Math.round(investment / shares);
  const currentPrice = pricePerShare * 1.15; // 15% 상승 가정
  const profit = Math.round((currentPrice - pricePerShare) * shares);
  const profitRate = 15;
  const dividend = Math.round(investment * 0.03); // 3% 배당 가정

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 주식이란? ── */}
      <div className={commonStyles.card}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📈</span>
          <h2 className="text-xl font-bold text-[#3E2C1C]">주식</h2>
        </div>
        <p className="text-lg font-bold text-[#FF8A00] mb-2">
          회사의 소유권을 나눈 조각
        </p>
        <p className="text-sm text-[#8B7E74] leading-relaxed">
          회사를 작은 조각으로 나눈 것 중 하나를 사는 거예요.
        </p>
      </div>

      {/* ── 오늘의 시장 날씨 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-1">🌤️ 오늘의 시장 날씨</h3>
              <p className="text-xs text-[#8B7E74]">국내 대기업들의 평균 성적표예요</p>
            </div>
            {marketLoading && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border-2 border-[#FF8A00] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-[#8B7E74]">업데이트 중...</span>
              </div>
            )}
            {!marketLoading && fetchedMarketData && (
              <div className="text-xs text-[#059669]">
                ✓ 실시간
              </div>
            )}
          </div>
        </div>

        {/* 코스피/코스닥 지수 */}
        <div className="space-y-3 mb-3">
          {/* 코스피 */}
          <div>
            <div
              onClick={() => {
                setShowKospiExplanation(!showKospiExplanation);
                setShowKosdaqExplanation(false);
              }}
              className="rounded-xl p-4 border-2 cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: kospiWeather.bgColor,
                borderColor: kospiWeather.color
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#3E2C1C]">{marketData.kospi.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg">{kospiWeather.icon}</span>
                  <span className="text-xs font-bold" style={{ color: kospiWeather.color }}>
                    {kospiWeather.text}
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-[#3E2C1C] mb-1">
                {marketData.kospi.value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="text-xs font-bold"
                  style={{ color: marketData.kospi.changeRate >= 0 ? '#EF4444' : '#2563EB' }}
                >
                  {marketData.kospi.changeRate >= 0 ? '▲' : '▼'}
                  {Math.abs(marketData.kospi.changeValue).toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: marketData.kospi.changeRate >= 0 ? '#EF4444' : '#2563EB' }}
                >
                  ({marketData.kospi.changeRate >= 0 ? '+' : ''}{marketData.kospi.changeRate.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* 코스피 설명 (아코디언) */}
            {showKospiExplanation && (
              <div className="mt-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 animate-fadeIn">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">🏟️</span>
                  <h4 className="text-sm font-bold text-[#059669]">코스피(KOSPI)란?</h4>
                </div>
                <p className="text-xs text-[#5C4A3A] leading-relaxed ml-6">
                  우리나라 <span className="font-bold text-[#059669]">대장주들이 모인 운동장</span>이에요.
                  삼성전자 같은 큰 회사들의 성적을 합친 지수입니다.
                </p>
              </div>
            )}
          </div>

          {/* 코스닥 */}
          <div>
            <div
              onClick={() => {
                setShowKosdaqExplanation(!showKosdaqExplanation);
                setShowKospiExplanation(false);
              }}
              className="rounded-xl p-4 border-2 cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: kosdaqWeather.bgColor,
                borderColor: kosdaqWeather.color
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#3E2C1C]">{marketData.kosdaq.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg">{kosdaqWeather.icon}</span>
                  <span className="text-xs font-bold" style={{ color: kosdaqWeather.color }}>
                    {kosdaqWeather.text}
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-[#3E2C1C] mb-1">
                {marketData.kosdaq.value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="text-xs font-bold"
                  style={{ color: marketData.kosdaq.changeRate >= 0 ? '#EF4444' : '#2563EB' }}
                >
                  {marketData.kosdaq.changeRate >= 0 ? '▲' : '▼'}
                  {Math.abs(marketData.kosdaq.changeValue).toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: marketData.kosdaq.changeRate >= 0 ? '#EF4444' : '#2563EB' }}
                >
                  ({marketData.kosdaq.changeRate >= 0 ? '+' : ''}{marketData.kosdaq.changeRate.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* 코스닥 설명 (아코디언) */}
            {showKosdaqExplanation && (
              <div className="mt-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 animate-fadeIn">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">🚀</span>
                  <h4 className="text-sm font-bold text-[#2563EB]">코스닥(KOSDAQ)이란?</h4>
                </div>
                <p className="text-xs text-[#5C4A3A] leading-relaxed ml-6">
                  미래 성장이 기대되는 <span className="font-bold text-[#2563EB]">IT/벤처 기업들이 모인 운동장</span>이에요.
                  변화가 빠르고 활기찬 곳입니다.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 시장 분위기 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-center text-[#3E2C1C] font-medium">
            💬 {marketMood}
          </p>
        </div>

        {/* 안내 문구 */}
        <div className="mt-3 pt-3 border-t border-[#E8DDD3] space-y-2">
          <p className="text-xs text-[#8B7E74] leading-relaxed">
            <span className="font-bold text-[#FF8A00]">날씨 기준:</span> +1% 이상 맑음 ☀️ / -1% 이하 비 ☔ / 그 사이 흐림 ☁️
          </p>
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-2.5 border border-orange-200">
            <p className="text-xs text-center text-[#5C4A3A]">
              💡 <span className="font-bold text-[#FF8A00]">카드를 클릭</span>하면 자세한 설명을 볼 수 있어요!
            </p>
          </div>
        </div>

        {/* 공통 핵심 포인트 - 항상 표시 */}
        {(showKospiExplanation || showKosdaqExplanation) && (
          <div className="mt-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200 animate-fadeIn">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <div>
                <h4 className="text-sm font-bold text-[#FF8A00] mb-1">핵심 포인트!</h4>
                <p className="text-xs text-[#5C4A3A] leading-relaxed">
                  지수가 오른다는 건 우리 주식 시장의 <span className="font-bold text-[#FF8A00]">전체적인 컨디션이 좋아지고 있다</span>는 뜻이에요!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 탭 네비게이션 ── */}
      <div className={`${commonStyles.card} mt-4`}>
        <div className="flex gap-2 mb-4">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm transition-colors ${
                activeTab === idx
                  ? 'bg-[#FF8A00] text-white font-medium'
                  : 'bg-[#FFF8F0] text-[#8B7E74]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 1: 주식이란? */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* 피자 조각 비유 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🍕</span>
                <div>
                  <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                    💡 피자 조각으로 이해하기
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    회사를 피자라고 생각해보세요. 이 피자를 여러 조각으로 나눈 것이 <span className="font-bold text-[#FF8A00]">주식</span>이에요.
                    한 조각을 사면 그 회사의 <span className="font-bold text-[#FF8A00]">주인 중 한 명</span>이 되는 거예요.
                    피자가 맛있어지면(회사가 성장하면) 내 조각의 가치도 올라가요!
                  </p>
                </div>
              </div>
            </div>

            {/* 주식 = 소유권 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🏢 주식 = 회사의 소유권
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">1.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    삼성전자 주식 1주 = 삼성전자의 <span className="font-bold text-[#2563EB]">아주 작은 주인</span>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">2.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    회사가 돈을 많이 벌면 <span className="font-bold text-[#059669]">주가가 올라요</span>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">3.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    회사가 손해를 보면 <span className="font-bold text-[#EF4444]">주가가 내려요</span>
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">4.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    주식을 팔 때 시세 차익으로 <span className="font-bold text-[#FF8A00]">돈을 벌거나 잃어요</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 주식 시장 */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                🏪 주식 시장이란?
              </h3>
              <p className="text-sm text-[#5C4A3A] leading-relaxed">
                주식을 사고파는 곳이에요. 한국에는 <span className="font-bold text-blue-600">코스피(KOSPI)</span>와
                <span className="font-bold text-blue-600"> 코스닥(KOSDAQ)</span> 두 가지 시장이 있어요.
                평일 오전 9시부터 오후 3시 30분까지 열려요.
              </p>
            </div>

            {/* 주식 용어 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📖 꼭 알아야 할 주식 용어
              </h3>
              <div className="space-y-2.5">
                <div className="bg-[#F0FDF4] rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-bold text-[#059669] mb-1">매수 (사기)</p>
                  <p className="text-xs text-[#8B7E74]">
                    주식을 사는 것. "삼성전자 10주를 매수했어요."
                  </p>
                </div>
                <div className="bg-[#FEF2F2] rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">매도 (팔기)</p>
                  <p className="text-xs text-[#8B7E74]">
                    주식을 파는 것. "삼성전자 10주를 매도했어요."
                  </p>
                </div>
                <div className="bg-[#FFF9F0] rounded-lg p-3 border border-orange-200">
                  <p className="text-sm font-bold text-[#FF8A00] mb-1">시가총액</p>
                  <p className="text-xs text-[#8B7E74]">
                    회사 전체의 가치. (주가 × 발행된 주식 수)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: 수익의 원리 */}
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* 두 가지 수익 방법 */}
            <div className="bg-[#FFF8F0] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                💰 주식으로 돈 버는 2가지 방법
              </h3>
              <div className="space-y-3">
                {/* 방법 1: 시세 차익 */}
                <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">📊</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#059669] mb-1">
                        1. 시세 차익 (주가 상승)
                      </p>
                      <p className="text-xs text-[#8B7E74] leading-relaxed">
                        싸게 사서 비싸게 파는 거예요. 이게 주식 수익의 메인이에요!
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#F0FDF4] rounded-lg p-3 mt-2">
                    <p className="text-xs text-[#5C4A3A] mb-2">예시:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8B7E74]">• 10만 원에 매수</span>
                        <span className="font-bold text-[#EF4444]">-100,000원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B7E74]">• 11만 5천 원에 매도</span>
                        <span className="font-bold text-[#059669]">+115,000원</span>
                      </div>
                      <div className="border-t border-green-200 pt-1.5 mt-1.5 flex justify-between">
                        <span className="font-bold text-[#3E2C1C]">수익</span>
                        <span className="font-bold text-[#059669]">+15,000원 (15%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 방법 2: 배당금 */}
                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">🎁</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#2563EB] mb-1">
                        2. 배당금 (보너스)
                      </p>
                      <p className="text-xs text-[#8B7E74] leading-relaxed">
                        주식을 가지고 있으면 회사가 정기적으로 돈을 나눠줘요!
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 mt-2">
                    <p className="text-xs text-[#5C4A3A] mb-2">예시:</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8B7E74]">• 투자 금액</span>
                        <span className="font-bold text-[#3E2C1C]">100만 원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B7E74]">• 배당률 3%</span>
                        <span className="font-bold text-[#2563EB]">연 3만 원</span>
                      </div>
                      <div className="border-t border-blue-200 pt-1.5 mt-1.5">
                        <p className="text-[#8B7E74]">
                          주식 가격이 그대로여도 배당금을 받을 수 있어요!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 수익 계산기 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🧮 수익 시뮬레이션
              </h3>

              {/* 투자 금액 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">투자 금액</span>
                  <span className="text-sm font-bold text-[#FF8A00]">
                    {investment.toLocaleString()}원
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="100000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 매수 주식 수 슬라이더 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#8B7E74]">매수 주식 수</span>
                  <span className="text-sm font-bold text-[#3E2C1C]">
                    {shares}주
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={shares}
                  onChange={(e) => setShares(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 결과 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-[#8B7E74] mb-1">매수가 (1주)</p>
                    <p className="text-sm font-bold text-[#3E2C1C]">
                      {pricePerShare.toLocaleString()}원
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#8B7E74] mb-1">현재가 (+15%)</p>
                    <p className="text-sm font-bold text-[#059669]">
                      {Math.round(currentPrice).toLocaleString()}원
                    </p>
                  </div>
                </div>
                <div className="border-t border-green-200 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-[#8B7E74]">시세 차익</span>
                    <span className="text-lg font-bold text-[#059669]">
                      +{profit.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#8B7E74]">배당금 (연 3%)</span>
                    <span className="text-sm font-bold text-[#2563EB]">
                      +{dividend.toLocaleString()}원
                    </span>
                  </div>
                </div>
                <p className="text-xs text-center text-[#8B7E74] mt-3">
                  * 15% 상승 및 3% 배당 가정
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 탭 3: 투자 주의사항 */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {/* 위험성 경고 */}
            <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-300">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-sm font-bold text-[#3E2C1C]">
                  주식은 원금 손실 가능성이 있어요!
                </h3>
              </div>
              <p className="text-sm text-[#5C4A3A] leading-relaxed">
                예금이나 적금과 달리 주식은 <span className="font-bold text-[#EF4444]">원금이 줄어들 수 있어요</span>.
                투자한 돈을 잃을 각오가 되어 있을 때만 시작하세요.
              </p>
            </div>

            {/* 초보자가 피해야 할 것들 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🚫 초보자가 피해야 할 것들
              </h3>

              <div className="space-y-3">
                <div className="bg-[#FEF2F2] rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    1. 빚내서 주식하기
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → 대출이나 마이너스 통장으로 투자하면 절대 안 돼요!
                  </p>
                </div>

                <div className="bg-[#FEF2F2] rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    2. 한 종목에 몰빵하기
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → 한 회사만 사면 위험해요. 여러 회사에 분산하세요.
                  </p>
                </div>

                <div className="bg-[#FEF2F2] rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    3. 단기 투기 (데이트레이딩)
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → 초보자는 하루에 수십 번 사고팔면 손해 확률이 높아요.
                  </p>
                </div>

                <div className="bg-[#FEF2F2] rounded-lg p-3 border border-red-200">
                  <p className="text-sm font-bold text-[#EF4444] mb-1">
                    4. 카더라 정보 믿기
                  </p>
                  <p className="text-xs text-[#8B7E74]">
                    → "이 주식 오른다더라" 같은 말만 믿고 사면 위험해요.
                  </p>
                </div>
              </div>
            </div>

            {/* 현명한 투자 방법 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-sm font-bold text-[#3E2C1C]">
                  초보자를 위한 현명한 투자법
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold">소액</span>으로 시작하기 (처음엔 10~50만 원 정도)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold">장기 투자</span> 마인드 갖기 (최소 1년 이상)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold">공부</span>하고 투자하기 (회사 재무제표 확인)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold">20번 ETF</span>로 먼저 시작해보기 (분산 투자 효과)
                  </p>
                </div>
              </div>
            </div>

            {/* 최종 조언 */}
            <div className="bg-[#3E2C1C] text-white rounded-xl p-4">
              <h3 className="text-sm font-bold mb-2">📌 핵심 정리</h3>
              <p className="text-xs leading-relaxed opacity-90">
                주식은 <span className="font-bold">회사의 소유권 조각</span>이에요.
                돈을 벌 수도, 잃을 수도 있으니 <span className="font-bold">여유 자금</span>으로만 투자하고,
                <span className="font-bold"> 장기적 관점</span>으로 접근하세요!
              </p>
            </div>

            {/* 다음 페이지 이동 버튼 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-300">
              <div className="flex items-start gap-2 mb-3">
                <span className="text-xl">💡</span>
                <div className="flex-1">
                  <p className="text-sm text-[#3E2C1C] leading-relaxed mb-3">
                    <span className="font-bold text-blue-600">주식이 너무 위험하게 느껴진다면?</span><br/>
                    <span className="text-xs text-[#8B7E74]">더 안정적인 투자 방법인 <span className="font-bold text-blue-600">채권</span>을 확인해 보세요!</span>
                  </p>
                  <button
                    onClick={() => navigate('/learn/19')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>19번 채권 알아보기</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default StocksSection;
