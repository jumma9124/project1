import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 공통 스타일
const commonStyles = {
  card: "bg-white rounded-[2.5rem] p-6 shadow-sm border border-[#FFEDD5]/30",
};

function DividendsSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStock, setSelectedStock] = useState('samsung');
  const [shareCount, setShareCount] = useState(10);
  const [showCalculator, setShowCalculator] = useState(false);

  const tabs = ['배당이란?', '배당금 언제받죠?', '배당주 고르는 법'];

  // 대표 배당주 데이터 (실제로는 API에서 가져와야 함)
  const dividendStocks = {
    samsung: {
      name: '삼성전자',
      ticker: '005930',
      price: 70000,
      dividendPerShare: 1444, // 연간 배당금 (원)
      dividendYield: 2.06, // 배당수익률 (%)
      icon: '📱',
    },
    apple: {
      name: 'Apple',
      ticker: 'AAPL',
      price: 180.25,
      dividendPerShare: 0.96, // 연간 배당금 (달러)
      dividendYield: 0.53,
      icon: '🍎',
    },
    microsoft: {
      name: 'Microsoft',
      ticker: 'MSFT',
      price: 415.50,
      dividendPerShare: 3.00,
      dividendYield: 0.72,
      icon: '💻',
    },
    coca: {
      name: 'Coca-Cola',
      ticker: 'KO',
      price: 58.75,
      dividendPerShare: 1.94,
      dividendYield: 3.30,
      icon: '🥤',
    },
  };

  const currentStock = dividendStocks[selectedStock];
  const annualDividend = currentStock.dividendPerShare * shareCount;
  const quarterlyDividend = annualDividend / 4;

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

        {/* 탭 1: 배당이란? */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* 배당금 나무 비유 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300">
              <div className="text-center mb-3">
                <div className="text-6xl mb-2">🌳</div>
                <h3 className="text-sm font-bold text-[#059669] mb-2">
                  💡 배당금 = 돈이 열리는 나무!
                </h3>
                <p className="text-sm text-[#5C4A3A] leading-relaxed">
                  주식을 사면 회사의 <span className="font-bold text-[#059669]">주인(주주)</span>이 돼요.
                  회사가 돈을 벌면 그 이익 중 일부를 나눠주는 게 <span className="font-bold text-[#FF8A00]">배당금</span>이에요.
                  마치 나무를 심어서 <span className="font-bold text-[#059669]">매년 열매를 받는 것</span>처럼요!
                </p>
              </div>
            </div>

            {/* 배당금이란? */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                💰 배당금의 핵심 3가지
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <h4 className="text-sm font-bold text-[#2563EB] mb-1">
                        회사가 주는 보너스예요
                      </h4>
                      <p className="text-xs text-[#5C4A3A] leading-relaxed">
                        회사가 1년 동안 벌어들인 이익 중 일부를 주주들에게 나눠줘요.
                        주식을 갖고 있기만 하면 자동으로 받을 수 있어요!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <h4 className="text-sm font-bold text-[#8B5CF6] mb-1">
                        정기적으로 받아요
                      </h4>
                      <p className="text-xs text-[#5C4A3A] leading-relaxed">
                        대부분 회사는 1년에 1~4번 배당금을 줘요.
                        주가가 오르지 않아도 <span className="font-bold text-[#8B5CF6]">꼬박꼬박 수익</span>이 생기는 거죠!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-3 border border-orange-200">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <h4 className="text-sm font-bold text-[#FF8A00] mb-1">
                        복리 효과를 만들 수 있어요
                      </h4>
                      <p className="text-xs text-[#5C4A3A] leading-relaxed">
                        받은 배당금으로 주식을 더 사면,
                        다음엔 더 많은 배당금을 받게 돼요. <span className="font-bold text-[#FF8A00]">눈덩이처럼</span> 불어나요!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 배당 수익률 설명 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="text-sm font-bold text-[#2563EB] mb-2">
                    배당수익률이란?
                  </h3>
                  <p className="text-sm text-[#5C4A3A] leading-relaxed mb-2">
                    주가 대비 1년에 얼마나 배당을 받는지 비율로 나타낸 거예요.
                  </p>
                  <div className="bg-white rounded-lg p-3 text-xs text-[#5C4A3A]">
                    <p className="font-bold text-[#2563EB] mb-1">
                      배당수익률 = (연간 배당금 ÷ 주가) × 100
                    </p>
                    <p className="text-[10px] text-[#8B7E74]">
                      예: 주가 7만원, 연간 배당 1,444원 → 2.06%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: 배당금 언제받죠? */}
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* 배당 지급 주기 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🔄 배당 지급 주기
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                  <span className="text-2xl">🇰🇷</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#2563EB] mb-1">
                      한국 기업 (대부분)
                    </h4>
                    <p className="text-xs text-[#5C4A3A] leading-relaxed">
                      <span className="font-bold text-[#2563EB]">1년에 1번</span>, 주로 3~4월경에 줘요.
                      삼성전자, 현대차 등 대부분의 한국 기업이 연 1회 배당해요.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#059669] mb-1">
                      미국 기업 (대부분)
                    </h4>
                    <p className="text-xs text-[#5C4A3A] leading-relaxed">
                      <span className="font-bold text-[#059669]">1년에 4번</span>, 3개월마다 줘요.
                      애플, 코카콜라 등 대부분의 미국 기업이 분기 배당해요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 배당 일정 프로세스 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                📌 배당 받는 과정 (한국 기준)
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#2563EB]">12월 31일 (배당기준일)</p>
                    <p className="text-xs text-[#8B7E74]">
                      이날 주식을 갖고 있어야 배당을 받을 권리가 생겨요
                    </p>
                  </div>
                </div>

                <div className="h-6 ml-3 border-l-2 border-dashed border-[#E8DDD3]"></div>

                <div className="flex items-start gap-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#8B5CF6]">3월 (주주총회)</p>
                    <p className="text-xs text-[#8B7E74]">
                      회사가 얼마를 배당할지 최종 결정해요
                    </p>
                  </div>
                </div>

                <div className="h-6 ml-3 border-l-2 border-dashed border-[#E8DDD3]"></div>

                <div className="flex items-start gap-2">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#FF8A00]">4월 (배당금 지급)</p>
                    <p className="text-xs text-[#8B7E74]">
                      계좌에 배당금이 입금돼요! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 중요 팁 */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-300">
              <div className="flex items-start gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="text-sm font-bold text-[#FF8A00] mb-2">
                    배당 받으려면 언제까지 사야 하나요?
                  </h3>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed mb-2">
                    한국 주식은 <span className="font-bold text-[#FF8A00]">12월 29일(배당락일 이전)</span>까지 사야
                    12월 31일 명부에 이름이 올라가요!
                  </p>
                  <div className="bg-white rounded-lg p-2 text-xs text-[#8B7E74]">
                    ⚠️ 배당락일(12월 30일)부터는 사도 배당을 못 받아요
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 3: 배당주 고르는 법 */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {/* 선택 기준 3가지 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                ✅ 배당주 체크리스트
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                  <h4 className="text-sm font-bold text-[#2563EB] mb-1">
                    1. 배당수익률 확인하기
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed">
                    일반적으로 <span className="font-bold text-[#2563EB]">2~5%</span>면 괜찮아요.
                    너무 높으면(10% 이상) 회사 사정이 안 좋을 수도 있어요.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
                  <h4 className="text-sm font-bold text-[#8B5CF6] mb-1">
                    2. 배당 지급 이력 보기
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed">
                    <span className="font-bold text-[#8B5CF6]">10년 이상 꾸준히</span> 배당을 준 회사가 안전해요.
                    중간에 끊기지 않고 계속 주는지 확인하세요!
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-3 border border-orange-200">
                  <h4 className="text-sm font-bold text-[#FF8A00] mb-1">
                    3. 회사의 재무 상태 체크
                  </h4>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed">
                    회사가 <span className="font-bold text-[#FF8A00]">매년 이익</span>을 내고 있고,
                    부채가 너무 많지 않은지 확인하세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 배당금 계산기 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-300">
              <div className="text-center mb-3">
                <div className="text-5xl mb-2">🧮</div>
                <p className="text-sm text-[#3E2C1C] font-bold mb-1">
                  나의 예상 배당금 계산기
                </p>
                <p className="text-xs text-[#8B7E74] mb-3">
                  주식을 보유하면 얼마나 받을 수 있을까요?
                </p>
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-4 text-sm font-bold transition-colors"
                >
                  {showCalculator ? '🔼 계산기 닫기' : '🔽 계산해보기'}
                </button>
              </div>

              {/* 계산기 (아코디언) */}
              {showCalculator && (
                <div className="mt-4 space-y-3 overflow-hidden transition-all duration-500 ease-in-out animate-fadeIn">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    {/* 종목 선택 */}
                    <div className="mb-4">
                      <label className="text-xs font-bold text-[#3E2C1C] mb-2 block">
                        1. 배당주 선택하기
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(dividendStocks).map(([key, stock]) => (
                          <button
                            key={key}
                            onClick={() => setSelectedStock(key)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedStock === key
                                ? 'bg-blue-100 border-blue-500'
                                : 'bg-white border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">{stock.icon}</div>
                            <div className="text-xs font-bold text-[#3E2C1C]">
                              {stock.name}
                            </div>
                            <div className="text-[10px] text-[#8B7E74]">
                              {stock.dividendYield}%
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 주식 수량 입력 */}
                    <div className="mb-4">
                      <label className="text-xs font-bold text-[#3E2C1C] mb-2 block">
                        2. 보유 주식 수 입력
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={shareCount}
                        onChange={(e) => setShareCount(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg text-lg font-bold text-center focus:outline-none focus:border-blue-500"
                      />
                      <p className="text-xs text-[#8B7E74] mt-1 text-center">
                        주식 {shareCount}주 = {(currentStock.price * shareCount).toLocaleString('ko-KR')}
                        {selectedStock === 'samsung' ? '원' : '달러'}
                      </p>
                    </div>

                    {/* 예상 배당금 결과 */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-300">
                      <p className="text-xs text-[#5C4A3A] text-center mb-2">
                        🎁 예상 배당금 (1년)
                      </p>
                      <p className="text-3xl font-bold text-[#059669] text-center mb-2">
                        {annualDividend.toLocaleString('ko-KR', {
                          minimumFractionDigits: selectedStock === 'samsung' ? 0 : 2,
                          maximumFractionDigits: selectedStock === 'samsung' ? 0 : 2,
                        })}
                        {selectedStock === 'samsung' ? '원' : '$'}
                      </p>
                      <div className="bg-white rounded-lg p-2 text-xs text-[#5C4A3A]">
                        {selectedStock !== 'samsung' && (
                          <p className="text-center mb-1">
                            💰 분기당: {quarterlyDividend.toFixed(2)}$
                          </p>
                        )}
                        <p className="text-center text-[10px] text-[#8B7E74]">
                          배당수익률: {currentStock.dividendYield}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                    <p className="text-xs text-center text-[#5C4A3A]">
                      💡 배당금을 다시 투자하면 <span className="font-bold text-[#FF8A00]">복리 효과</span>로<br/>
                      자산이 더 빠르게 불어날 수 있어요!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 대표 배당주 소개 */}
            <div className="bg-white rounded-xl p-4 border border-[#E8DDD3]">
              <h3 className="text-sm font-bold text-[#3E2C1C] mb-3">
                🌟 초보자에게 추천하는 배당주
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                  <span className="text-xl">🇰🇷</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#2563EB]">한국: 삼성전자, SK텔레콤</p>
                    <p className="text-xs text-[#5C4A3A]">
                      안정적이고 꾸준한 배당으로 유명해요
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                  <span className="text-xl">🇺🇸</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#059669]">미국: 코카콜라, P&G, Johnson & Johnson</p>
                    <p className="text-xs text-[#5C4A3A]">
                      50년 이상 배당을 늘려온 '배당 귀족주'예요
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 주의사항 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-300">
              <h3 className="text-sm font-bold text-[#DC2626] mb-2 flex items-center gap-2">
                <span>⚠️</span>
                <span>배당주 투자 시 주의할 점</span>
              </h3>
              <div className="space-y-2 text-xs text-[#5C4A3A]">
                <div className="flex items-start gap-2">
                  <span className="text-[#DC2626] shrink-0">•</span>
                  <p>
                    배당은 <span className="font-bold">회사 사정에 따라</span> 줄거나 없어질 수 있어요
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#DC2626] shrink-0">•</span>
                  <p>
                    배당락일 이후에는 주가가 배당금만큼 떨어져요 (자연스러운 현상)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#DC2626] shrink-0">•</span>
                  <p>
                    배당금에도 <span className="font-bold">세금</span>이 붙어요 (15.4%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default DividendsSection;
