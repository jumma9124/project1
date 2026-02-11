import React, { useState } from 'react';

// 공통 스타일
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function ETFSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [showBasket, setShowBasket] = useState(false);
  const [showEtfInfo, setShowEtfInfo] = useState(false);
  const [currentEtfIndex, setCurrentEtfIndex] = useState(0);

  const tabs = ['ETF란?', '왜 좋나요?', '인기 ETF 종류'];

  // Top 5 ETF 실시간 데이터 (실제로는 API에서 가져와야 함)
  const top5EtfData = [
    {
      name: 'KODEX 200',
      ticker: '069500',
      price: 38450,
      change: 150,
      changeRate: 0.39,
      description: '코스피 200 종목을 담은 대표 ETF',
      composition: [
        { name: '삼성전자', percent: 25, changeRate: 1.2, color: '#2563EB' },
        { name: 'SK하이닉스', percent: 18, changeRate: -0.5, color: '#059669' },
        { name: 'LG에너지솔루션', percent: 15, changeRate: 2.1, color: '#DC2626' },
        { name: '현대차', percent: 12, changeRate: 0.8, color: '#F59E0B' },
        { name: '삼성바이오로직스', percent: 10, changeRate: -1.3, color: '#8B5CF6' },
        { name: '기타 종목들', percent: 20, changeRate: 0.3, color: '#6B7280' },
      ],
    },
    {
      name: 'TIGER 미국나스닥100',
      ticker: '133690',
      price: 28650,
      change: -120,
      changeRate: -0.42,
      description: '미국 나스닥 100 종목을 담은 ETF',
      composition: [
        { name: 'Apple', percent: 28, changeRate: 0.8, color: '#2563EB' },
        { name: 'Microsoft', percent: 22, changeRate: 1.1, color: '#059669' },
        { name: 'Amazon', percent: 15, changeRate: -0.6, color: '#DC2626' },
        { name: 'NVIDIA', percent: 12, changeRate: 2.5, color: '#F59E0B' },
        { name: 'Tesla', percent: 10, changeRate: -1.2, color: '#8B5CF6' },
        { name: '기타 종목들', percent: 13, changeRate: 0.5, color: '#6B7280' },
      ],
    },
    {
      name: 'KODEX 삼성그룹',
      ticker: '102780',
      price: 12340,
      change: 85,
      changeRate: 0.69,
      description: '삼성 계열사를 담은 ETF',
      composition: [
        { name: '삼성전자', percent: 45, changeRate: 1.2, color: '#2563EB' },
        { name: '삼성물산', percent: 18, changeRate: 0.6, color: '#059669' },
        { name: '삼성생명', percent: 12, changeRate: -0.3, color: '#DC2626' },
        { name: '삼성SDI', percent: 10, changeRate: 1.8, color: '#F59E0B' },
        { name: '삼성전기', percent: 8, changeRate: 0.4, color: '#8B5CF6' },
        { name: '기타 계열사', percent: 7, changeRate: 0.2, color: '#6B7280' },
      ],
    },
    {
      name: 'SPY',
      ticker: 'SPY',
      price: 508.25,
      change: 2.15,
      changeRate: 0.42,
      description: '미국 S&P500 지수를 담은 ETF',
      composition: [
        { name: 'Apple', percent: 7.2, changeRate: 0.8, color: '#2563EB' },
        { name: 'Microsoft', percent: 6.8, changeRate: 1.1, color: '#059669' },
        { name: 'Amazon', percent: 3.5, changeRate: -0.6, color: '#DC2626' },
        { name: 'NVIDIA', percent: 3.2, changeRate: 2.5, color: '#F59E0B' },
        { name: 'Alphabet', percent: 3.1, changeRate: 0.4, color: '#8B5CF6' },
        { name: '기타 495개 종목', percent: 76.2, changeRate: 0.3, color: '#6B7280' },
      ],
    },
    {
      name: 'QQQ',
      ticker: 'QQQ',
      price: 442.80,
      change: -1.35,
      changeRate: -0.30,
      description: '미국 나스닥100 지수를 담은 ETF',
      composition: [
        { name: 'Apple', percent: 9.5, changeRate: 0.8, color: '#2563EB' },
        { name: 'Microsoft', percent: 8.9, changeRate: 1.1, color: '#059669' },
        { name: 'NVIDIA', percent: 7.2, changeRate: 2.5, color: '#DC2626' },
        { name: 'Amazon', percent: 6.8, changeRate: -0.6, color: '#F59E0B' },
        { name: 'Meta', percent: 5.1, changeRate: 1.3, color: '#8B5CF6' },
        { name: '기타 95개 종목', percent: 62.5, changeRate: 0.2, color: '#6B7280' },
      ],
    },
  ];

  const currentEtf = top5EtfData[currentEtfIndex];

  // 슬라이드 이동 함수
  const nextEtf = () => {
    setCurrentEtfIndex((prev) => (prev + 1) % top5EtfData.length);
  };

  const prevEtf = () => {
    setCurrentEtfIndex((prev) => (prev - 1 + top5EtfData.length) % top5EtfData.length);
  };

  const goToEtf = (index) => {
    setCurrentEtfIndex(index);
  };

  return (
    <div className="px-6 mt-6 pb-10">

      {/* ── 탭 네비게이션 ── */}
      <div className={commonStyles.card}>
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

        {/* 탭 1: ETF란? */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* 오늘의 ETF 위젯 - 캐러셀 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#2563EB] flex items-center gap-2">
                  <span>📊</span>
                  <span>오늘의 인기 ETF Top 5</span>
                </h3>
                <div className="text-xs text-[#2563EB]">
                  ✓ 실시간
                </div>
              </div>

              {/* ETF 카드 with 좌우 네비게이션 */}
              <div className="relative">
                {/* 왼쪽 버튼 */}
                <button
                  onClick={prevEtf}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-5 h-5 rounded-full bg-white border-2 border-blue-400 text-[#2563EB] flex items-center justify-center hover:bg-blue-50 transition-colors shadow-md text-[10px]"
                  aria-label="이전 ETF"
                >
                  ◀
                </button>

                {/* ETF 카드 */}
                <div
                  onClick={() => setShowEtfInfo(!showEtfInfo)}
                  className="rounded-xl p-4 border-2 cursor-pointer hover:opacity-90 transition-all bg-white border-blue-400"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#3E2C1C]">{currentEtf.name}</span>
                      <span className="text-[10px] text-[#8B7E74]">{currentEtf.ticker}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">🧺</span>
                      <span className="text-xs font-bold text-[#2563EB]">
                        {currentEtfIndex + 1}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#3E2C1C] mb-1">
                    {currentEtf.price.toLocaleString('ko-KR')}{currentEtf.ticker.includes('SPY') || currentEtf.ticker.includes('QQQ') ? '$' : '원'}
                  </p>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-xs font-bold"
                      style={{ color: currentEtf.changeRate >= 0 ? '#EF4444' : '#2563EB' }}
                    >
                      {currentEtf.changeRate >= 0 ? '▲' : '▼'}
                      {Math.abs(currentEtf.change).toLocaleString('ko-KR')}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: currentEtf.changeRate >= 0 ? '#EF4444' : '#2563EB' }}
                    >
                      ({currentEtf.changeRate >= 0 ? '+' : ''}{currentEtf.changeRate.toFixed(2)}%)
                    </span>
                  </div>
                </div>

                {/* 오른쪽 버튼 */}
                <button
                  onClick={nextEtf}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-5 h-5 rounded-full bg-white border-2 border-blue-400 text-[#2563EB] flex items-center justify-center hover:bg-blue-50 transition-colors shadow-md text-[10px]"
                  aria-label="다음 ETF"
                >
                  ▶
                </button>
              </div>

              {/* 도트 인디케이터 */}
              <div className="flex items-center justify-center gap-2 mt-3">
                {top5EtfData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToEtf(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentEtfIndex
                        ? 'bg-[#2563EB] w-6'
                        : 'bg-[#2563EB]/30 hover:bg-[#2563EB]/50'
                    }`}
                    aria-label={`${index + 1}번째 ETF`}
                  />
                ))}
              </div>

              {/* ETF 설명 (아코디언) */}
              {showEtfInfo && (
                <div className="mt-3 bg-white rounded-xl p-4 border border-blue-200 animate-fadeIn">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">💡</span>
                    <h4 className="text-sm font-bold text-[#2563EB]">{currentEtf.name}이란?</h4>
                  </div>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed ml-6">
                    {currentEtf.description}
                  </p>
                </div>
              )}

              {/* 안내 문구 */}
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-center text-[#8B7E74]">
                  💡 <span className="font-bold text-[#2563EB]">좌우 버튼</span>으로 다른 ETF를 볼 수 있어요!
                </p>
              </div>
            </div>

            {/* 비빔밥 비유 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🍲</span>
                <div>
                  <h3 className="text-sm font-bold text-[#3E2C1C] mb-2">
                    💡 비빔밥으로 이해하기
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    ETF는 <span className="font-bold text-[#FF8A00]">비빔밥</span> 같아요!
                    밥, 나물, 고기, 계란 등 여러 재료가 한 그릇에 담겨 있듯이,
                    여러 종류의 주식을 <span className="font-bold text-[#FF8A00]">한 번에</span> 살 수 있어요.
                    과자 종합 선물 세트처럼 <span className="font-bold text-[#FF8A00]">골고루 담긴 묶음</span>이랍니다!
                  </p>
                </div>
              </div>
            </div>

            {/* ETF 핵심 장점 (아이콘 부각) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <h4 className="text-sm font-bold text-[#2563EB] mb-1">
                    적은 돈으로 분산 투자
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed">
                    1만원대로도 여러 회사에 투자할 수 있어요!
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">👨‍💼</div>
                  <h4 className="text-sm font-bold text-[#8B5CF6] mb-1">
                    전문가가 대신 운용
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed">
                    어떤 주식을 살지 고민 안 해도 돼요!
                  </p>
                </div>
              </div>
            </div>

            {/* ETF의 구조 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]" id="category4-etf-section">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🧺 ETF = 주식 묶음 바구니
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#FF8A00] font-bold">1.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#FF8A00]">ETF는 뭔가요?</span> 여러 주식을 모아 놓은 바구니예요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF8A00] font-bold">2.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#059669]">어떻게 사나요?</span> 주식처럼 증권사 앱에서 실시간으로 사고팔아요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF8A00] font-bold">3.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#2563EB]">얼마부터 살 수 있나요?</span> 1주부터 살 수 있어서 부담이 없어요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#FF8A00] font-bold">4.</span>
                  <p className="text-sm text-[#5C4A3A]">
                    <span className="font-bold text-[#8B7E74]">수수료는?</span> 일반 펀드보다 훨씬 저렴해요
                  </p>
                </div>
              </div>
            </div>

            {/* 바구니 들여다보기 버튼 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-300">
              <div className="text-center mb-3">
                <div className="text-5xl mb-2">🧺</div>
                <p className="text-sm text-[#3E2C1C] font-bold mb-1">
                  ETF 바구니 안에 뭐가 들어있을까요?
                </p>
                <p className="text-xs text-[#8B7E74] mb-3">
                  위에서 선택한 <span className="font-bold text-[#2563EB]">{currentEtf.name}</span>의 구성을 확인해보세요!
                </p>
                <button
                  onClick={() => setShowBasket(!showBasket)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-bold transition-colors"
                >
                  {showBasket ? '🔼 바구니 닫기' : '🔽 바구니 들여다보기'}
                </button>
              </div>

              {/* ETF 구성 비중 (아코디언 - 슬라이드 효과) */}
              {showBasket && (
                <div className="mt-4 space-y-3 overflow-hidden transition-all duration-500 ease-in-out animate-fadeIn">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <h4 className="text-xs font-bold text-[#3E2C1C] mb-3 flex items-center gap-2">
                      <span>📊</span>
                      <span>{currentEtf.name} ETF 구성</span>
                    </h4>
                    <div className="space-y-3">
                      {currentEtf.composition.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[#5C4A3A] font-medium">{item.name}</span>
                              <span
                                className="text-xs font-bold"
                                style={{ color: item.changeRate >= 0 ? '#EF4444' : '#2563EB' }}
                              >
                                {item.changeRate >= 0 ? '▲' : '▼'}
                                {Math.abs(item.changeRate).toFixed(1)}%
                              </span>
                            </div>
                            <span className="text-[#3E2C1C] font-bold">{item.percent}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full transition-all duration-700 ease-out"
                              style={{
                                width: `${item.percent}%`,
                                backgroundColor: item.color,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-center text-[#5C4A3A]">
                      💡 이렇게 여러 회사 주식이 골고루 담겨 있어서<br/>
                      <span className="font-bold text-[#FF8A00]">한 번에 분산 투자</span>할 수 있어요!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 탭 2: 왜 좋나요? */}
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* 장점 1: 분산 투자 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="text-sm font-bold text-[#059669] mb-2">
                    1. 위험 분산이 자동으로!
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    한 회사 주식만 사면 그 회사가 망하면 큰일이에요.
                    하지만 ETF는 여러 회사에 <span className="font-bold text-[#059669]">자동으로 분산 투자</span>되니까 훨씬 안전해요!
                  </p>
                </div>
              </div>
            </div>

            {/* 장점 2: 낮은 수수료 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💰</span>
                <div>
                  <h3 className="text-sm font-bold text-[#2563EB] mb-2">
                    2. 수수료가 엄청 저렴해요!
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    일반 펀드는 수수료가 연 1~2%인데, ETF는 <span className="font-bold text-[#2563EB]">연 0.1~0.5%</span> 정도예요.
                    장기로 투자할수록 수수료 차이가 엄청나요!
                  </p>
                </div>
              </div>
            </div>

            {/* 장점 3: 실시간 거래 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="text-sm font-bold text-[#FF8A00] mb-2">
                    3. 주식처럼 실시간 거래 가능!
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    일반 펀드는 하루에 한 번만 가격이 정해지지만,
                    ETF는 <span className="font-bold text-[#FF8A00]">주식처럼 실시간으로</span> 사고팔 수 있어요!
                  </p>
                </div>
              </div>
            </div>

            {/* 장점 4: 소액 투자 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🪙</span>
                <div>
                  <h3 className="text-sm font-bold text-[#8B5CF6] mb-2">
                    4. 소액으로도 시작 가능!
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed">
                    삼성전자 1주를 사려면 7만원 정도 필요하지만,
                    ETF는 <span className="font-bold text-[#8B5CF6]">1만원대</span>로도 여러 회사에 투자할 수 있어요!
                  </p>
                </div>
              </div>
            </div>

            {/* 핵심 정리 */}
            <div className="bg-[#3E2C1C] text-white rounded-xl p-4">
              <h3 className="text-sm font-bold mb-2">📌 핵심 정리</h3>
              <p className="text-xs leading-relaxed opacity-90">
                ETF는 <span className="font-bold">분산 투자 + 저렴한 수수료 + 실시간 거래</span>의 삼박자를 갖춘 똑똑한 투자 방법이에요!
                투자 초보자에게 특히 추천해요.
              </p>
            </div>
          </div>
        )}

        {/* 탭 3: 인기 ETF 종류 */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {/* 국내 대표 ETF */}
            <div>
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3 flex items-center gap-2">
                <span>🇰🇷</span>
                <span>국내 대표 ETF</span>
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="text-sm font-bold text-[#2563EB] mb-1">
                    📈 KODEX 200, TIGER 200
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed mb-2">
                    코스피 200 종목에 투자해요. 우리나라 대표 기업들에 골고루 투자하는 거예요.
                  </p>
                  <div className="bg-white rounded-lg p-2 text-xs text-[#8B7E74]">
                    💡 <span className="font-bold">이런 분께 추천:</span> 한국 경제 전체에 투자하고 싶은 분
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <h4 className="text-sm font-bold text-[#059669] mb-1">
                    🏭 KODEX 반도체, TIGER 2차전지
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed mb-2">
                    특정 산업에만 집중 투자해요. 반도체, 2차전지 등 성장 산업에 투자할 수 있어요.
                  </p>
                  <div className="bg-white rounded-lg p-2 text-xs text-[#8B7E74]">
                    💡 <span className="font-bold">이런 분께 추천:</span> 특정 산업의 성장을 기대하는 분
                  </div>
                </div>
              </div>
            </div>

            {/* 해외 대표 ETF */}
            <div>
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3 flex items-center gap-2">
                <span>🌎</span>
                <span>해외 대표 ETF</span>
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="text-sm font-bold text-[#8B5CF6] mb-1">
                    🇺🇸 KODEX 미국S&P500, TIGER 미국나스닥100
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed mb-2">
                    미국 대표 기업들(애플, 마이크로소프트 등)에 투자해요. 전 세계 1등 기업들의 성장에 함께할 수 있어요.
                  </p>
                  <div className="bg-white rounded-lg p-2 text-xs text-[#8B7E74]">
                    💡 <span className="font-bold">이런 분께 추천:</span> 미국 시장에 투자하고 싶은 분
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="text-sm font-bold text-[#FF8A00] mb-1">
                    🌏 KODEX 중국본토, TIGER 베트남VN30
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed mb-2">
                    신흥 시장에 투자해요. 성장 가능성은 크지만 변동성도 큰 편이에요.
                  </p>
                  <div className="bg-white rounded-lg p-2 text-xs text-[#8B7E74]">
                    💡 <span className="font-bold">이런 분께 추천:</span> 신흥국의 성장 잠재력에 투자하고 싶은 분
                  </div>
                </div>
              </div>
            </div>

            {/* 주의사항 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-300">
              <h3 className="text-sm font-bold text-[#DC2626] mb-2 flex items-center gap-2">
                <span>⚠️</span>
                <span>ETF 투자 전 꼭 확인하세요!</span>
              </h3>
              <div className="space-y-2 text-xs text-[#5C4A3A]">
                <div className="flex items-start gap-2">
                  <span className="text-[#DC2626] shrink-0">•</span>
                  <p>
                    <span className="font-bold">운용보수 확인:</span> ETF마다 수수료가 달라요. 가능하면 0.5% 이하를 선택하세요.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#DC2626] shrink-0">•</span>
                  <p>
                    <span className="font-bold">거래량 확인:</span> 거래량이 너무 적으면 팔고 싶을 때 못 팔 수도 있어요.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#DC2626] shrink-0">•</span>
                  <p>
                    <span className="font-bold">분산 투자:</span> ETF도 한 개만 사지 말고, 여러 ETF에 나눠서 투자하세요!
                  </p>
                </div>
              </div>
            </div>

            {/* 핵심 정리 */}
            <div className="bg-[#3E2C1C] text-white rounded-xl p-4">
              <h3 className="text-sm font-bold mb-2">📌 핵심 정리</h3>
              <p className="text-xs leading-relaxed opacity-90">
                처음에는 <span className="font-bold">국내 대표 지수 ETF</span>부터 시작하세요.
                익숙해지면 해외 ETF나 산업별 ETF로 조금씩 확장해 나가는 게 좋아요!
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default ETFSection;
